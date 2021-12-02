using System.ComponentModel.DataAnnotations;

namespace IdentityServer4.Quickstart.UI
{
    public class ResetPasswordViewModel
    {
        [Required(ErrorMessage = "Please enter your password")]
        [Display(Name = "Password")]
        [StringLength(30, ErrorMessage = "Password value is too long")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Please confirm your password")]
        [Display(Name = "Confirm Password")]
        [StringLength(30, ErrorMessage = "Confirm password value is too long")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Missing or invalid user identifier")]
        public string UserId { get; set; }

        public bool Success { get; set; }
        public string Message { get; set; }
        public string ReturnUrl { get; set; }
        public string Token { get; set; }
    }
}
