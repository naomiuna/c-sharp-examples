using System;
using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class UpdateUserAssessmentViewModel
    {
        [Required]
        public int ID { get; set; }

        public DateTime? SubmittedOn { get; set; }
    }
}
