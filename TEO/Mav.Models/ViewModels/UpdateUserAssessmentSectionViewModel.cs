using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class UpdateUserAssessmentSectionViewModel
    {
        [Required]
        public int ID { get; set; }

        public int? Score { get; set; }

        public int Attempts { get; set; }
    }
}
