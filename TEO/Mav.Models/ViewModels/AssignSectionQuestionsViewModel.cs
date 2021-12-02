using System;
using System.Collections.Generic;

namespace Mav.Models.ViewModels
{
    public class AssignSectionQuestionsViewModel
    {
        public int SectionID { get; set; }

        public List<AssignQuestionItem> QuestionSet { get; set; }

        public int? QuestionSetSize { get; set; }
    }

    public class AssignQuestionItem
    {
        public int? GroupID { get; set; }

        public int? GroupOrderID { get; set; }

        public int QuestionID { get; set; }

        public int QuestionOrderID { get; set; }
    }

    public class AssessmentSectionTotals
    {
        public int UserAssessmentID { get; set; }

        public Guid? KeyID { get; set; }

        public int TotalSections { get; set; }

        public int TotalSectionsCompleted { get; set; }

        public int TotalScore { get; set; }

        public int MaxScore { get; set; }

        public int RoundScore { get; set; }

        public bool PassRateReached { get; set; }

        public bool Submitted { get; set; }

        public DateTime? SubmittedOn { get; set; }

        public bool ActionAllowed { get; set; }

        public string Grade { get; set; }
    }

}
