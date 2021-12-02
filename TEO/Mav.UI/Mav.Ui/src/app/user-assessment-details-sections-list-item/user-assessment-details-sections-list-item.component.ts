import { Component, OnInit, Input } from '@angular/core';
import { UserAssessmentSectionListingModel } from '../models/search/user.assessment.section.listing.model';
import { UserAssessmentSectionService } from '../services/user-assessment-section.service';
import { Router } from '@angular/router';
import { AddUserAssessmentSectionViewModel } from '../models/add.user.assessment.section.view.model';
import { AppComponentBase } from '../app.component.base';
import { EnumStatusCode } from '../models/generic.status';

@Component({
  selector: 'app-user-assessment-details-sections-list-item',
  templateUrl: './user-assessment-details-sections-list-item.component.html',
  styleUrls: ['./user-assessment-details-sections-list-item.component.css']
})
export class UserAssessmentDetailsSectionsListItemComponent extends AppComponentBase implements OnInit {

  @Input() count: number; //the total number of sections, if only 1 then we render it slightly differently

  @Input() section: UserAssessmentSectionListingModel;

  @Input() userAssessmentID: number;

  public addUserAssessmentSectionModel: AddUserAssessmentSectionViewModel = new AddUserAssessmentSectionViewModel();
  public timeRemaining?: string;

  constructor(
    public routeConfig: Router,
    private userAssessmentSectionService: UserAssessmentSectionService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    if(this.section.isEoQualification)
    {
      
      this.timeRemaining = this.formatTime(this.section.timeRemaining);
      console.log(this.timeRemaining);
    }
  }

  public startSection(): void {
    this.actionPending = true;
    this.addUserAssessmentSectionModel.userAssessmentID = this.userAssessmentID;
    this.addUserAssessmentSectionModel.sectionID = this.section.sectionID;
    this.userAssessmentSectionService.createUserAssessmentSection(this.addUserAssessmentSectionModel)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.routeConfig.navigate([`user-assessment-section-intro/${r1.keyID}`]);
        } else {
          this.error = r1.message;
        }
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public restartSection(): void {
    this.actionPending = true;
    this.userAssessmentSectionService.restartUserAssessmentSection(this.section.userAssessmentSectionID)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.routeConfig.navigate([`user-assessment-section-intro/${r1.keyID}`]);
        } else {
          this.error = r1.message;
        }
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public viewSectionSummary(): void {
    this.routeConfig.navigate([`user-assessment-section-summary/${this.section.userAssessmentSectionID}`]);
  }

  public formatTime(time) {
    let minutes: any;
    let seconds: any;
    minutes = Math.floor(time / 60);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    seconds = time % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

}
