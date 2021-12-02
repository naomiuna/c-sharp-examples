using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class UserAssessment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        public int AssessmentID { get; set; }

        [Required]
        [MaxLength(450)]
        public string UserID { get; set; }

        [Required]
        public int YearID { get; set; }

        public Guid? KeyID { get; set; }

        public DateTime StartedOn { get; set; }

        public DateTime? SubmittedOn { get; set; }

        [ForeignKey(nameof(AssessmentID))]
        public virtual Assessment Assessment { get; set; }

        public virtual ICollection<UserAssessmentSection> UserAssessmentSections { get; set; } = new List<UserAssessmentSection>();
    }
}
