using Mav.Common.Models;
using Mav.Services.Identity.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Mav.Models.ViewModels;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Security.Claims;
using IdentityModel;
using Mav.Common.Services;
using Mav.Common.Extensions;
using System.Collections.Generic;
using Mav.Data.Repositories;

namespace Mav.Services.Identity.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> UserManager;
        private readonly IIdentityUnitOfWork UnitOfWork;

        private readonly IConfiguration Configuration;
        private readonly IMapper Mapper;

        public UserService(
            UserManager<ApplicationUser> userManager,
            IIdentityUnitOfWork unitOfWork,
            IConfiguration configuration,
            IMapper mapper
        ) {
            UserManager = userManager;
            UnitOfWork = unitOfWork;
            Configuration = configuration;
            Mapper = mapper;
        }

        public async Task<T> GetUserById<T>(string id)
        {
            var user = await UserManager.FindByIdAsync(id);
            if (user == null) { return default(T); }
            
            var mR = Mapper.Map<T>(user);
            return mR;
        }

        public async Task<ExamUserViewModel> GetExamUserById(string id)
        {
            var user = await UserManager.FindByIdAsync(id);
            if (user == null) { return new ExamUserViewModel(); }

            var mR = Mapper.Map<ExamUserViewModel>(user);
            mR.CanEditCentre = await UserManager.IsInRoleAsync(user, EnumRoleType.ExamOfficer.ToString());

            return mR;
        }

        public async Task<IList<string>> GetUserRoles(string id)
        {
            var appUser = await UserManager.FindByIdAsync(id);
            var userRoles = await UserManager.GetRolesAsync(appUser);
            return userRoles;
        }

        public async Task<GenericResult<T>> CreateUser<T>(AddUserViewModel vm)
        {
            var r = new GenericResult<T>();

            // Check if username already exists
            var userCheck = await UserManager.FindByNameAsync(vm.Email);
            if (userCheck != null)
            {
                r.Status = EnumStatusCode.NotUnique;
                r.Message = "An account is already registered using that email";
                return r;
            }
            else
            {
                // Email settings
                var emailConfigSection = Configuration.GetSection("EmailConfigModel");
                var emailConfig = emailConfigSection.Get<EmailConfigModel>();

                if (emailConfig == null)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = "Email settings missing";
                    return r;
                }

                // User model
                var newUser = new ApplicationUser
                {
                    UserName = vm.Email,
                    Email = vm.Email,
                    EmailConfirmed = false,
                    TwoFactorEnabled = false,
                    Enabled = vm.Enabled,
                    FirstName = vm.FirstName,
                    Surname = vm.Surname,
                    CreatedBy = vm.CreatorID
                };

                // Create user account
                var result = await UserManager.CreateAsync(newUser);
                if (!result.Succeeded)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = result.Errors.First().Description;
                    return r;
                }

                // Create verification token
                var verifyToken = Guid.NewGuid().ToString();

                // Save the token against the user
                newUser.ResetToken = verifyToken;
                await UserManager.UpdateAsync(newUser);

                // Assign role
                result = await UserManager.AddToRoleAsync(newUser, vm.Role);
                if (!result.Succeeded)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = result.Errors.First().Description;
                    return r;
                }

                // Assign claims
                result = await UserManager.AddClaimsAsync(newUser, new Claim[]{
                            new Claim(JwtClaimTypes.Name, $"{newUser.FirstName} {newUser.Surname}"),
                            new Claim(JwtClaimTypes.GivenName, newUser.FirstName),
                            new Claim(JwtClaimTypes.FamilyName, newUser.Surname),
                            new Claim(JwtClaimTypes.Email, newUser.Email),
                            new Claim(JwtClaimTypes.EmailVerified, "false", ClaimValueTypes.Boolean),
                            new Claim(JwtClaimTypes.Role, vm.Role)
                        });
                if (!result.Succeeded)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = result.Errors.First().Description;
                    return r;
                }

                // Email for verification
                var emailConfigModel = new EmailConfigModel
                {
                    SiteName = emailConfig.SiteName,
                    SiteUrl = emailConfig.AuthorityUrl,
                    SenderEmailAddress = emailConfig.SenderEmailAddress,
                    SupportRcptEmailAddress = emailConfig.SupportRcptEmailAddress,
                    DebugMode = emailConfig.DebugMode
                };

                var verifyLink = string.Format(Common.SystemConstants.VerifyAdminAccount, verifyToken, newUser.Id, vm.ReturnUrl);
                var Recipients = new string[] { newUser.Email };
                var emailParams = new EmailParam[] {
                            new EmailParam("[RECIPIENT_FIRSTNAME]", newUser.FirstName),
                            new EmailParam("[FULL_NAME]", $"{newUser.FirstName} {newUser.Surname}"),
                            new EmailParam("[EMAIL]", newUser.Email),
                            new EmailParam("[VERIFY_LINK]", $"{emailConfigModel.SiteUrl}{verifyLink}"),
                            new EmailParam("[USERID]", newUser.Id)
                        };

                var emailResult = EmailService.SendEmail(emailConfigModel,
                                    Recipients,
                                    new string[] { "" },
                                    EnumEmailType.NewAdminAccount.ToString(),
                                    EnumHelperService.GetDescription(EnumEmailType.NewAdminAccount),
                                    null,
                                    emailParams);

                if (!emailResult)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = "An error occurred sending the verification email";
                    return r;
                }

                r.Status = EnumStatusCode.Ok;
                r.KeyID = newUser.Id.ConvertStringToTypeValue<T>();
            }

            return r;
        }

        public async Task<GenericResult<T>> CreateExamInvigilator<T>(AddInvigilatorViewModel vm)
        {
            var r = new GenericResult<T>();

            // Check if username already exists
            var userCheck = await UserManager.FindByNameAsync(vm.Email);
            if (userCheck != null)
            {
                r.Status = EnumStatusCode.NotUnique;
                r.Message = "An account is already registered using that email";
                return r;
            }
            else
            {
                // Email settings
                var emailConfigSection = Configuration.GetSection("EmailConfigModel");
                var emailConfig = emailConfigSection.Get<EmailConfigModel>();

                if (emailConfig == null)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = "Email settings missing";
                    return r;
                }

                // User model
                var newUser = new ApplicationUser
                {
                    UserName = vm.Email,
                    Email = vm.Email,
                    EmailConfirmed = false,
                    TwoFactorEnabled = false,
                    Enabled = vm.Enabled,
                    FirstName = vm.FirstName,
                    Surname = vm.Surname,
                    CreatedBy = vm.CreatorID
                };

                // Create user account
                var result = await UserManager.CreateAsync(newUser);
                if (!result.Succeeded)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = result.Errors.First().Description;
                    return r;
                }

                // Create verification token
                var verifyToken = Guid.NewGuid().ToString();

                // Save the token against the user
                newUser.ResetToken = verifyToken;
                await UserManager.UpdateAsync(newUser);

                // Assign role
                var roleName = EnumRoleType.ExamInvigilator.ToString();
                result = await UserManager.AddToRoleAsync(newUser, roleName);
                if (!result.Succeeded)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = result.Errors.First().Description;
                    return r;
                }

                // Assign claims
                result = await UserManager.AddClaimsAsync(newUser, new Claim[]{
                            new Claim(JwtClaimTypes.Name, $"{newUser.FirstName} {newUser.Surname}"),
                            new Claim(JwtClaimTypes.GivenName, newUser.FirstName),
                            new Claim(JwtClaimTypes.FamilyName, newUser.Surname),
                            new Claim(JwtClaimTypes.Email, newUser.Email),
                            new Claim(JwtClaimTypes.EmailVerified, "false", ClaimValueTypes.Boolean),
                            new Claim(JwtClaimTypes.Role, roleName)
                        });
                if (!result.Succeeded)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = result.Errors.First().Description;
                    return r;
                }

                // Email for verification
                var emailConfigModel = new EmailConfigModel
                {
                    SiteName = emailConfig.SiteName,
                    SiteUrl = emailConfig.AuthorityUrl,
                    SenderEmailAddress = emailConfig.SenderEmailAddress,
                    SupportRcptEmailAddress = emailConfig.SupportRcptEmailAddress,
                    DebugMode = emailConfig.DebugMode
                };

                var verifyLink = string.Format(Common.SystemConstants.VerifyInvigilatorAccount, verifyToken, newUser.Id, vm.ReturnUrl);
                var Recipients = new string[] { newUser.Email };
                var emailParams = new EmailParam[] {
                            new EmailParam("[RECIPIENT_FIRSTNAME]", newUser.FirstName),
                            new EmailParam("[FULL_NAME]", $"{newUser.FirstName} {newUser.Surname}"),
                            new EmailParam("[EMAIL]", newUser.Email),
                            new EmailParam("[VERIFY_LINK]", $"{emailConfigModel.SiteUrl}{verifyLink}"),
                            new EmailParam("[USERID]", newUser.Id)
                        };

                var emailResult = EmailService.SendEmail(emailConfigModel,
                                    Recipients,
                                    new string[] { "" },
                                    EnumEmailType.NewInvigilatorAccount.ToString(),
                                    EnumHelperService.GetDescription(EnumEmailType.NewInvigilatorAccount),
                                    null,
                                    emailParams);

                //if (!emailResult)
                //{
                //    r.Status = EnumStatusCode.UnexpectedError;
                //    r.Message = "An error occurred sending the verification email";
                //    return r;
                //}

                r.Status = EnumStatusCode.Ok;
                r.KeyID = newUser.Id.ConvertStringToTypeValue<T>();
            }

            return r;
        }

        public async Task<GenericResult<T>> CreateSLT<T>(AddSLTViewModel vm)
        {
            var r = new GenericResult<T>();

            // Check if username already exists
            var userCheck = await UserManager.FindByNameAsync(vm.Email);
            if (userCheck != null)
            {
                r.Status = EnumStatusCode.NotUnique;
                r.Message = "An account is already registered using that email";
                return r;
            }
            else
            {
                // Email settings
                var emailConfigSection = Configuration.GetSection("EmailConfigModel");
                var emailConfig = emailConfigSection.Get<EmailConfigModel>();

                if (emailConfig == null)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = "Email settings missing";
                    return r;
                }

                // User model
                var newUser = new ApplicationUser
                {
                    UserName = vm.Email,
                    Email = vm.Email,
                    EmailConfirmed = false,
                    TwoFactorEnabled = false,
                    Enabled = vm.Enabled,
                    FirstName = vm.FirstName,
                    Surname = vm.Surname,
                    CreatedBy = vm.CreatorID
                };

                // Create user account
                var result = await UserManager.CreateAsync(newUser);
                if (!result.Succeeded)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = result.Errors.First().Description;
                    return r;
                }

                // Create verification token
                var verifyToken = Guid.NewGuid().ToString();

                // Save the token against the user
                newUser.ResetToken = verifyToken;
                await UserManager.UpdateAsync(newUser);

                // Assign role
                var roleName = EnumRoleType.SLT.ToString();
                result = await UserManager.AddToRoleAsync(newUser, roleName);
                if (!result.Succeeded)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = result.Errors.First().Description;
                    return r;
                }

                // Assign claims
                result = await UserManager.AddClaimsAsync(newUser, new Claim[]{
                            new Claim(JwtClaimTypes.Name, $"{newUser.FirstName} {newUser.Surname}"),
                            new Claim(JwtClaimTypes.GivenName, newUser.FirstName),
                            new Claim(JwtClaimTypes.FamilyName, newUser.Surname),
                            new Claim(JwtClaimTypes.Email, newUser.Email),
                            new Claim(JwtClaimTypes.EmailVerified, "false", ClaimValueTypes.Boolean),
                            new Claim(JwtClaimTypes.Role, roleName)
                        });
                if (!result.Succeeded)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = result.Errors.First().Description;
                    return r;
                }

                // Email for verification
                var emailConfigModel = new EmailConfigModel
                {
                    SiteName = emailConfig.SiteName,
                    SiteUrl = emailConfig.AuthorityUrl,
                    SenderEmailAddress = emailConfig.SenderEmailAddress,
                    SupportRcptEmailAddress = emailConfig.SupportRcptEmailAddress,
                    DebugMode = emailConfig.DebugMode
                };

                var verifyLink = string.Format(Common.SystemConstants.VerifyInvigilatorAccount, verifyToken, newUser.Id, vm.ReturnUrl);
                var Recipients = new string[] { newUser.Email };
                var emailParams = new EmailParam[] {
                            new EmailParam("[RECIPIENT_FIRSTNAME]", newUser.FirstName),
                            new EmailParam("[FULL_NAME]", $"{newUser.FirstName} {newUser.Surname}"),
                            new EmailParam("[EMAIL]", newUser.Email),
                            new EmailParam("[VERIFY_LINK]", $"{emailConfigModel.SiteUrl}{verifyLink}"),
                            new EmailParam("[USERID]", newUser.Id)
                        };

                var emailResult = EmailService.SendEmail(emailConfigModel,
                                    Recipients,
                                    new string[] { "" },
                                    EnumEmailType.NewSLTAccount.ToString(),
                                    EnumHelperService.GetDescription(EnumEmailType.NewSLTAccount),
                                    null,
                                    emailParams);

                if (!emailResult)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = "An error occurred sending the verification email";
                    return r;
                }

                r.Status = EnumStatusCode.Ok;
                r.KeyID = newUser.Id.ConvertStringToTypeValue<T>();
            }

            return r;
        }


        public async Task<GenericResult<T>> CreateExamOfficer<T>(AddInvigilatorViewModel vm)
        {
            var r = new GenericResult<T>();

            // Check if username already exists
            var userCheck = await UserManager.FindByNameAsync(vm.Email);
            if (userCheck != null)
            {
                r.Status = EnumStatusCode.NotUnique;
                r.Message = "An account is already registered using that email";
                return r;
            }
            else
            {
                // Email settings
                var emailConfigSection = Configuration.GetSection("EmailConfigModel");
                var emailConfig = emailConfigSection.Get<EmailConfigModel>();

                if (emailConfig == null)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = "Email settings missing";
                    return r;
                }

                // User model
                var newUser = new ApplicationUser
                {
                    UserName = vm.Email,
                    Email = vm.Email,
                    EmailConfirmed = false,
                    TwoFactorEnabled = false,
                    Enabled = vm.Enabled,
                    FirstName = vm.FirstName,
                    Surname = vm.Surname,
                    CreatedBy = vm.CreatorID
                };

                // Create user account
                var result = await UserManager.CreateAsync(newUser);
                if (!result.Succeeded)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = result.Errors.First().Description;
                    return r;
                }

                // Create verification token
                var verifyToken = Guid.NewGuid().ToString();

                // Save the token against the user
                newUser.ResetToken = verifyToken;
                await UserManager.UpdateAsync(newUser);

                // Assign role
                var roleName = EnumRoleType.ExamOfficer.ToString();
                result = await UserManager.AddToRoleAsync(newUser, roleName);
                if (!result.Succeeded)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = result.Errors.First().Description;
                    return r;
                }

                // Assign claims
                result = await UserManager.AddClaimsAsync(newUser, new Claim[]{
                            new Claim(JwtClaimTypes.Name, $"{newUser.FirstName} {newUser.Surname}"),
                            new Claim(JwtClaimTypes.GivenName, newUser.FirstName),
                            new Claim(JwtClaimTypes.FamilyName, newUser.Surname),
                            new Claim(JwtClaimTypes.Email, newUser.Email),
                            new Claim(JwtClaimTypes.EmailVerified, "false", ClaimValueTypes.Boolean),
                            new Claim(JwtClaimTypes.Role, roleName)
                        });
                if (!result.Succeeded)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = result.Errors.First().Description;
                    return r;
                }

                // Email for verification
                var emailConfigModel = new EmailConfigModel
                {
                    SiteName = emailConfig.SiteName,
                    SiteUrl = emailConfig.AuthorityUrl,
                    SenderEmailAddress = emailConfig.SenderEmailAddress,
                    SupportRcptEmailAddress = emailConfig.SupportRcptEmailAddress,
                    DebugMode = emailConfig.DebugMode
                };

                var verifyLink = string.Format(Common.SystemConstants.VerifyOfficerAccount, verifyToken, newUser.Id, vm.ReturnUrl);
                var Recipients = new string[] { newUser.Email };
                var emailParams = new EmailParam[] {
                            new EmailParam("[RECIPIENT_FIRSTNAME]", newUser.FirstName),
                            new EmailParam("[FULL_NAME]", $"{newUser.FirstName} {newUser.Surname}"),
                            new EmailParam("[EMAIL]", newUser.Email),
                            new EmailParam("[VERIFY_LINK]", $"{emailConfigModel.SiteUrl}{verifyLink}"),
                            new EmailParam("[USERID]", newUser.Id)
                        };

                var emailResult = EmailService.SendEmail(emailConfigModel,
                                    Recipients,
                                    new string[] { "" },
                                    EnumEmailType.NewOfficerAccountCreated.ToString(),
                                    EnumHelperService.GetDescription(EnumEmailType.NewOfficerAccountCreated),
                                    null,
                                    emailParams);

                //if (!emailResult)
                //{
                //    r.Status = EnumStatusCode.UnexpectedError;
                //    r.Message = "An error occurred sending the verification email";
                //    return r;
                //}

                r.Status = EnumStatusCode.Ok;
                r.KeyID = newUser.Id.ConvertStringToTypeValue<T>();
            }

            return r;
        }

        public async Task<GenericResult<T>> UpdateUser<T>(UserViewModel vm)
        {
            var r = new GenericResult<T>();

            var appUser = await UserManager.FindByIdAsync(vm.Id);
            if (appUser == null) {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The account could not be found";
                return r;
            }

            var emailChanged = !appUser.Email.Equals(vm.Email, StringComparison.OrdinalIgnoreCase);
            if (emailChanged)
            {
                // Check if username already exists
                var userCheck = await UserManager.FindByNameAsync(vm.Email);
                if (userCheck != null)
                {
                    r.Status = EnumStatusCode.NotUnique;
                    r.Message = "An account is already registered using that email";
                    return r;
                }
            }

            var fnChanged = !appUser.FirstName.Equals(vm.FirstName, StringComparison.OrdinalIgnoreCase);
            var snChanged = !appUser.Surname.Equals(vm.Surname, StringComparison.OrdinalIgnoreCase);

            appUser.UserName = appUser.Email = vm.Email;
            appUser.FirstName = vm.FirstName;
            appUser.Surname = vm.Surname;
            appUser.Enabled = vm.Enabled;

            var result = await UserManager.UpdateAsync(appUser);
            if (!result.Succeeded)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = result.Errors.First().Description;
                return r;
            }

            // Update role if present & different
            if (!string.IsNullOrEmpty(vm.Role))
            {
                var roles = await GetUserRoles(vm.Id);
                var primaryRole = roles.FirstOrDefault() ?? "";

                if (!primaryRole.Equals(vm.Role, StringComparison.OrdinalIgnoreCase))
                {
                    result = await UserManager.RemoveFromRoleAsync(appUser, primaryRole);
                    result = await UserManager.AddToRoleAsync(appUser, vm.Role);

                    if (!result.Succeeded)
                    {
                        var roleClaim = (await UserManager.GetClaimsAsync(appUser)).FirstOrDefault(x => x.Type == JwtClaimTypes.Role);
                        if (roleClaim == null)
                        {
                            await UserManager.AddClaimAsync(appUser, new Claim(JwtClaimTypes.Role, vm.Role));
                        }
                        else
                        {
                            await UserManager.ReplaceClaimAsync(appUser, roleClaim, new Claim(JwtClaimTypes.Role, vm.Role));
                        }

                        r.Status = EnumStatusCode.UnexpectedError;
                        r.Message = result.Errors.First().Description;
                        return r;
                    }
                }
            }

            // Update associated claims
            Claim claimToReplace;
            if (emailChanged)
            {
                claimToReplace = (await UserManager.GetClaimsAsync(appUser)).FirstOrDefault(x => x.Type == JwtClaimTypes.Email);
                await UserManager.ReplaceClaimAsync(appUser, claimToReplace, new Claim(JwtClaimTypes.Email, appUser.Email));
            }
            if (fnChanged || snChanged)
            {
                claimToReplace = (await UserManager.GetClaimsAsync(appUser)).FirstOrDefault(x => x.Type == JwtClaimTypes.Name);
                await UserManager.ReplaceClaimAsync(appUser, claimToReplace, new Claim(JwtClaimTypes.Name, $"{appUser.FirstName} {appUser.Surname}"));
            }
            if (fnChanged)
            {
                claimToReplace = (await UserManager.GetClaimsAsync(appUser)).FirstOrDefault(x => x.Type == JwtClaimTypes.GivenName);
                await UserManager.ReplaceClaimAsync(appUser, claimToReplace, new Claim(JwtClaimTypes.GivenName, appUser.FirstName));
            }
            if (snChanged)
            {
                claimToReplace = (await UserManager.GetClaimsAsync(appUser)).FirstOrDefault(x => x.Type == JwtClaimTypes.FamilyName);
                await UserManager.ReplaceClaimAsync(appUser, claimToReplace, new Claim(JwtClaimTypes.FamilyName, appUser.Surname));
            }
            
            r.Status = EnumStatusCode.Ok;
            r.KeyID = appUser.Id.ConvertStringToTypeValue<T>();

            return r;
        }

        public async Task<GenericResult<T>> DeleteUser<T>(string id)
        {
            var r = new GenericResult<T>();

            var appUser = await UserManager.FindByIdAsync(id);
            if (appUser == null) {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The account could not be found";
                return r;
            }

            // Mark user as deleted
            appUser.Deleted = true;

            // Mark email and username with timestamp
            var stamp = DateTime.UtcNow.ToString("yyyyMMddHHmm");
            appUser.Email = $"{appUser.Email}_{stamp}";
            appUser.UserName = $"{appUser.UserName}_{stamp}";

            var result = await UserManager.UpdateAsync(appUser);
            if (!result.Succeeded) {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = result.Errors.First().Description;
                return r;
            }

            // Remove from roles
            var roles = await UserManager.GetRolesAsync(appUser);
            result = await UserManager.RemoveFromRolesAsync(appUser, roles);
            if (!result.Succeeded)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = result.Errors.First().Description;
                return r;
            }

            r.Status = EnumStatusCode.Ok;
            r.KeyID = appUser.Id.ConvertStringToTypeValue<T>();

            return r;
        }
        public async Task<string> GetRoleIDByRole(string role)
        {
            var repo = UnitOfWork.GetRepositoryAsync<IdentityRole>();
            var r = await repo.GetAsync(x => x.Name != "");
            return r.FirstOrDefault(x => x.Name == role).Id;
        }

        public async Task<string> GetRoleNameByRole(string roleId)
        {
            var repo = UnitOfWork.GetRepositoryAsync<IdentityRole>();
            var r = await repo.GetAsync(x => x.Id != "");
            if(r.FirstOrDefault(x => x.Id == roleId) == null)
            {
                return "Undefined";
            }
            else
            {
                return r.FirstOrDefault(x => x.Id == roleId).Name;
            }
        }
    }
}
