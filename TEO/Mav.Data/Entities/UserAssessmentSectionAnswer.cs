using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class UserAssessmentSectionAnswer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        public int UserAssessmentSectionID { get; set; }

        [Required]
        public int QuestionID { get; set; }

        public int? AnswerID { get; set; }

        public string AnswerAsString { get; set; }

        public int Correct { get; set; }

        public DateTime? ModifiedOn { get; set; }

        [ForeignKey(nameof(UserAssessmentSectionID))]
        public virtual UserAssessmentSection UserAssessmentSection { get; set; }
    }
}
