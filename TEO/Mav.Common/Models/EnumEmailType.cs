using System.ComponentModel;

namespace Mav.Common.Models
{
    public enum EnumEmailType
    {
        [Description("The Exams Office: Verify Account")]
        NewOfficerAccount,
        [Description("The Exams Office: Verify Account")]
        NewInvigilatorAccount,
        [Description("The Exams Office: Verify Account")]
        NewSLTAccount,
        [Description("The Exams Office: Verify Account")]
        NewOfficerAccountCreated,
        [Description("The Exams Office: Account Set-up Confirmation")]
        InvigilatorAccountConfirmation,
        [Description("The Exams Office: Account Set-up Confirmation")]
        SLTAccountConfirmation,
        [Description("The Exams Office: Verify Account")]
        NewAdminAccount,
        [Description("The Exams Office: Request Password Reset")]
        RequestPasswordReset,
        [Description("The Exams Office: Assessment Submitted")]
        AssessmentSubmitted
    }
}
