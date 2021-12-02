using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class AddSectionViewModel
    {
        [Required]
        public int AssessmentID { get; set; }

        [Required]
        public int Number { get; set; }

        [Required(ErrorMessage = "Please enter an section title")]
        [Display(Name = "Title")]
        [StringLength(400, ErrorMessage = "Section title value is too long")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Please enter an booklet reference")]
        [Display(Name = "Title")]
        [StringLength(200, ErrorMessage = "Booklet reference value is too long")]
        public string Reference { get; set; }

        [Required]
        public bool IsRandom { get; set; }

        public int? Quantity { get; set; }

        public int? MaxAttempts { get; set; }

        public bool? IsEoQualification { get; set; }

        public double? TimeLimit { get; set; }
    }
}
