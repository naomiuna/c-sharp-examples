using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class UpdateQuestionGroupViewModel
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public int SectionID { get; set; }

        [Required]
        public int OrderId { get; set; }

        [Required(ErrorMessage = "Please enter a category title")]
        [Display(Name = "Title")]
        [StringLength(400, ErrorMessage = "Category title value is too long")]
        public string Title { get; set; }
    }
}
