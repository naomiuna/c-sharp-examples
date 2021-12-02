using System.ComponentModel.DataAnnotations;

namespace IdentityServer4.Quickstart.UI
{
    public class RegisterOfficerViewModel
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

        [Required(ErrorMessage = "Please confirm your email address")]
        [Display(Name = "Confirm Email Address")]
        [StringLength(250, ErrorMessage = "Confirm email value is too long")]
        public string ConfirmEmail { get; set; }

        [Required(ErrorMessage = "Please enter your password")]
        [Display(Name = "Password")]
        [StringLength(30, ErrorMessage = "Password value is too long")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Please confirm your password")]
        [Display(Name = "Confirm Password")]
        [StringLength(30, ErrorMessage = "Confirm password value is too long")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Please select your centre type")]
        [Display(Name = "Centre Type")]
        public int CentreTypeID { get; set; }

        [Required(ErrorMessage = "Please enter your centre name")]
        [Display(Name = "Centre Name")]
        [MaxLength(200, ErrorMessage = "Centre name value is too long")]
        public string CentreName { get; set; }
        
        [Display(Name = "Centre Number")]
        [MaxLength(100, ErrorMessage = "Centre number value is too long")]
        public string CentreNumber { get; set; }

        [Required(ErrorMessage = "Please agree to the terms and conditions")]
        [Range(typeof(bool), "true", "true", ErrorMessage = "Please agree to the terms and conditions")]
        public bool Enabled { get; set; }

        public string ReturnUrl { get; set; }
    }
}
