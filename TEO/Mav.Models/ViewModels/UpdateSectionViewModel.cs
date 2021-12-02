using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class UpdateSectionViewModel
    {
        public int ID { get; set; }

        [Required]
        public int AssessmentID { get; set; }

        public int? TimerID { get; set; }

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

        public string Information { get; set; }

        public int? StatementID { get; set; }

        //Total Sections in Assessment, used to alter UI if the assessment only has one section
        public int SectionCount { get; set; }

        public int? MaxAttempts { get; set; }

        // Indicates whether this section is part of an assessment which is an EO qualification
        public bool? IsEoQualification { get; set; }

        public TimerViewModel Timer { get; set; }
    }
}
