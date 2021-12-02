using System.ComponentModel;

namespace Mav.Data.Enums
{
    public enum EnumAssessmentSectionStatus
    {
        [Description("Not Started")]
        NotStarted,
        [Description("Started")]
        Started,
        [Description("Passed")]
        Passed,
        [Description("TopScore")]
        TopScore,
        [Description("Attempts Exceeded")]
        AttmeptsExceeded,
        [Description("Timer Reached")]
        TimerReached
    }
}
