using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Mav.Data.Entities
{
    public class Organisation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        public int TypeID { get; set; }

        public int? LicenceID { get; set; }

        [Required]
        [MaxLength(100)]
        public string OrganisationName { get; set; }

        [Required]
        [MaxLength(100)]
        public string AddressLine1 { get; set; }

        public string AddressLine2 { get; set; }

        public string AddressLine3 { get; set; }

        [Required]
        [MaxLength(100)]
        public string MainContactName { get; set; }

        [Required]
        [MaxLength(100)]
        public string MainContactEmail { get; set; }

        [Required]
        [MaxLength(100)]
        public string LeadFinancialName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LeadFinancialEmail { get; set; }

        [Required]
        [MaxLength(12)]
        public string LeadFinancialNumber { get; set; }

        [Required]
        public int CentreLimit { get; set; }

        [Required]
        public bool Enabled { get; set; }

        public bool? Deleted { get; set; }

        [ForeignKey(nameof(TypeID))]
        public virtual OrganisationType OrganisationType { get; set; }

        [ForeignKey(nameof(LicenceID))]
        public virtual Licence Licence { get; set; }
    }
}
