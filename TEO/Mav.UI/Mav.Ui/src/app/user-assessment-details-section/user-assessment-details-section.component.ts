import { Component, OnInit, Input } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { UpdateAssessmentViewModel } from '../models/admin/update-assessment.view.model';
import { UserAssessmentService } from '../services/user-assessment.service';
import { UserAssessmentViewModel } from '../models/user.assessment.view.model';
import { AssessmentService } from '../services/admin/assessment.service';

@Component({
  selector: 'app-user-assessment-details-section',
  templateUrl: './user-assessment-details-section.component.html',
  styleUrls: ['./user-assessment-details-section.component.css']
})
export class UserAssessmentDetailsSectionComponent extends AppComponentBase implements OnInit {

  @Input() id: number; // UserAssessmentID

  public userAssessment: UserAssessmentViewModel;
  public assDetails: UpdateAssessmentViewModel = new UpdateAssessmentViewModel();

  constructor(
    public routeConfig: Router,
    private assessmentService: AssessmentService,
    private userAssessmentService: UserAssessmentService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.actionPending = true;
    this.userAssessmentService.getUserAssessmentById<UserAssessmentViewModel>(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.userAssessment = r1;
        if (!!this.userAssessment.id && this.userAssessment.id > 0) {
          this.assessmentService.getAssessmentById<UpdateAssessmentViewModel>(this.userAssessment.assessmentID)
          .subscribe(
            r2 => {
              console.log(r2);
              this.assDetails = r2;
              this.actionPending = false;
              if (this.assDetails.id === null || this.assDetails.id === 0) {
                this.routeConfig.navigate(['/']);
              }
            },
            (e2: Error) => {
              this.onApiError(e2.message);
            }
          );
        }
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

}
