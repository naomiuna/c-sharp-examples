using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Mav.Data.Entities
{
    public class Licence
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        public int OrganisationID { get; set; }

        [Required]
        public int MaxCentres { get; set; }

        [Required]
        public double Cost { get; set; }

        [Required]
        public int AcademicYear { get; set; }

        [Required]
        public bool Paid { get; set; }

        [Required]
        public bool Enabled { get; set; }

        public bool? Deleted { get; set; }

        [ForeignKey(nameof(OrganisationID))]
        public virtual Organisation Organisation { get; set; }
    }
}
