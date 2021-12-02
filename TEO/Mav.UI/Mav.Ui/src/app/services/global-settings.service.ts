import { Injectable } from '@angular/core';

@Injectable()
export class GlobalSettingsService {

  constructor() { }

  public application_id: 'exams_office';

  public contentPages = {
    privacyPolicy: 1,
    termsAndConditions: 2,
    termsAndConditionsRegistration: 3,
    securityAndConfidentialityAgreement: 4
  };

  public roles = {
    examOfficer: 'ExamOfficer',
    administrator: 'Administrator',
    editor: 'Editor',
    examInvigilator: 'ExamInvigilator',
    SLT:'SLT'
  };

  public apiUserEndpoints = {
    getUserById: 'api/1.0/User/GetUserById/{id}',
    getExamUserById: 'api/1.0/User/GetExamUserById/{id}',
    getMyDetails: 'api/1.0/User/GetMyDetails',
    getCurrentUser: 'api/1.0/User/GetCurrentUser',
    getExamInvigilatorDetails: 'api/1.0/User/GetExamInvigilatorDetails/{id}',
    createUser: 'api/1.0/User/CreateUser',
    createExamInvigilator: 'api/1.0/User/CreateExamInvigilator',
    createSLT: 'api/1.0/User/CreateSLT',
    createExamOfficer: 'api/1.0/User/CreateExamOfficer',
    updateUser: 'api/1.0/User/UpdateUser',
    deleteUser: 'api/1.0/User/DeleteUser/{id}',
    getInvigilatorSearch: 'api/1.0/UserSearch/GetInvigilatorSearch',
    getSLTSearch: 'api/1.0/UserSearch/GetSLTSearch',
    getOfficerSearch: 'api/1.0/UserSearch/GetOfficerSearch',
    getAdminUserSearch: 'api/1.0/UserSearch/GetAdminUserSearch'
  };

  public apiCentreEndpoints = {
    isCentreActive: 'api/1.0/Centre/IsCentreActive/{id}',
    getCentreById: 'api/1.0/Centre/GetCentreById/{id}',
    getCentreSearchByUserId: 'api/1.0/CentreSearch/GetCentreSearchByUserId/{userId}',
    checkCentreContact: 'api/1.0/CentreSearch/CheckCentreContact/{id}',
    getCentreByUserId: 'api/1.0/Centre/GetCentreByUserId/{id}',
    getMyCentre: 'api/1.0/Centre/GetMyCentre',
    getCentreSearch: 'api/1.0/CentreSearch/GetCentreSearch',
    getCentreInvigilatorTotals: 'api/1.0/Centre/GetCentreInvigilatorTotals/{id}',
    getCentreSLTTotals: 'api/1.0/Centre/GetCentreSLTTotals/{id}',
    updateCentre: 'api/1.0/Centre/UpdateCentre',
    deleteCentre: 'api/1.0/Centre/DeleteCentre/{id}',
    updateCentreContact: 'api/1.0/CentreSearch/UpdateCentreContact'
  };

  public apiPageEndpoints = {
    getPageById: 'api/1.0/Page/GetPageById/{id}',
    getPageList: 'api/1.0/Page/GetPageList',
    updatePage: 'api/1.0/Page/UpdatePage'
  };

  public apiSettingEndpoints = {
    getSettingById: 'api/1.0/Setting/GetSettingById/{id}',
    getSettingByName: 'api/1.0/Setting/GetSettingByName/{id}',
    getSettings: 'api/1.0/Setting/GetSettings',
    updateSetting: 'api/1.0/Setting/UpdateSetting'
  };

  public apiCentreTypeEndpoints = {
    getCentreTypeById: 'api/1.0/CentreType/GetCentreTypeById/{id}',
    getCentreTypeList: 'api/1.0/CentreType/GetCentreTypeList',
    createCentreType: 'api/1.0/CentreType/CreateCentreType',
    updateCentreType: 'api/1.0/CentreType/UpdateCentreType',
    deleteCentreType: 'api/1.0/CentreType/DeleteCentreType/{id}'
  };

  public apiAssessmentEndpoints = {
    getAssessmentById: 'api/1.0/Assessment/GetAssessmentById/{id}',
    getAllAssessments: 'api/1.0/Assessment/GetAllAssessments',
    createAssessment: 'api/1.0/Assessment/CreateAssessment',
    createEoAssessment: 'api/1.0/Assessment/CreateEoAssessment',
    updateAssessment: 'api/1.0/Assessment/UpdateAssessment',
    deleteAssessment: 'api/1.0/Assessment/DeleteAssessment/{id}',
    isEoQualification: 'api/1.0/Assessment/IsEOQualification/{id}',
    duplicateAssessment: 'api/1.0/Assessment/DuplicateAssessment'
  };

