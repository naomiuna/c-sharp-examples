using System.ComponentModel.DataAnnotations;

namespace IdentityServer4.Quickstart.UI
{
    public class VerifyAdminViewModel : VerifyResultViewModel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string Token { get; set; }

        [Required(ErrorMessage = "Please enter your password")]
        [Display(Name = "Password")]
        [StringLength(30, ErrorMessage = "Password value is too long")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Please confirm your password")]
        [Display(Name = "Confirm Password")]
        [StringLength(30, ErrorMessage = "Confirm password value is too long")]
        public string ConfirmPassword { get; set; }
    }
}
