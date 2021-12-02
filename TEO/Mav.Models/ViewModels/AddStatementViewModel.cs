using Mav.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Mav.Models.ViewModels
{
    public class AddStatementViewModel
    {

        [Required]
        public int ParentID { get; set; }

        [Required]
        public EnumStatementType StatementType { get; set; }

        [Required]
        public int Number { get; set; }

        [Required(ErrorMessage = "Please enter a statement")]
        [Display(Name = "Statement")]
        [StringLength(4000, ErrorMessage = "Statement value is too long")]
        public string Content { get; set; }

        public List<StatementQuestionViewModel> Questions { get; set; }
    }
}
