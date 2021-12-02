using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Mav.Models.ViewModels
{
    public class UpdateOrganisationViewModel
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public int TypeID { get; set; }

        [Required(ErrorMessage = "Please enter an organisation name")]
        [Display(Name = "Organisation Name")]
        [StringLength(100, ErrorMessage = "Organisation name value is too long")]
        public string OrganisationName { get; set; }

        [Required(ErrorMessage = "Please enter an organisation address")]
        [MaxLength(100)]
        public string AddressLine1 { get; set; }

        public string AddressLine2 { get; set; }

        public string AddressLine3 { get; set; }

        [Required(ErrorMessage = "Please enter a main contact name")]
        [Display(Name = "Main Contact Name")]
        [StringLength(100, ErrorMessage = "Main contact name value is too long")]
        public string MainContactName { get; set; }

        [Required(ErrorMessage = "Please enter a main contact email")]
        [Display(Name = "Main Contact Email")]
        [StringLength(100, ErrorMessage = "Main contact email value is too long")]
        public string MainContactEmail { get; set; }

        [Required(ErrorMessage = "Please enter a lead financial name")]
        [Display(Name = "Lead Financial Name")]
        [StringLength(100, ErrorMessage = "Lead financial name value is too long")]
        public string LeadFinancialName { get; set; }

        [Required(ErrorMessage = "Please enter a lead financial email")]
        [Display(Name = "Lead Financial Email")]
        [StringLength(100, ErrorMessage = "Lead financial email value is too long")]
        public string LeadFinancialEmail { get; set; }

        [Required(ErrorMessage = "Please enter a lead financial telephone number")]
        [Display(Name = "Lead Financial Number")]
        public string LeadFinancialNumber { get; set; }

        [Required(ErrorMessage = "Please enter a valid centre limit for the organisation")]
        public int CentreLimit { get; set; }
    }
}
