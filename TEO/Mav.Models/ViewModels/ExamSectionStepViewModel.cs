namespace Mav.Models.ViewModels
{
    public class ExamSectionStepViewModel
    {
        public int UserAssessmentID { get; set; }

        public int CurrentSectionID { get; set; }

        public int? NextSectionID { get; set; }

        public int? NextSectionStatusID { get; set; }

        public int? NextUserAssessmentSectionID { get; set; }
    }
}
