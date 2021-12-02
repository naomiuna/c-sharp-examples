using Mav.Data.Entities;
using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class UpdateAssessmentViewModel
    {
        public int ID { get; set; }

        [Required]
        public int YearID { get; set; }

        public bool EoQualification { get; set; }

        [Required]
        public int MinScore { get; set; }

        [Required(ErrorMessage = "Please enter an assessment title")]
        [Display(Name = "Title")]
        [StringLength(400, ErrorMessage = "Assessment title value is too long")]
        public string Title { get; set; }

        public string Guide { get; set; }

        public string Objectives { get; set; }

        public bool Published { get; set; }

        public int? StatementID { get; set; }

        [Required]
        public string RoleID { get; set; }

        public AssessmentGradeViewModel AssessmentGrade { get; set; }
    }
}
