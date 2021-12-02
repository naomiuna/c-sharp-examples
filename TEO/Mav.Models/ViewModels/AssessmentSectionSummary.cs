using System.Collections.Generic;

namespace Mav.Models.ViewModels
{
    public class AssessmentSectionSummary
    {
        public int GroupID { get; set; }

        public int OrderID { get; set; }

        public string GroupName { get; set; }

        public List<AssessmentSectionSummaryItem> Questions { get; set; }

        public int RecentScore { get; set; }
    }

    public class AssessmentSectionSummaryItem
    {
        public int QuestionNumber { get; set; }

        public string QuestionTitle { get; set; }

        public int QuestionTypeID { get; set; }

        public string MyAnswerText { get; set; }

        public int MyAnswerCorrect { get; set; }

        public string QuestionHintText { get; set; }
    }
}
