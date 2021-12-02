import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { tinymceDefaultSettings, TinyMceModule } from 'angular-tinymce';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { InvigilatorsComponent } from './invigilators/invigilators.component';
import { AddInvigilatorComponent } from './add-invigilator/add-invigilator.component';
import { EditInvigilatorComponent } from './edit-invigilator/edit-invigilator.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { GlobalSettingsService } from './services/global-settings.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddInvigilatorFormComponent } from './add-invigilator-form/add-invigilator-form.component';
import { ValidationMessageComponent } from './validation-message/validation-message.component';
import { FormValidationService } from './services/form-validation.service';
import { InvigilatorListComponent } from './invigilator-list/invigilator-list.component';
import { InvigilatorListItemComponent } from './invigilator-list-item/invigilator-list-item.component';
import { InvigilatorDetailsComponent } from './invigilator-details/invigilator-details.component';
import { InvigilatorDetailsBasicComponent } from './invigilator-details-basic/invigilator-details-basic.component';
import { InvigilatorDetailsAssessmentComponent } from './invigilator-details-assessment/invigilator-details-assessment.component';
// tslint:disable-next-line:max-line-length |
import { InvigilatorDetailsAssessmentHistoryComponent } from './invigilator-details-assessment-history/invigilator-details-assessment-history.component';
import { EditInvigilatorFormComponent } from './edit-invigilator-form/edit-invigilator-form.component';
import { UserServiceService } from './services/user-service.service';
import { CentreServiceService } from './services/centre-service.service';
import { PermissionsServiceService } from './services/permissions-service.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { WebComponent } from './web/web.component';
import { WebEditComponent } from './web-edit/web-edit.component';
import { PageServiceService } from './services/admin/page-service.service';
import { WebListComponent } from './web-list/web-list.component';
import { WebListItemComponent } from './web-list-item/web-list-item.component';
import { WebEditFormComponent } from './web-edit-form/web-edit-form.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersListItemComponent } from './users-list-item/users-list-item.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { AssessmentsListComponent } from './assessments-list/assessments-list.component';
import { AssessmentsListItemComponent } from './assessments-list-item/assessments-list-item.component';
import { AssessmentsCreateComponent } from './assessments-create/assessments-create.component';
import { AssessmentsCreateFormComponent } from './assessments-create-form/assessments-create-form.component';
import { AssessmentsEditComponent } from './assessments-edit/assessments-edit.component';
import { AssessmentsEditFormComponent } from './assessments-edit-form/assessments-edit-form.component';
import { CentresComponent } from './centres/centres.component';
import { CentresListComponent } from './centres-list/centres-list.component';
import { CentresListItemComponent } from './centres-list-item/centres-list-item.component';
import { CentresEditComponent } from './centres-edit/centres-edit.component';
import { CentresEditFormComponent } from './centres-edit-form/centres-edit-form.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersEditFormComponent } from './users-edit-form/users-edit-form.component';
import { UsersCreateFormComponent } from './users-create-form/users-create-form.component';
import { SettingsService } from './services/admin/settings.service';
import { SettingsListComponent } from './settings-list/settings-list.component';
import { SettingsListItemComponent } from './settings-list-item/settings-list-item.component';
import { SettingsEditFormComponent } from './settings-edit-form/settings-edit-form.component';
import { SettingsEditComponent } from './settings-edit/settings-edit.component';
import { SettingsYearsListComponent } from './settings-years-list/settings-years-list.component';
import { SettingsYearsListItemComponent } from './settings-years-list-item/settings-years-list-item.component';
import { SettingsYearsCreateComponent } from './settings-years-create/settings-years-create.component';
import { SettingsYearsCreateFormComponent } from './settings-years-create-form/settings-years-create-form.component';
import { SettingsYearsEditComponent } from './settings-years-edit/settings-years-edit.component';
import { SettingsYearsEditFormComponent } from './settings-years-edit-form/settings-years-edit-form.component';
import { SettingsCentretypeListComponent } from './settings-centretype-list/settings-centretype-list.component';
import { SettingsCentretypeListItemComponent } from './settings-centretype-list-item/settings-centretype-list-item.component';
import { SettingsCentretypeCreateComponent } from './settings-centretype-create/settings-centretype-create.component';
import { SettingsCentretypeCreateFormComponent } from './settings-centretype-create-form/settings-centretype-create-form.component';
import { SettingsCentretypeEditComponent } from './settings-centretype-edit/settings-centretype-edit.component';
import { SettingsCentretypeEditFormComponent } from './settings-centretype-edit-form/settings-centretype-edit-form.component';
import { CentreTypeService } from './services/admin/centre-type.service';
import { AssessmentYearService } from './services/admin/assessment-year.service';
import { AssessmentRoleService } from './services/admin/assessment-role.service';
import { AssessmentService } from './services/admin/assessment.service';
import { AssessmentsSectionsComponent } from './assessments-sections/assessments-sections.component';
import { AssessmentsSectionEditFormComponent } from './assessments-section-edit-form/assessments-section-edit-form.component';
import { AssessmentsSectionEditListComponent } from './assessments-section-edit-list/assessments-section-edit-list.component';
import { AssessmentsSectionAddFormComponent } from './assessments-section-add-form/assessments-section-add-form.component';
import { AssessmentsSectionEditComponent } from './assessments-section-edit/assessments-section-edit.component';
// tslint:disable-next-line:max-line-length
import { AssessmentsSectionEditCategoriesComponent } from './assessments-section-edit-categories/assessments-section-edit-categories.component';
import { AssessmentsSectionEditQuestionsComponent } from './assessments-section-edit-questions/assessments-section-edit-questions.component';
import { QuestionGroupService } from './services/question-group.service';
import { SectionService } from './services/section.service';
import { StatementService } from './services/statement.service';
import { QuestionService } from './services/question.service';
import { AnswerService } from './services/answer.service';
import { NotDeletedPipe } from './pipes/not-deleted.pipe';
import { AssessmentStatusPipe } from './pipes/assessment-status.pipe';
import { AssessmentSectionStatusPipe } from './pipes/assessment-section-status.pipe';
import { UserAssessmentService } from './services/user-assessment.service';
import { UserAssessmentSectionService } from './services/user-assessment-section.service';
import { UserAssessmentAnswerService } from './services/user-assessment-answer.service';
import { UserAssessmentsComponent } from './user-assessments/user-assessments.component';
import { UserAssessmentsListComponent } from './user-assessments-list/user-assessments-list.component';
import { UserAssessmentsListItemComponent } from './user-assessments-list-item/user-assessments-list-item.component';
import { UserAssessmentDetailsComponent } from './user-assessment-details/user-assessment-details.component';
import { UserAssessmentDetailsSectionComponent } from './user-assessment-details-section/user-assessment-details-section.component';
// tslint:disable-next-line:max-line-length
import { UserAssessmentDetailsSectionsListComponent } from './user-assessment-details-sections-list/user-assessment-details-sections-list.component';
import { UserAssessmentDetailsSectionsListItemComponent } from './user-assessment-details-sections-list-item/user-assessment-details-sections-list-item.component';
// tslint:disable-next-line:max-line-length
import { UserAssessmentDetailsSectionsTotalsComponent } from './user-assessment-details-sections-totals/user-assessment-details-sections-totals.component';
import { UserAssessmentSectionSummaryComponent } from './user-assessment-section-summary/user-assessment-section-summary.component';
import { UserAssessmentSectionIntroComponent } from './user-assessment-section-intro/user-assessment-section-intro.component';
import { UserAssessmentCertificateComponent } from './user-assessment-certificate/user-assessment-certificate.component';
import { UserAssessmentSectionQuestionsComponent } from './user-assessment-section-questions/user-assessment-section-questions.component';
import { ExamServiceService } from './services/exam-service.service';
// tslint:disable-next-line:max-line-length
import { UserAssessmentSectionSummaryListComponent } from './user-assessment-section-summary-list/user-assessment-section-summary-list.component';
import { CertificateService } from './services/certificate.service';
import { UserAssessmentHistoryListComponent } from './user-assessment-history-list/user-assessment-history-list.component';
// tslint:disable-next-line:max-line-length
import { UserAssessmentHistoryCertificateComponent } from './user-assessment-history-certificate/user-assessment-history-certificate.component';
import { OfficersComponent } from './officers/officers.component';
import { AddOfficerComponent } from './add-officer/add-officer.component';
import { EditOfficerComponent } from './edit-officer/edit-officer.component';
import { OfficersListComponent } from './officers-list/officers-list.component';
import { OfficersWrapperComponent } from './officers-wrapper/officers-wrapper.component';
import { TinyImagesComponent } from './tiny-images/tiny-images.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { InvigilatorsWrapperComponent } from './invigilators-wrapper/invigilators-wrapper.component';
import { UserAssessmentDetailsSectionsListMinitemComponent } from './user-assessment-details-sections-list-minitem/user-assessment-details-sections-list-minitem.component';
import { SecurityConfidentialityAgreementComponent } from './security-confidentiality-agreement/security-confidentiality-agreement.component';
import { ReportingComponent } from './reporting/reporting.component';
import { ReportingAssessmentSectionsComponent } from './reporting-assessment-sections/reporting-assessment-sections.component';
import { ReportingAssessmentListComponent } from './reporting-assessment-list/reporting-assessment-list.component';
import { ReportingAssessmentListItemComponent } from './reporting-assessment-list-item/reporting-assessment-list-item.component';
import { ReportingAssessmentSectionsListComponent } from './reporting-assessment-sections-list/reporting-assessment-sections-list.component';
import { ReportingService } from './services/admin/reporting.service';
import { SLTComponent } from './slts/slts.component';
import { SLTsWrapperComponent } from './slts-wrapper/slts-wrapper.component';
import { SLTListComponent } from './slts-list/slts-list.component';
import { SltsListItemComponent } from './slts-list-item/slts-list-item.component';
import { AddSltComponent } from './add-slt/add-slt.component';
import { AddSltFormComponent } from './add-slt-form/add-slt-form.component';
import { SLTDetailsComponent } from './slt-details/slt-details.component';
import { SltDetailsAssessmentComponent } from './slt-details-assessment/slt-details-assessment.component';
import { SltDetailsAssessmentHistoryComponent } from './slt-details-assessment-history/slt-details-assessment-history.component';
import { SltDetailsBasicComponent } from './slt-details-basic/slt-details-basic.component';
import { AssessmentsSectionEditStatementComponent } from './assessments-section-edit-statement/assessments-section-edit-statement.component';
import { AssessmentsEditStatementComponent } from './assessments-edit-statement/assessments-edit-statement.component';

