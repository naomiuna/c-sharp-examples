using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Mav.Services.Identity.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(100)]
        public string FirstName { get; set; }

        [MaxLength(100)]
        public string Surname { get; set; }

        public bool? Enabled { get; set; }

        [MaxLength(200)]
        public string ResetToken { get; set; }

        [MaxLength(450)]
        public string CreatedBy { get; set; }

        public int? CentreID { get; set; }

        public bool? Deleted { get; set; }

        // public virtual ICollection<IdentityUserRole<string>> Roles { get; } = new List<IdentityUserRole<string>>();
    }
}
