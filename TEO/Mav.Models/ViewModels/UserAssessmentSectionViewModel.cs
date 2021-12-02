using System;

namespace Mav.Models.ViewModels
{
    public class UserAssessmentSectionViewModel
    {
        public int ID { get; set; }

        public int UserAssessmentID { get; set; }

        public int Score { get; set; }

        public int Attempts { get; set; }

        public int? MaxAttempts { get; set; }

        public bool? Passed { get; set; }

        public DateTime StartedOn { get; set; }

        public DateTime? PassedOn { get; set; }

        public int StatusID { get; set; }

        public int SectionID { get; set; }

        public int SectionNumber { get; set; }

        public string SectionTitle { get; set; }

        public string QuestionSet { get; set; }

        public int? QuestionSetSize { get; set; }

        public bool ActionAllowed { get; set; }

        public UserSectionTimerViewModel UserSectionTimer { get; set; }

    }
}
