import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserAssessmentListingModel } from '../models/search/user.assessment.listing.model';
import { UserAssessmentService } from '../services/user-assessment.service';
import { AddUserAssessmentViewModel } from '../models/add.user.assessment.view.model';
import { EnumStatusCode } from '../models/generic.status';

@Component({
  selector: 'app-user-assessments-list-item',
  templateUrl: './user-assessments-list-item.component.html',
  styleUrls: ['./user-assessments-list-item.component.css']
})
export class UserAssessmentsListItemComponent implements OnInit {

  @Input() assessment: UserAssessmentListingModel;

  @Input() userID: string;

  public addUserAssessmentModel: AddUserAssessmentViewModel = new AddUserAssessmentViewModel();
  public actionPending = false;

  constructor(
    private routeConfig: Router,
    private userAssessmentService: UserAssessmentService
  ) {}

  ngOnInit() {
  }

  goToItem() {
    this.actionPending = true;
    if (!!this.assessment.userAssessmentID) {
      this.routeConfig.navigate([`user-assessment-details/${this.assessment.userAssessmentID}`]);
    } else {
      this.addUserAssessmentModel.assessmentID = this.assessment.assessmentID;
      this.addUserAssessmentModel.yearID = this.assessment.yearID;
      this.addUserAssessmentModel.userID = this.userID;
      this.userAssessmentService.createUserAssessment(this.addUserAssessmentModel)
    .subscribe(
      r1 => {
        console.log(r1);
        if (r1.status === EnumStatusCode.Ok) {
          this.routeConfig.navigate([`user-assessment-details/${r1.keyID}`]);
        }
      },
      (e1: Error) => {
        console.log(e1.message);
        this.actionPending = false;
      }
    );
    }
  }

}
