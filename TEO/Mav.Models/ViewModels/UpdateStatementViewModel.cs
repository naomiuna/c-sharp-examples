using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class UpdateStatementViewModel
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public int Number { get; set; }

        [Required(ErrorMessage = "Please enter a statement")]
        [Display(Name = "Title")]
        [StringLength(4000, ErrorMessage = "Statement value is too long")]
        public string Content { get; set; }

        public List<StatementQuestionViewModel> Questions { get; set; }

        public List<UserStatementAnswerViewModel> Answers { get; set; }
    }

}
