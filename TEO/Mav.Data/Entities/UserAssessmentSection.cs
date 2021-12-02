using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class UserAssessmentSection
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        public int UserAssessmentID { get; set; }

        public int? UserSectionTimerID { get; set; }

        public DateTime StartedOn { get; set; }
                
        public int? Score { get; set; }

        public bool? Passed { get; set; }

        public DateTime? PassedOn { get; set; }

        [Required]
        public int Attempts { get; set; }

        public int? MaxAttempts { get; set; }

        public int? SectionID { get; set; }

        public int? StatementID { get; set; }

        public string QuestionSet { get; set; }

        public int? QuestionSetSize { get; set; }

        [ForeignKey(nameof(UserAssessmentID))]
        public virtual UserAssessment UserAssessment { get; set; }

        [ForeignKey(nameof(SectionID))]
        public virtual Section Section { get; set; }

        [ForeignKey(nameof(StatementID))]
        public virtual Statement Statement { get; set; }

        [ForeignKey(nameof(UserSectionTimerID))]
        public virtual UserSectionTimer UserSectionTimer { get; set; }

        public virtual ICollection<UserAssessmentSectionAnswer> UserAssessmentSectionAnswers { get; set; } = new List<UserAssessmentSectionAnswer>();
    }
}