import { ConfirmationStatementComponent } from './confirmation-statement/confirmation-statement.component';
import { UserAssessmentSectionStatementComponent } from './user-assessment-section-statement/user-assessment-section-statement.component';
import { OfficerDetailsComponent } from './officer-details/officer-details.component';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';
import { ReportingCentreComponent } from './reporting-centre/reporting-centre.component';
import { ReportingCentreListComponent } from './reporting-centre-list/reporting-centre-list.component';
import { ReportingCentreListItemComponent } from './reporting-centre-list-item/reporting-centre-list-item.component';
import { ReportingCentreInfoComponent } from './reporting-centre-info/reporting-centre-info.component';
import { ReportingCentreInfoListComponent } from './reporting-centre-info-list/reporting-centre-info-list.component';
import { ReportingSectionComponent } from './reporting-section/reporting-section.component';
import { ReportingAssessmentSectionsListItemComponent } from './reporting-assessment-sections-list-item/reporting-assessment-sections-list-item.component';
import { ReportingSectionItemComponent } from './reporting-section-item/reporting-section-item.component';
import { LicenceManagementComponent } from './licence-management/licence-management.component';
import { LicenceManagementListComponent } from './licence-management-list/licence-management-list.component';
import { LicenceManagementListItemComponent } from './licence-management-list-item/licence-management-list-item.component';
import { OrganisationService } from './services/organisation.service';
import { OrganisationsComponent } from './organisations/organisations.component';
import { OrganisationsDetailsComponent } from './organisations-details/organisations-details.component';
import { OrganisationsCentreListComponent } from './organisations-centre-list/organisations-centre-list.component';
import { SettingsOrganisationtypeListComponent } from './settings-organisationtype-list/settings-organisationtype-list.component';
import { SettingsOrganisationtypeListItemComponent } from './settings-organisationtype-list-item/settings-organisationtype-list-item.component';
import { SettingsOrganisationtypeCreateComponent } from './settings-organisationtype-create/settings-organisationtype-create.component';
import { SettingsOrganisationtypeCreateFormComponent } from './settings-organisationtype-create-form/settings-organisationtype-create-form.component';
import { SettingsOrganisationtypeEditComponent } from './settings-organisationtype-edit/settings-organisationtype-edit.component';
import { SettingsOrganisationtypeEditFormComponent } from './settings-organisationtype-edit-form/settings-organisationtype-edit-form.component';
import { OrganisationTypeService } from './services/admin/organisation-type.service';
import { OrganisationsCreateComponent } from './organisations-create/organisations-create.component';
import { OrganisationsCreateFormComponent } from './organisations-create-form/organisations-create-form.component';
import { LicenceCreateComponent } from './licence-create/licence-create.component';
import { LicenceCreateFormComponent } from './licence-create-form/licence-create-form.component';
import { LicenceService } from './services/licence.service';
import { LicenceEditFormComponent } from './licence-edit-form/licence-edit-form.component';
import { LicenceEditComponent } from './licence-edit/licence-edit.component';
import { OrganisationsEditComponent } from './organisations-edit/organisations-edit.component';
import { OrganisationsEditFormComponent } from './organisations-edit-form/organisations-edit-form.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';

