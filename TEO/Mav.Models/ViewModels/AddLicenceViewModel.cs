using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Mav.Models.ViewModels
{
    public class AddLicenceViewModel
    {
        [Required]
        public int OrganisationID { get; set; }

        [Required(ErrorMessage = "Please specify a max number of centres")]
        [Display(Name = "Max Centres")]
        public int MaxCentres { get; set; }

        [Required(ErrorMessage = "Please specify a cost amount for this licence")]
        public double Cost { get; set; }

        [Required(ErrorMessage = "Please select an academmic year for this licence")]
        [Display(Name = "Academic Year")]
        public int AcademicYear { get; set; }

        [Required]
        public bool Paid { get; set; }
    }
}
