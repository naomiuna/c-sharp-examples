import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamServiceService } from '../services/exam-service.service';
import { SectionService } from '../services/section.service';
import { UserAssessmentSectionService } from '../services/user-assessment-section.service';
import { UserAssessmentSectionViewModel } from '../models/user.assessment.section.view.model';
import { ExamSectionStepViewModel } from '../models/exam-section-step.view.model';
import { EnumAssessmentSectionStatus } from '../models/assessment-section.status';
import { AddUserAssessmentSectionViewModel } from '../models/add.user.assessment.section.view.model';
import { EnumStatusCode } from '../models/generic.status';
import { AssessmentSectionSummary } from '../models/assessment.section.summary';
import { UpdateSectionViewModel } from '../models/admin/update-section.view.model';

@Component({
  selector: 'app-user-assessment-section-summary',
  templateUrl: './user-assessment-section-summary.component.html',
  styleUrls: ['./user-assessment-section-summary.component.css']
})
export class UserAssessmentSectionSummaryComponent extends AppComponentBase implements OnInit {

  public id: number; // UserAssessmentSectionID

  public userAssessmentSectionDetails: UserAssessmentSectionViewModel = new UserAssessmentSectionViewModel();
  public sectionStepDetails: ExamSectionStepViewModel = new ExamSectionStepViewModel();
  public  assessmentSectionSummary: AssessmentSectionSummary[] = [];
  public section: UpdateSectionViewModel = new UpdateSectionViewModel();

  public recentScore: number = 0;

  constructor(
    public routeConfig: Router,
    private activeRoute: ActivatedRoute,
    private userAssessmentSectionService: UserAssessmentSectionService,
    private examService: ExamServiceService,
    private sectionService: SectionService
  ) {
    super(routeConfig);

    this.userAssessmentSectionDetails.actionAllowed = false;
  }

  ngOnInit() {
    super.ngOnInit();
    const routeParams = this.activeRoute.snapshot.params;
    this.id = routeParams.id;
    this.actionPending = true;
    this.userAssessmentSectionService.getUserAssessmentSectionById<UserAssessmentSectionViewModel>(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.userAssessmentSectionDetails = r1;
        this.examService.getSectionSummaryDetails(this.id)
        .subscribe(
          r2 => {
            console.log(r2);
            this.assessmentSectionSummary = r2;
            this.examService.getRecentScore(this.id)
            .subscribe(
              r4 => {
                console.log("Recent score: ", r4);
                this.recentScore = r4;
              },
              (e4: Error) => {
                this.onApiError(e4.message);
              }
            );
            this.sectionService.getSectionById<UpdateSectionViewModel>(this.userAssessmentSectionDetails.sectionID).subscribe(
              r3 => {
                this.section = r3;
                this.actionPending = false;
              },
              (e3: Error) => {
                this.onApiError(e3.message);
              }
            );

            
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

  public goToAssessmentDetails(): void {
    this.routeConfig.navigate([`/user-assessment-details/${this.userAssessmentSectionDetails.userAssessmentID}`]);
    return;
  }

  public goToSectionDetails(): void {
    this.routeConfig.navigate([`/user-assessment-section-intro/${this.id}`]);
    return;
  }

  public restartSection(): void {
    this.actionPending = true;
    this.userAssessmentSectionService.restartUserAssessmentSection(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.goToSectionDetails();
        } else {
          this.error = r1.message;
        }
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public saveAndClose(): void {
    this.goToAssessmentDetails();
  }

  public saveAndContinue(): void {
    this.actionPending = true;
    this.userAssessmentSectionService.lookupNextSectionStep(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.sectionStepDetails = r1;
        if (this.sectionStepDetails.nextSectionID > 0) {
          if (this.sectionStepDetails.nextSectionStatusID === EnumAssessmentSectionStatus.NotStarted.valueOf()) {
            this.startSection(this.sectionStepDetails.userAssessmentID, this.sectionStepDetails.nextSectionID);
          } else if (this.sectionStepDetails.nextSectionStatusID === EnumAssessmentSectionStatus.TopScore.valueOf()
                  || this.sectionStepDetails.nextSectionStatusID === EnumAssessmentSectionStatus.AttemptsExceeded.valueOf()) {
            this.refreshScreenSkipLocation(`user-assessment-section-summary/${this.sectionStepDetails.nextUserAssessmentSectionID}`);
            return;
          } else {
            this.refreshScreenSkipLocation(`user-assessment-section-intro/${this.sectionStepDetails.nextUserAssessmentSectionID}`);
            return;
          }
        } else {
          this.goToAssessmentDetails();
          return;
        }
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  private startSection(userAssessmentID: number, nextSectionID: number): void {
    this.actionPending = true;
    const addUserAssessmentSectionModel: AddUserAssessmentSectionViewModel = new AddUserAssessmentSectionViewModel();
    addUserAssessmentSectionModel.userAssessmentID = userAssessmentID;
    addUserAssessmentSectionModel.sectionID = nextSectionID;
    this.userAssessmentSectionService.createUserAssessmentSection(addUserAssessmentSectionModel)
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

}
