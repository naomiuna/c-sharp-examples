import { Component, OnInit, Input } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { InvigilatorViewModel } from '../models/invigilator.view.model';
import { EnumStatusCode } from '../models/generic.status';
import { UserServiceService } from '../services/user-service.service';
import { UserAssessmentListingModel } from '../models/search/user.assessment.listing.model';
import { UserAssessmentService } from '../services/user-assessment.service';
import { UserViewModel } from '../models/user.view.model';
import { PermissionsServiceService } from '../services/permissions-service.service';
import { CentreServiceService } from '../services/centre-service.service';
import { UpdateCentreContactViewModel } from '../models/update.centre.contact.view.model';

@Component({
  selector: 'app-invigilator-details-basic',
  templateUrl: './invigilator-details-basic.component.html',
  styleUrls: ['./invigilator-details-basic.component.css']
})
export class InvigilatorDetailsBasicComponent extends AppComponentBase implements OnInit {

  @Input() id: string;

  public userDetails: InvigilatorViewModel = new InvigilatorViewModel();
  public latestAssessment: UserAssessmentListingModel = new UserAssessmentListingModel();

  public isCurrentContact: boolean = false;
  public isSelectedExamOfficer: boolean = false;
  public contactUpdated: boolean = false;

  public centreToUpdate: UpdateCentreContactViewModel = new UpdateCentreContactViewModel();
  public newContact: string;
  public centreId: number;

  constructor(
    public routeConfig: Router,
    private userService: UserServiceService,
    private userAssessmentService: UserAssessmentService,
    private permissionsService: PermissionsServiceService,
    private centreService: CentreServiceService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    console.log(this.id);
    super.ngOnInit();
    if(this.isUserExamOfficer())
    {
      this.getSelectedUser();
    }
    this.actionPending = true;
    console.log(`InvigilatorDetailsBasicComponent id: ${this.id}`);
    this.userService.getExamInvigilatorDetails(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.userDetails = r1;
        this.userAssessmentService.getUserLatestAssessment(this.id)
        .subscribe(
          r2 => {
            console.log(r2);
            this.latestAssessment = r2;
            this.actionPending = false;
          },
          (e2: Error) => {
            this.onApiError(e2.message);
          }
        );
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public goToItem() {
    this.routeConfig.navigate([`edit-invigilator/${this.id}`]);
  }

  public performDelete(): void {
    if (this.id !== null) {
      this.userService.deleteUser(this.id)
      .subscribe(
        r1 => {
          console.log(r1);
          if (r1.status === EnumStatusCode.Ok) {
            this.routeConfig.navigate([`dashboard`]);
          } else {
            this.error = r1.message;

          }
        },
        (e1: Error) => {
          this.onApiError(e1.message);
        }
      );
    }
  }

  public isUserExamOfficer(): boolean {
    return this.permissionsService.isUserExamOfficer();
  }

  // Assign the new contact email
  public makeCentreContact()
  {
    this.centreToUpdate.centreId = this.centreId;
    this.centreToUpdate.newContact = this.newContact;
    this.centreService.updateCentreContact(this.centreToUpdate)
    .subscribe(
      r1 => {
        console.log(r1);
        if (r1.status === EnumStatusCode.Ok)
        {
          this.routeConfig.navigate([`officer-details/` + this.newContact]);
          this.contactUpdated = true;
          this.isCurrentContact = true;
        }
        else
        {
          this.error = r1.message;
        }
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    )
  }

  // Get current user
  public getCurrentUserId(): string
  {
    if(this.id !== null)
    {
      this.userService.getUser()
      .subscribe(
        r1 => {
          this.getCentre(r1);
        },
        (e1: Error) => {
          this.onApiError(e1.message);
        }
      );
    }
    else{
      return "Does not exist.";
    }
  }

  // Get Selected User
  public getSelectedUser()
  {
    if(this.id !== null)
    {
      this.userService.getUserById<UserViewModel>(this.id)
      .subscribe(
        r1 => {
          if(r1.role === "ExamOfficer")
          {
            this.isSelectedExamOfficer = true;
          }
          this.getCentre(r1);
        },
        (e1: Error) => {
          this.onApiError(e1.message);
        }
      );
    }
    else{
      return "Does not exist.";
    }
  }

  // Get the current contact email for the centre (Officer Email)
  public getCentre(selectedUser: UserViewModel)
  {
    this.centreService.getCentreSearchByUserId(selectedUser.id)
    .subscribe(
      r1 => {
        console.log("Centre officer email: " + r1.officerEmail);
        console.log("Selected user email: " + selectedUser.email);
        if(r1.officerEmail === selectedUser.email)
        {
          console.log("This is already the contact.")
          this.isCurrentContact = true;
        }
        console.log(r1.id);
        this.centreId = r1.id;
        this.newContact = selectedUser.id;
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    )
  }
}
