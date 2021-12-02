using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class AddAssessmentViewModel
    {
        [Required]
        public int YearID { get; set; }

        [Required]
        public string RoleID { get; set; }

        [Required]
        public int MinScore { get; set; }

        [Required(ErrorMessage = "Please enter an assessment title")]
        [Display(Name = "Title")]
        [StringLength(400, ErrorMessage = "Assessment title value is too long")]
        public string Title { get; set; }

        [MaxLength(450)]
        public string CreatedBy { get; set; }
    }
}
