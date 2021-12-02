using System;
using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class SubmitUserAssessmentSectionViewModel
    {
        [Required]
        public int ID { get; set; }

        public bool? Passed { get; set; }

        public DateTime? PassedOn { get; set; }

        public double? TimePassed { get; set; } // the time passed for EO timed assessments
    }
}
