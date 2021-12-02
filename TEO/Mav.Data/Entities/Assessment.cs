using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class Assessment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public int? CentreID { get; set; }

        [Required]
        public int YearID { get; set; }

        public bool EoQualification { get; set; }

        [Required]
        [MaxLength(400)]
        public string Title { get; set; }

        public int? StatementID { get; set; }

        public string Guide { get; set; }

        public string Objectives { get; set; }

        public int MinScore { get; set; }

        public DateTime? CreatedOn { get; set; }

        [MaxLength(450)]
        public string CreatedBy { get; set; }

        [Required]
        public bool Active { get; set; }

        [Required]
        public bool Published { get; set; }

        public DateTime? PublishedOn { get; set; }

        public bool? Deleted { get; set; }

        [ForeignKey(nameof(CentreID))]
        public virtual Centre Centre { get; set; }

        [ForeignKey(nameof(StatementID))]
        public virtual Statement Statement { get; set; }

        public virtual ICollection<Section> Sections { get; set; } = new List<Section>();

        public virtual ICollection<UserAssessment> UserAssessments { get; set; } = new List<UserAssessment>();

        public virtual RoleAssessment Role { get; set; }

        public virtual AssessmentGrade AssessmentGrade { get; set; }
    }
}
