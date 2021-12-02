namespace Mav.Common
{
    public class SystemConstants
    {
        // api/1.0/Centre/IsCentreActive/{id}
        public const string IsCentreActive = "api/1.0/Centre/IsCentreActive/{id}";

        // api/1.0/Centre/IsCentreActiveByUserId/{id}
        public const string IsCentreActiveByUserId = "api/1.0/Centre/IsCentreActiveByUserId/{id}";

        // api/1.0/Centre/GetCentreById/{id}
        public const string GetCentreById = "api/1.0/Centre/GetCentreById/{id}";

        // api/1.0/Centre/GetCentreByName/{centreName}
        public const string GetCentreByName = "api/1.0/Centre/GetCentreByName/{centreName}";

        // api/1.0/Centre/GetCentreByNumber/{centre}
        public const string GetCentreByNumber = "api/1.0/Centre/GetCentreByNumber/{centreNumber}";

        // api/1.0/Centre/AddUserCentre
        public const string AddUserCentre = "api/1.0/Centre/AddUserCentre";

        // api/1.0/Centre/AddCentre
        public const string AddCentre = "api/1.0/Centre/AddCentre";

        // api/1.0/Centre/UpdateCentre
        public const string UpdateCentre = "api/1.0/Centre/UpdateCentre";

        // api/1.0/Page/GetPublicPageById/{id}
        public const string GetPublicPageById = "api/1.0/Page/GetPublicPageById/{id}";

        // Exam Officer Account verification
        public const string VerifyAccount = "register/verify/{0}/{1}/{2}";

        // Exam Invigilator Account verification
        public const string VerifyInvigilatorAccount = "register/verifyinvigilator/{0}/{1}/{2}";

        // SLT Account verification
        public const string VerifySLTAccount = "register/verifySLT/{0}/{1}/{2}";

        // Exam Invigilator Account verification
        public const string VerifyOfficerAccount = "register/verifyofficer/{0}/{1}/{2}";

        // Admin Account verification
        public const string VerifyAdminAccount = "register/verifyadmin/{0}/{1}/{2}";

        // Password reset request verification
        public const string VerifyRasswordRequestAccount = "account/ResetPassword/{0}/{1}/{2}";

        // View assessment certificate details
        public const string ViewAssessmentCertificate = "user-assessment-certificate/{0}/{1}";

        // Identity Key
        public const string IdentityKey = "sub";

        // Global Email Sender
        public const string SettingGlobalEmailSender = "GlobalEmailSender";

        // Max Centre Invigilators
        public const string SettingMaxCentreInvigilators = "MaxCentreInvigilators";

        // Page IDs
        public const int PrivacyPolicy = 1;
        public const int TermsAndConditions = 2;
        public const int TermsAndConditionsRegistration = 3;
        public const int SecurityAndConfidentialityAgreement = 4;
    }
}
