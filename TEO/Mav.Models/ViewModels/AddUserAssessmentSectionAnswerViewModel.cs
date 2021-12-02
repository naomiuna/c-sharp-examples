using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class AddUserAssessmentSectionAnswerViewModel
    {
        [Required]
        public int UserAssessmentSectionID { get; set; }

        [Required]
        public int QuestionID { get; set; }

        public int? AnswerID { get; set; }

        public List<int> AnswerIDs { get; set; }

        public string AnswerAsString { get; set; }

        public int Correct { get; set; }
    }
}
