import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CanDeactivateGuard } from './services/can-deactivate.service';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { InvigilatorsComponent } from './invigilators/invigilators.component';
import { AddInvigilatorComponent } from './add-invigilator/add-invigilator.component';
import { EditInvigilatorComponent } from './edit-invigilator/edit-invigilator.component';
import { InvigilatorDetailsComponent } from './invigilator-details/invigilator-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { WebEditComponent } from './web-edit/web-edit.component';
import { WebComponent } from './web/web.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { AssessmentsEditComponent } from './assessments-edit/assessments-edit.component';
import { AssessmentsCreateComponent } from './assessments-create/assessments-create.component';
import { CentresComponent } from './centres/centres.component';
import { CentresEditComponent } from './centres-edit/centres-edit.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { SettingsEditComponent } from './settings-edit/settings-edit.component';
import { SettingsYearsCreateComponent } from './settings-years-create/settings-years-create.component';
import { SettingsYearsEditComponent } from './settings-years-edit/settings-years-edit.component';
import { SettingsCentretypeCreateComponent } from './settings-centretype-create/settings-centretype-create.component';
import { SettingsCentretypeEditComponent } from './settings-centretype-edit/settings-centretype-edit.component';
import { UserAssessmentsComponent } from './user-assessments/user-assessments.component';
import { UserAssessmentDetailsComponent } from './user-assessment-details/user-assessment-details.component';
import { UserAssessmentSectionSummaryComponent } from './user-assessment-section-summary/user-assessment-section-summary.component';
import { UserAssessmentSectionIntroComponent } from './user-assessment-section-intro/user-assessment-section-intro.component';
import { UserAssessmentSectionStatementComponent } from './user-assessment-section-statement/user-assessment-section-statement.component';
import { UserAssessmentCertificateComponent } from './user-assessment-certificate/user-assessment-certificate.component';
import { UserAssessmentSectionQuestionsComponent } from './user-assessment-section-questions/user-assessment-section-questions.component';
// tslint:disable-next-line:max-line-length
import { UserAssessmentHistoryCertificateComponent } from './user-assessment-history-certificate/user-assessment-history-certificate.component';
import { OfficersComponent } from './officers/officers.component';
import { TinyImagesComponent } from './tiny-images/tiny-images.component';
// tslint:disable-next-line:max-line-length
import { SecurityConfidentialityAgreementComponent } from './security-confidentiality-agreement/security-confidentiality-agreement.component';
import { ReportingComponent } from './reporting/reporting.component';
import { ReportingAssessmentSectionsComponent } from './reporting-assessment-sections/reporting-assessment-sections.component';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';
import { ReportingCentreComponent } from './reporting-centre/reporting-centre.component';
import { ReportingCentreInfoComponent } from './reporting-centre-info/reporting-centre-info.component';
import { ReportingSectionComponent } from './reporting-section/reporting-section.component';
import { LicenceManagementComponent } from './licence-management/licence-management.component';
import { OrganisationsCreateComponent } from './organisations-create/organisations-create.component';
import { OrganisationsEditComponent } from './organisations-edit/organisations-edit.component';
import { SLTComponent } from './slts/slts.component';
import { AddSltComponent } from './add-slt/add-slt.component';
import { SLTDetailsComponent } from './slt-details/slt-details.component';
import { OfficerDetailsComponent } from './officer-details/officer-details.component';
import { OrganisationsDetailsComponent } from './organisations-details/organisations-details.component';
import { SettingsOrganisationtypeCreateComponent } from './settings-organisationtype-create/settings-organisationtype-create.component';
import { SettingsOrganisationtypeEditComponent } from './settings-organisationtype-edit/settings-organisationtype-edit.component';
import { LicenceCreateComponent } from './licence-create/licence-create.component';
import { LicenceEditComponent } from './licence-edit/licence-edit.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component'
import { AssessmentsEoQualCreateComponent } from './assessments-eo-qual-create/assessments-eo-qual-create.component';
import { AssessmentsEoQualCreateFormComponent } from './assessments-eo-qual-create-form/assessments-eo-qual-create-form.component';
import { AssessmentsDuplicateComponent } from './assessments-duplicate/assessments-duplicate.component';




