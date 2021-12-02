using System;

namespace Mav.Models.ViewModels
{
    public class UserAssessmentViewModel
    {
        public int ID { get; set; }

        public string UserID { get; set; }

        public int AssessmentID { get; set; }

        public int YearID { get; set; }

        public DateTime StartedOn { get; set; }

        public DateTime? SubmittedOn { get; set; }

        public int StatusID { get; set; }
    }
}