  public apiAssessmentYearEndpoints = {
    getAssessmentYearById: 'api/1.0/AssessmentYear/GetAssessmentYearById/{id}',
    getAssessmentYearList: 'api/1.0/AssessmentYear/GetAssessmentYearList',
    createAssessmentYear: 'api/1.0/AssessmentYear/CreateAssessmentYear',
    updateAssessmentYear: 'api/1.0/AssessmentYear/UpdateAssessmentYear',
    deleteAssessmentYear: 'api/1.0/AssessmentYear/DeleteAssessmentYear/{id}'
  };

  public apiAssessmentRoleEndpoints = {   
    getAssessmentRoleList: 'api/1.0/Assessment/GetAssessmentRoleList'    
  };
 
  public apiSectionEndpoints = {
    getSectionById: 'api/1.0/Section/GetSectionById/{id}',
    getSectionList: 'api/1.0/Section/GetSectionList/{id}',
    getSectionListPages: 'api/1.0/Section/GetSectionListPages',
    createSection: 'api/1.0/Section/CreateSection',
    updateSection: 'api/1.0/Section/UpdateSection',
    deleteSection: 'api/1.0/Section/DeleteSection/{id}',
  };

  public apiStatementEndpoints = {
    getStatementById: 'api/1.0/Statement/GetStatementById/{id}',
    getStatementBySectionId: 'api/1.0/Statement/GetStatementBySectionId/{id}',
    getStatementByAssessmentId: 'api/1.0/Statement/GetStatementByAssessmentId/{id}',
    createStatement: 'api/1.0/Statement/CreateStatement',
    updateStatement: 'api/1.0/Statement/UpdateStatement',
    deleteStatement: 'api/1.0/Statement/DeleteStatement/{id}',
    getStatmentAnswersByUserId: 'api/1.0/Statement/GetUserStatementAnswers/{id}/{userid}',
    updateUserStatementAnswers: 'api/1.0/Statement/UpdateUserStatementAnswers'
  }

  public apiQuestionGroupEndpoints = {
    getQuestionGroupById: 'api/1.0/QuestionGroup/GetQuestionGroupById/{id}',
    getQuestionGroupList: 'api/1.0/QuestionGroup/GetQuestionGroupList/{id}',
    createQuestionGroup: 'api/1.0/QuestionGroup/CreateQuestionGroup',
    updateQuestionGroup: 'api/1.0/QuestionGroup/UpdateQuestionGroup',
    deleteQuestionGroup: 'api/1.0/QuestionGroup/DeleteQuestionGroup/{id}'
  };

  public apiQuestionEndpoints = {
    getQuestionById: 'api/1.0/Question/GetQuestionById/{id}',
    getQuestionList: 'api/1.0/Question/GetQuestionList/{id}',
    createQuestion: 'api/1.0/Question/CreateQuestion',
    updateQuestion: 'api/1.0/Question/UpdateQuestion',
    deleteQuestion: 'api/1.0/Question/DeleteQuestion/{id}'
  };

  public apiAnswerEndpoints = {
    getAnswerById: 'api/1.0/Answer/GetAnswerById/{id}',
    getAnswerList: 'api/1.0/Answer/GetAnswerList/{id}',
    createAnswer: 'api/1.0/Answer/CreateAnswer',
    updateAnswer: 'api/1.0/Answer/UpdateAnswer',
    insertUpdateAnswer: 'api/1.0/Answer/InsertUpdateAnswer',
    deleteAnswer: 'api/1.0/Answer/DeleteAnswer/{id}'
  };

  public apiUserAssessmentEndpoints = {
    getUserAssessmentById: 'api/1.0/UserAssessment/GetUserAssessmentById/{id}',
    getUserAssessmentListByUserId: 'api/1.0/UserAssessment/GetUserAssessmentListByUserId',
    getUserLatestAssessment: 'api/1.0/UserAssessment/GetUserLatestAssessment/{id}',
    getUserHistory: 'api/1.0/UserAssessment/GetUserHistory',
    createUserAssessment: 'api/1.0/UserAssessment/CreateUserAssessment',
    updateUserAssessment: 'api/1.0/UserAssessment/UpdateUserAssessment',
    submitUserAssessment: 'api/1.0/UserAssessment/SubmitUserAssessment'
  };

