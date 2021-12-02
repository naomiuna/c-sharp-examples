import { Component, OnInit, Input } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { AssessmentSectionTotals } from '../models/assessment.section.totals';
import { UserAssessmentService } from '../services/user-assessment.service';
import { UserAssessmentSectionService } from '../services/user-assessment-section.service';
import { SubmitUserAssessmentViewModel } from '../models/submit.user.assessment.view.model';
import { EnumStatusCode } from '../models/generic.status';
import { MatSlideToggleChange } from '@angular/material';
import { PageServiceService } from '../services/admin/page-service.service';
import { GlobalSettingsService } from '../services/global-settings.service';
import { PageViewModel } from '../models/admin/page.view.model';
import { AuthService } from '../services/auth.service';
import { User } from 'oidc-client';
import { PermissionsServiceService } from '../services/permissions-service.service';

declare function removeModal(modalType: string): any;

@Component({
  selector: 'app-user-assessment-details-sections-totals',
  templateUrl: './user-assessment-details-sections-totals.component.html',
  styleUrls: ['./user-assessment-details-sections-totals.component.css']
})
export class UserAssessmentDetailsSectionsTotalsComponent extends AppComponentBase implements OnInit {

  @Input() id: number; // UserAssessmentID
  private user: User = null;

  public totals: AssessmentSectionTotals = {
    userAssessmentID: 0,
    maxScore: 0,
    totalScore: 0,
    totalSections: 0,
    totalSectionsCompleted: 0,
    roundScore: 0,
    passRateReached: false,
    submitted: false,
    actionAllowed: false,
    keyID: ''
  };

  public isTermsAgreed = false;
  public pageDetails: PageViewModel;
  public pageTitle = '';
  public pageContent = '';
  public noSections = false;

  constructor(
    public routeConfig: Router,
    private userAssessmentService: UserAssessmentService,
    private userAssessmentSectionService: UserAssessmentSectionService,
    private pageService: PageServiceService,
    private globalSettings: GlobalSettingsService,
    private authService: AuthService,
    private permissionsService: PermissionsServiceService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.userAssessmentSectionService.getUserAssessmentSectionTotals(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.totals = r1;
        this.noSections = r1.totalSections == 0;
        this.pageService.getPageById<PageViewModel>(this.globalSettings.contentPages.securityAndConfidentialityAgreement)
        .subscribe(
          r2 => {
            console.log(r1);
            this.pageDetails = r2;
            this.pageTitle = this.pageDetails.pageInfo.title;
            this.pageContent = this.pageDetails.pageInfo.content;
            this.actionPending = false;
          },
          (e1: Error) => {
            this.onApiError(e1.message);
          }
        );
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public actionSubmitAssessment(): void {
    this.actionPending = true;
    const submission: SubmitUserAssessmentViewModel = new SubmitUserAssessmentViewModel();
    submission.userAssessmentID = this.id;
    this.userAssessmentService.submitUserAssessment(submission)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
          this.totals.submitted = true;
          removeModal('submit_assessment_modal');
        } else {
          this.error = r1.message;
        }
      },
      e1 => {
        console.log(e1);
        this.actionPending = false;
        this.error = `An unexpected error has occurred`;
      }
    );
  }

  public viewCerfificate(): void {
    this.routeConfig.navigate([`/user-assessment-certificate/${this.id}/${this.totals.keyID}`]);
    return;
  }

  public changeTermsAgreed(event: MatSlideToggleChange): void {
    this.isTermsAgreed = event.checked;
  }

  public isUserExamOfficer(): boolean {
    return this.permissionsService.isUserExamOfficer();
  }

  public isUserExamInvigilator(): boolean {
    return this.permissionsService.isUserExamInvigilator();
  }

  public isUserAdministrator(): boolean {
    return this.permissionsService.isUserAdministrator();
  }

  public isUserEditor(): boolean {
    return this.permissionsService.isUserEditor();
  }

  public isUserSLT(): boolean {
    return this.permissionsService.isUserSLT();
  }


}
