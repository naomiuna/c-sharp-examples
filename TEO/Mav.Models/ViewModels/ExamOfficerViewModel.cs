using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class ExamOfficerViewModel
    {
        [Required(ErrorMessage = "Please enter your first name")]
        [Display(Name = "First Name")]
        [StringLength(100, ErrorMessage = "First name value is too long")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Please enter your surname")]
        [Display(Name = "Surname")]
        [StringLength(100, ErrorMessage = "Surname value is too long")]
        public string Surname { get; set; }

        [Required(ErrorMessage = "Please enter your email address")]
        [Display(Name = "Email Address")]
        [StringLength(250, ErrorMessage = "Email value is too long")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Enabled flag is missing")]
        [Range(typeof(bool), "true", "true", ErrorMessage = "Enabled must be set")]
        public bool Enabled { get; set; }

        public int? CentreID { get; set; }
    }
}
