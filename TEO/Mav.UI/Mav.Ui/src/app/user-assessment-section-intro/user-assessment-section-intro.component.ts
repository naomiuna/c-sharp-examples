import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAssessmentSectionViewModel } from '../models/user.assessment.section.view.model';
import { UpdateSectionViewModel } from '../models/admin/update-section.view.model';
import { UserAssessmentSectionService } from '../services/user-assessment-section.service';
import { SectionService } from '../services/section.service';
import { EnumAssessmentSectionStatus } from '../models/assessment-section.status';

declare function timerCountdown(timeLimit, timePassed): any;

@Component({
  selector: 'app-user-assessment-section-intro',
  templateUrl: './user-assessment-section-intro.component.html',
  styleUrls: ['./user-assessment-section-intro.component.css']
})
export class UserAssessmentSectionIntroComponent extends AppComponentBase implements OnInit {

  public id: number; // UserAssessmentSectionID

  public userAssessmentSection: UserAssessmentSectionViewModel;
  public sectionDetails: UpdateSectionViewModel = new UpdateSectionViewModel();

  constructor(
    public routeConfig: Router,
    private activeRoute: ActivatedRoute,
    private userAssessmentSectionService: UserAssessmentSectionService,
    private sectionService: SectionService
    
  ) {
    super(routeConfig);
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
        this.userAssessmentSection = r1;
        if (!!this.userAssessmentSection.id && this.userAssessmentSection.id > 0) {
          this.sectionService.getSectionById<UpdateSectionViewModel>(this.userAssessmentSection.sectionID)
          .subscribe(
            r2 => {
              console.log(r2);
              this.sectionDetails = r2;
              this.actionPending = false;
              if (this.sectionDetails.id === null || this.sectionDetails.id === 0) {
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
  

  public goToAssessmentStatement(): void {
    this.routeConfig.navigate([`/user-assessment-section-statement/${this.id}`]);
  }

  public goToAssessmentDetails(): void {
    this.routeConfig.navigate([`/user-assessment-details/${this.userAssessmentSection.userAssessmentID}`]);
  }

  public goToAssessmentQuestions(): void {
    this.routeConfig.navigate([`/user-assessment-section-questions/${this.id}`]);
  }

}