import { AssessmentsEoQualCreateComponent } from './assessments-eo-qual-create/assessments-eo-qual-create.component';
import { AssessmentsEoQualCreateFormComponent } from './assessments-eo-qual-create-form/assessments-eo-qual-create-form.component';
import { AssessmentsDuplicateComponent } from './assessments-duplicate/assessments-duplicate.component';
import { AssessmentsDuplicateFormComponent } from './assessments-duplicate-form/assessments-duplicate-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthCallbackComponent,
    UnauthorizedComponent,
    MyAccountComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    AddInvigilatorComponent,
    EditInvigilatorComponent,
    InvigilatorsComponent,
    MainNavigationComponent,
    HeaderBarComponent,
    EditProfileComponent,
    AddInvigilatorFormComponent,
    ValidationMessageComponent,
    InvigilatorListComponent,
    InvigilatorListItemComponent,
    InvigilatorDetailsComponent,
    InvigilatorDetailsBasicComponent,
    InvigilatorDetailsAssessmentComponent,
    InvigilatorDetailsAssessmentHistoryComponent,
    EditInvigilatorFormComponent,
    AdminDashboardComponent,
    WebComponent,
    WebEditComponent,
    WebListComponent,
    WebListItemComponent,
    WebEditFormComponent,
    SettingsComponent,
    UsersComponent,
    UsersListComponent,
    UsersListItemComponent,
    AssessmentsComponent,
    AssessmentsListComponent,
    AssessmentsListItemComponent,
    AssessmentsCreateComponent,
    AssessmentsCreateFormComponent,
    AssessmentsEditComponent,
    AssessmentsEditFormComponent,
    CentresComponent,
    CentresListComponent,
    CentresListItemComponent,
    CentresEditComponent,
    CentresEditFormComponent,
    UsersCreateComponent,
    UsersEditComponent,
    UsersEditFormComponent,
    UsersCreateFormComponent,
    SettingsListComponent,
    SettingsListItemComponent,
    SettingsEditFormComponent,
    SettingsEditComponent,
    SettingsYearsListComponent,
    SettingsYearsListItemComponent,
    SettingsYearsCreateComponent,
    SettingsYearsCreateFormComponent,
    SettingsYearsEditComponent,
    SettingsYearsEditFormComponent,
    SettingsCentretypeListComponent,
    SettingsCentretypeListItemComponent,
    SettingsCentretypeCreateComponent,
    SettingsCentretypeCreateFormComponent,
    SettingsCentretypeEditComponent,
    SettingsCentretypeEditFormComponent,
    AssessmentsSectionsComponent,
    AssessmentsSectionEditFormComponent,
    AssessmentsSectionEditListComponent,
    AssessmentsSectionAddFormComponent,
    AssessmentsSectionEditComponent,
    AssessmentsSectionEditCategoriesComponent,
    AssessmentsSectionEditQuestionsComponent,
    NotDeletedPipe,
    AssessmentStatusPipe,
    AssessmentSectionStatusPipe,
    SafeHtmlPipe,
    UserAssessmentsComponent,
    UserAssessmentsListComponent,
    UserAssessmentsListItemComponent,
    UserAssessmentDetailsComponent,
    UserAssessmentDetailsSectionComponent,
    UserAssessmentDetailsSectionsListComponent,
    UserAssessmentDetailsSectionsListItemComponent,
    UserAssessmentDetailsSectionsTotalsComponent,
    UserAssessmentSectionSummaryComponent,
    UserAssessmentSectionIntroComponent,
    UserAssessmentCertificateComponent,
    UserAssessmentSectionQuestionsComponent,
    UserAssessmentSectionSummaryListComponent,
    UserAssessmentHistoryListComponent,
    UserAssessmentHistoryCertificateComponent,
    OfficersComponent,
    AddOfficerComponent,
    EditOfficerComponent,
    OfficersListComponent,
    OfficersWrapperComponent,
    TinyImagesComponent,
    InvigilatorsWrapperComponent,
    UserAssessmentDetailsSectionsListMinitemComponent,
    SecurityConfidentialityAgreementComponent,
    ReportingComponent,
    ReportingAssessmentSectionsComponent,
    ReportingAssessmentListComponent,
    ReportingAssessmentListItemComponent,
    ReportingAssessmentSectionsListComponent,
    SLTComponent,
    SLTsWrapperComponent,
    SLTListComponent,
    SltsListItemComponent,
    AddSltComponent,
    AddSltFormComponent,
    SLTDetailsComponent,
    SltDetailsAssessmentComponent,
    SltDetailsAssessmentHistoryComponent,
    SltDetailsBasicComponent,
    AssessmentsSectionEditStatementComponent,
    AssessmentsEditStatementComponent,
    ConfirmationStatementComponent,
    UserAssessmentSectionStatementComponent,
    OfficerDetailsComponent,
    ReportDashboardComponent,
    ReportingCentreComponent,
    ReportingCentreListComponent,
    ReportingCentreListItemComponent,
    ReportingCentreInfoComponent,
    ReportingCentreInfoListComponent,
    ReportingSectionComponent,
    ReportingAssessmentSectionsListItemComponent,
    ReportingSectionItemComponent,
    LicenceManagementComponent,
    LicenceManagementListComponent,
    LicenceManagementListItemComponent,
    OrganisationsComponent,
    OrganisationsDetailsComponent,
    OrganisationsCentreListComponent,
    SettingsOrganisationtypeListComponent,
    SettingsOrganisationtypeListItemComponent,
    SettingsOrganisationtypeCreateComponent,
    SettingsOrganisationtypeCreateFormComponent,
    SettingsOrganisationtypeEditComponent,
    SettingsOrganisationtypeEditFormComponent,
    OrganisationsCreateComponent,
    OrganisationsCreateFormComponent,
    LicenceCreateComponent,
    LicenceCreateFormComponent,
    LicenceEditComponent,
    LicenceEditFormComponent,
    OrganisationsEditComponent,
    OrganisationsEditFormComponent,
    CountdownTimerComponent,
    OrganisationsEditFormComponent,
    AssessmentsEoQualCreateComponent,
    AssessmentsEoQualCreateFormComponent,
    AssessmentsDuplicateComponent,
    AssessmentsDuplicateFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    TinyMceModule.forRoot(tinymceDefaultSettings()),
    MatSlideToggleModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    UserServiceService,
    CentreServiceService,
    GlobalSettingsService,
    FormValidationService,
    PermissionsServiceService,
    PageServiceService,
    SettingsService,
    CentreTypeService,
    AssessmentService,
    AssessmentYearService,
    AssessmentRoleService,
    SectionService,
    StatementService,
    QuestionService,
    QuestionGroupService,
    AnswerService,
    UserAssessmentService,
    UserAssessmentSectionService,
    UserAssessmentAnswerService,
    ExamServiceService,
    CertificateService,
    ReportingService,
    OrganisationService,
    OrganisationTypeService,
    LicenceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
