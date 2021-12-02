using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Mav.Models.ViewModels
{
    public class AddAssessmentEoViewModel
    {
        [Required]
        public int YearID { get; set; }

        [Required]
        public string RoleID { get; set; }

        [Required]
        public int PassScore { get; set; }

        [Required]
        public int MeritScore { get; set; }

        [Required]
        public int DistinctionScore { get; set; }

        [Required(ErrorMessage = "Please enter an assessment title")]
        [Display(Name = "Title")]
        [StringLength(400, ErrorMessage = "Assessment title value is too long")]
        public string Title { get; set; }

        [MaxLength(450)]
        public string CreatedBy { get; set; }
    }
}
