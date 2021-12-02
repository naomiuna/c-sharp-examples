using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class AddUserAssessmentSectionViewModel
    {
        [Required]
        public int UserAssessmentID { get; set; }

        [Required]
        public int SectionID { get; set; }
    }
}