  public apiUserAssessmentSectionEndpoints = {
    getUserAssessmentSectionById: 'api/1.0/UserAssessmentSection/GetUserAssessmentSectionById/{id}',
    getUserAssessmentSectionQuestions: 'api/1.0/UserAssessmentSection/GetUserAssessmentSectionQuestions/{id}',
    getUserAssessmentSectionTotals: 'api/1.0/UserAssessmentSection/GetUserAssessmentSectionTotals/{id}',
    lookupNextSectionStep: 'api/1.0/UserAssessmentSection/LookupNextSectionStep/{id}',
    getUserAssessmentSectionListByUserId: 'api/1.0/UserAssessmentSection/GetUserAssessmentSectionListByUserId',
    createUserAssessmentSection: 'api/1.0/UserAssessmentSection/CreateUserAssessmentSection',
    updateUserAssessmentSection: 'api/1.0/UserAssessmentSection/UpdateUserAssessmentSection',
    submitUserAssessmentSection: 'api/1.0/UserAssessmentSection/SubmitUserAssessmentSection',
    restartUserAssessmentSection: 'api/1.0/UserAssessmentSection/RestartUserAssessmentSection/{id}',
    updateUserSectionStatsViewModel: 'api/1.0/UserAssessmentSection/UpdateUserSectionStats'
  };

  public apiUserAssessmentSectionAnswerEndpoints = {
    getUserAssessmentAnswerById: 'api/1.0/UserAssessmentAnswer/GetUserAssessmentAnswerById/{id}',
    getUserAssessmentAnswerByKeys: 'api/1.0/UserAssessmentAnswer/GetUserAssessmentAnswerByKeys/{sectid}/{questid}',
    createUserAssessmentSectionAnswer: 'api/1.0/UserAssessmentAnswer/CreateUserAssessmentSectionAnswer',
    updateUserAssessmentSectionAnswer: 'api/1.0/UserAssessmentAnswer/UpdateUserAssessmentSectionAnswer'
  };

  public apiExamEndpoints = {
    getExamQuestionById: 'api/1.0/Exam/getExamQuestionById/{id}',
    getSectionSummaryDetails: 'api/1.0/Exam/GetSectionSummaryDetails/{id}',
    getRecentScore: 'api/1.0/Exam/GetRecentScore/{id}'
  };

  public apiCertificateEndpoints = {
    getCertificate: 'api/1.0/Certificate/GetCertificate/{id}/{key}'
  };

  public apiReportingEndpoints = {
    getAssessmentSectionReport: 'api/1.0/Reporting/GetAssessmentSectionReport',
    getSectionReport: 'api/1.0/Reporting/GetSectionReport',
    getCentreReport: 'api/1.0/Reporting/GetCentreReport',
    getCentreReportsCsvAll: 'api/1.0/Reporting/GetCentreReportsCsvAll',
    getAssessmentReportsCsvAll: 'api/1.0/Reporting/GetAssessmentReportsCsvAll',
    getAssessmentSectionReportsCsvAll: 'api/1.0/Reporting/GetAssessmentSectionReportsCsvAll',
    getSectionReportsCsvAll: 'api/1.0/Reporting/GetSectionReportsCsvAll',
  };

  public apiOrganisationEndpoints = {
    getOrganisationById: 'api/1.0/Organisation/GetOrganisationById/{id}',
    getAllOrganisations: 'api/1.0/Organisation/GetAllOrganisations',
    createOrganisation: 'api/1.0/Organisation/CreateOrganisation',
    updateOrganisation: 'api/1.0/Organisation/UpdateOrganisation',
    deleteOrganisation: 'api/1.0/Organisation/DeleteOrganisation/{id}'
  };

  public apiOrganisationTypeEndpoints = {
    getOrganisationTypeById: 'api/1.0/OrganisationType/GetOrganisationTypeById/{id}',
    getOrganisationTypeList: 'api/1.0/OrganisationType/GetOrganisationTypeList',
    createOrganisationType: 'api/1.0/OrganisationType/CreateOrganisationType',
    updateOrganisationType: 'api/1.0/OrganisationType/UpdateOrganisationType',
    deleteOrganisationType: 'api/1.0/OrganisationType/DeleteOrganisationType/{id}'
  }

  public apiLicenceEndpoints = {
    getLicenceById: 'api/1.0/Licence/GetLicenceById/{id}',
    getLicenceByOrgId: 'api/1.0/Licence/GetLicenceByOrgId/{orgId}',
    createLicence: 'api/1.0/Licence/CreateLicence',
    createLicenceDisabled: 'api/1.0/Licence/CreateLicenceDisabled',
    updateLicence: 'api/1.0/Licence/UpdateLicence',
    updateLicenceDisabled: 'api/1.0/Licence/UpdateLicenceDisabled',
    deleteLicence: 'api/1.0/Licence/DeleteLicence/{id}',
    enableAccount: 'api/1.0/Licence/EnableAccount/{orgId}',
    disableAccount: 'api/1.0/Licence/DisableAccount/{orgId}'
  }

  public getCurrentAcademicYear(): number {
    const dtnTicks = Date.now();
    const dtnDate = new Date(dtnTicks);
    const currentYear = dtnDate.getFullYear();
    const currentMonth = dtnDate.getMonth();
    return currentMonth < 9 ? currentYear - 1 : currentYear;
  }

}
