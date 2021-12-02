using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class AddUserAssessmentViewModel
    {
        [Required]
        public int AssessmentID { get; set; }

        [Required]
        public int YearID { get; set; }

        [Required]
        public string UserID { get; set; }
    }
}