const routes: Routes = [
    { path: '', component: DashboardComponent, children: [], canActivate: [AuthGuardService] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuardService] },
    { path: 'invigilators', component: InvigilatorsComponent, canActivate: [AuthGuardService] },
    { path: 'add-invigilator', component: AddInvigilatorComponent, canActivate: [AuthGuardService] },
    { path: 'edit-invigilator/:id', component: EditInvigilatorComponent, canActivate: [AuthGuardService] },
    { path: 'invigilator-details/:id', component: InvigilatorDetailsComponent, canActivate: [AuthGuardService] },
    { path: 'officers', component: OfficersComponent, canActivate: [AuthGuardService] },
    { path: 'user-assessments', component: UserAssessmentsComponent, canActivate: [AuthGuardService] },
    { path: 'user-assessment-details/:id', component: UserAssessmentDetailsComponent, canActivate: [AuthGuardService] },
    { path: 'user-assessment-section-intro/:id', component: UserAssessmentSectionIntroComponent, canActivate: [AuthGuardService] },
    { path: 'user-assessment-section-statement/:id', component: UserAssessmentSectionStatementComponent, canActivate: [AuthGuardService] },
    { path: 'user-assessment-section-questions/:id', component: UserAssessmentSectionQuestionsComponent, canActivate: [AuthGuardService],  canDeactivate: [CanDeactivateGuard] },
    { path: 'user-assessment-section-summary/:id', component: UserAssessmentSectionSummaryComponent, canActivate: [AuthGuardService] },
    { path: 'user-assessment-certificate/:id/:key', component: UserAssessmentCertificateComponent, canActivate: [AuthGuardService] },
    { path: 'slts', component: SLTComponent, canActivate: [AuthGuardService] },
    { path: 'add-slt', component: AddSltComponent, canActivate: [AuthGuardService] },
    { path: 'add-new-slt/:id', component: AddSltComponent, canActivate: [AuthGuardService] },
    { path: 'slt-details/:id', component: SLTDetailsComponent, canActivate: [AuthGuardService] },
    { path: 'officer-details/:id', component: OfficerDetailsComponent, canActivate: [AuthGuardService] },


    // tslint:disable-next-line:max-line-length
    { path: 'user-assessment-history-certificate/:id/:key', component: UserAssessmentHistoryCertificateComponent, canActivate: [AuthGuardService] },
    { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuardService] },
    { path: 'admin/web', component: WebComponent, canActivate: [AuthGuardService] },
    { path: 'admin/web-edit/:id', component: WebEditComponent, canActivate: [AuthGuardService] },
    { path: 'admin/assessments', component: AssessmentsComponent, canActivate: [AuthGuardService] },
    { path: 'admin/assessments-create', component: AssessmentsCreateComponent, canActivate: [AuthGuardService] },
    { path: 'admin/assessments-create-eo', component: AssessmentsEoQualCreateComponent, canActivate: [AuthGuardService] },
    { path: 'admin/assessments-edit/:id', component: AssessmentsEditComponent, canActivate: [AuthGuardService] },
    { path: 'admin/assessments-duplicate/:id', component: AssessmentsDuplicateComponent, canActivate: [AuthGuardService] },
    { path: 'admin/centres', component: CentresComponent, canActivate: [AuthGuardService] },
    { path: 'admin/centres-edit/:id', component: CentresEditComponent, canActivate: [AuthGuardService] },
    { path: 'admin/settings', component: SettingsComponent, canActivate: [AuthGuardService] },
    { path: 'admin/settings-edit/:id', component: SettingsEditComponent, canActivate: [AuthGuardService] },
    { path: 'admin/settings/years/create', component: SettingsYearsCreateComponent, canActivate: [AuthGuardService] },
    { path: 'admin/settings/years/edit/:id', component: SettingsYearsEditComponent, canActivate: [AuthGuardService] },
    { path: 'admin/settings/centretype/create', component: SettingsCentretypeCreateComponent, canActivate: [AuthGuardService] },
    { path: 'admin/settings/centretype/edit/:id', component: SettingsCentretypeEditComponent, canActivate: [AuthGuardService] },
    { path: 'admin/settings/organisationtype/create', component: SettingsOrganisationtypeCreateComponent, canActivate: [AuthGuardService] },
    { path: 'admin/settings/organisationtype/edit/:id', component: SettingsOrganisationtypeEditComponent, canActivate: [AuthGuardService] },
    { path: 'admin/licence-create/:id', component: LicenceCreateComponent, canActivate: [AuthGuardService] },
    { path: 'admin/licence-edit/:id', component: LicenceEditComponent, canActivate: [AuthGuardService] },
    { path: 'admin/users', component: UsersComponent, canActivate: [AuthGuardService] },
    { path: 'admin/users-create', component: UsersCreateComponent, canActivate: [AuthGuardService] },
    { path: 'admin/users-edit/:id', component: UsersEditComponent, canActivate: [AuthGuardService] },
    { path: 'admin/reporting', component: ReportingComponent, canActivate: [AuthGuardService] },
    { path: 'admin/reporting-assessment-sections/:id', component: ReportingAssessmentSectionsComponent, canActivate: [AuthGuardService] },
    { path: 'admin/report-dashboard', component: ReportDashboardComponent, canActivate: [AuthGuardService] },
    { path: 'admin/reporting-centre', component: ReportingCentreComponent, canActivate: [AuthGuardService] },
    { path: 'admin/reporting-centre-info/:id', component: ReportingCentreInfoComponent, canActivate: [AuthGuardService] },
    { path: 'admin/reporting-section/:id', component: ReportingSectionComponent, canActivate: [AuthGuardService] },
    { path: 'admin/licence-management', component: LicenceManagementComponent, canActivate: [AuthGuardService] },
    { path: 'admin/organisations-create', component: OrganisationsCreateComponent, canActivate: [AuthGuardService] },
    { path: 'admin/organisations-edit/:id', component: OrganisationsEditComponent, canActivate: [AuthGuardService] },
    { path: 'admin/organisations-details/:id', component: OrganisationsDetailsComponent, canActivate: [AuthGuardService] },
    { path: 'admin/tiny-images', component: TinyImagesComponent },
    { path: 'terms-and-conditions', component: TermsAndConditionsComponent, canActivate: [AuthGuardService] },
    { path: 'privacy-policy', component: PrivacyPolicyComponent, canActivate: [AuthGuardService] },
    { path: 'security-confidentiality-agreement', component: SecurityConfidentialityAgreementComponent, canActivate: [AuthGuardService] },
    { path: 'auth-callback', component: AuthCallbackComponent },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '**', component: DashboardComponent, canActivate: [AuthGuardService] }

  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [CanDeactivateGuard]
  })
  export class AppRoutingModule { }
