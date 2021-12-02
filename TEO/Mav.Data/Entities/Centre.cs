using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class Centre
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        public int TypeID { get; set; }

        //[Required]
        //public int OrganisationID { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; }
        
        [MaxLength(100)]
        public string Number { get; set; }

        public bool Enabled { get; set; }

        public bool? Deleted { get; set; }

        public DateTime? CreatedOn { get; set; }

        public string CreatedBy { get; set; }

        [ForeignKey(nameof(TypeID))]
        public virtual CentreType CentreType { get; set; }

        //[ForeignKey(nameof(OrganisationID))]
        //public virtual Organisation Organisation { get; set; }

        public virtual ICollection<Assessment> Assessments { get; set; } = new List<Assessment>();
    }
}
