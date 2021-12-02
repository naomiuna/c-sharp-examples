using System;

namespace Mav.Models.SearchModels
{
    public class UserAssessmentListingModel
    {
        public int AssessmentID { get; set; }

        public int? UserAssessmentID { get; set; }

        public Guid? KeyID { get; set; }

        public int YearID { get; set; }

        public string Title { get; set; }

        public string YearDisplay { get; set; }

        public int StatusID { get; set; }

        public DateTime? SubmittedOn { get; set; }

        public string TargetGroup { get; set; }
    }
}
