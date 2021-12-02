using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class UpdateAnswerViewModel
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public int QuestionID { get; set; }

        [Required(ErrorMessage = "Please enter a answer title")]
        [Display(Name = "Title")]
        [StringLength(500, ErrorMessage = "Answer title value is too long")]
        public string Title { get; set; }

        [Required]
        public bool IsCorrect { get; set; }

        [Required]
        public int OrderID { get; set; }

        [Required]
        public bool Active { get; set; }

        [Required]
        public bool Deleted { get; set; }
    }
}
