using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class UpdateQuestionViewModel
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public int SectionID { get; set; }

        public int? GroupID { get; set; }

        [Required]
        public int Number { get; set; }

        [Required]
        public int TypeID { get; set; }

        public int? Selections { get; set; }

        public int? YesNoCorrectID { get; set; }

        [Required(ErrorMessage = "Please enter a question title")]
        [Display(Name = "Title")]
        [StringLength(500, ErrorMessage = "Question title value is too long")]
        public string Title { get; set; }

        [Display(Name = "HintText")]
        [StringLength(500, ErrorMessage = "Hint text value is too long")]
        public string HintText { get; set; }

        [Required]
        public bool Active { get; set; }
    }
}
