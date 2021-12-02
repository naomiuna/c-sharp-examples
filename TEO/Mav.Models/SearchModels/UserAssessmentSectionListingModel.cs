using Mav.Data.Entities;
using Mav.Models.ViewModels;

namespace Mav.Models.SearchModels
{
    public class UserAssessmentSectionListingModel
    {
        public int SectionID { get; set; }

        public int StatementID { get; set; }

        public int? UserAssessmentSectionID { get; set; }

        public int Number { get; set; }

        public string Title { get; set; }

        public int StatusID { get; set; }

        public int TotalScore { get; set; }

        public int TotalQuestions { get; set; }

        public int Attempts { get; set; }

        public bool ActionAllowed { get; set; }

        public int MaxAttempts { get; set; }

        public bool? IsEoQualification { get; set; }

        public double? TimeRemaining { get; set; }
    }
}
