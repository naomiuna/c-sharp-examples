using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class Section
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        public int AssessmentID { get; set; }

        public int? TimerID { get; set; }

        [Required]
        public int Number { get; set; }

        [Required]
        [MaxLength(400)]
        public string Title { get; set; }

        public string Information { get; set; }

        public string Reference { get; set; }

        public string ImageUri { get; set; }

        [Required]
        public bool IsRandom { get; set; }

        public int? Quantity { get; set; }

        public int? StatementID { get; set; }

        public bool? Deleted { get; set; }

        public int? MaxAttempts { get; set; }

        public bool? IsEoQualification { get; set; }

        [ForeignKey(nameof(TimerID))]
        public virtual Timer Timer { get; set; }

        [ForeignKey(nameof(AssessmentID))]
        public virtual Assessment Assessment { get; set; }

        [ForeignKey(nameof(StatementID))]
        public virtual Statement Statement { get; set; }

        public virtual ICollection<QuestionGroup> QuestionGroups { get; set; } = new List<QuestionGroup>();

        public virtual ICollection<Question> Questions { get; set; } = new List<Question>();

        public virtual ICollection<UserAssessmentSection> UserAssessmentSections { get; set; } = new List<UserAssessmentSection>();
    }
}
