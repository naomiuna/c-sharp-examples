using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Mav.Services.Identity.Models;

namespace Mav.API.DbContexts
{
    public class MavConnectDbContext : IdentityDbContext<ApplicationUser>
    {
        public MavConnectDbContext(DbContextOptions<MavConnectDbContext> options)
            : base(options)
        {
            Database.SetCommandTimeout(300);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            //builder.Entity<ApplicationUser>(b => {
            //    b.HasMany(x => x.Roles).WithOne().HasForeignKey(ur => ur.UserId).IsRequired();
            //});
        }
    }
}
