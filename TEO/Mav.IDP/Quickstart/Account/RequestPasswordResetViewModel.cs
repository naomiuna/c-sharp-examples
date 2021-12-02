using System.ComponentModel.DataAnnotations;

namespace IdentityServer4.Quickstart.UI
{
    public class RequestPasswordResetViewModel
    {
        [Required(ErrorMessage = "Please enter your email address")]
        [Display(Name = "Email Address")]
        [StringLength(250, ErrorMessage = "Email value is too long")]
        public string Email { get; set; }

        public string ReturnUrl { get; set; }
    }
}
