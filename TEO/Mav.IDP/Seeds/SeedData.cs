using System;
using System.Linq;
using System.Security.Claims;
using IdentityModel;
using Mav.IDP.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Mav.Services.Identity.Models;
using IdentityRole = Microsoft.AspNetCore.Identity.IdentityRole;

namespace Mav.IDP.Seeds
{
    public class SeedData
    {
        public IConfiguration Configuration { get; }
        public SeedData(IConfiguration configuration) {
            Configuration = configuration;
        }
        
        public static void EnsureSeedData(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = scope.ServiceProvider.GetService<ApplicationDbContext>();
                context.Database.Migrate();

                #region Roles

                var configuration = serviceProvider.GetRequiredService<IConfiguration>();
                var roleSection = configuration.GetSection("SystemRoles");
                var roles = roleSection.Get<SystemRoles>();

                var roleMgr = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                //if (!roleMgr.Roles.Any()) {
                    foreach (var role in roles.Roles)
                    {
                        if (!roleMgr.Roles.Any(x => x.Name == role))
                        {
                            var result = roleMgr.CreateAsync(new IdentityRole { Name = role }).Result;
                            if (!result.Succeeded)
                            {
                                throw new Exception(result.Errors.First().Description);
                            }
                        }
                    }
                //}

                #endregion Roles

                #region Admin User

                var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                var adminUser = userMgr.FindByNameAsync("admin@boxmodel.co.uk").Result;
                if (adminUser == null)
                {
                    adminUser = new ApplicationUser
                    {
                        UserName = "admin@boxmodel.co.uk",
                        Email = "admin@boxmodel.co.uk",
                        EmailConfirmed = true,
                        TwoFactorEnabled = false,
                        Enabled = true,
                        FirstName = "Boxmodel",
                        Surname = "Admin"
                    };

                    var result = userMgr.CreateAsync(adminUser, "Password1!").Result;
                    if (!result.Succeeded)
                    {
                        throw new Exception(result.Errors.First().Description);
                    }

                    result = userMgr.AddToRoleAsync(adminUser, roles.Roles[0]).Result;

                    result = userMgr.AddClaimsAsync(adminUser, new Claim[]{
                        new Claim(JwtClaimTypes.Name, $"{adminUser.FirstName} {adminUser.Surname}"),
                        new Claim(JwtClaimTypes.GivenName, adminUser.FirstName),
                        new Claim(JwtClaimTypes.FamilyName, adminUser.Surname),
                        new Claim(JwtClaimTypes.Email, adminUser.Email),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                        new Claim(JwtClaimTypes.Role, roles.Roles[0])
                    }).Result;
                    if (!result.Succeeded)
                    {
                        throw new Exception(result.Errors.First().Description);
                    }
                    Console.WriteLine("admin user created");
                }
                else
                {
                    Console.WriteLine("admin user already exists");
                }

                #endregion Admin User
            }
        }
    }
}
