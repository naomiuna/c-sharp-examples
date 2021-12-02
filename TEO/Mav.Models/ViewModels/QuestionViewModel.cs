using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class QuestionViewModel
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public int SectionID { get; set; }

        public int? GroupID { get; set; }

        public string GroupName { get; set; }

        [Required]
        public int Number { get; set; }

        [Required]
        public int TypeID { get; set; }

        public string TypeName { get; set; }

        [Required(ErrorMessage = "Please enter a question title")]
        [Display(Name = "Title")]
        [StringLength(500, ErrorMessage = "Question title value is too long")]
        public string Title { get; set; }

        [Required]
        public bool Active { get; set; }
    }
}
