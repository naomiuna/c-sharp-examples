using IdentityModel;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Mav.Common.Models;
using Mav.Models.ViewModels;
using Mav.Common.Services;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using Newtonsoft.Json;
using Mav.Services.Identity.Models;
using Mav.Models.PageModels;
using Mav.IDP.Services;
using Mav.IDP.Quickstart.Account;

namespace IdentityServer4.Quickstart.UI
{
    [SecurityHeaders]
    public class RegisterController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        private readonly IIdentityServerInteractionService _interaction;
        private readonly IClientStore _clientStore;
        private readonly IAuthenticationSchemeProvider _schemeProvider;
        private readonly IEventService _events;

        private readonly IConfiguration _configuration;
        private readonly IBasicHttpClient _basicHttpClient;
        private readonly IPasswordValidatorService _passwordValidatorService;
        private readonly IPageContentService _pageContentService;

        public RegisterController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IIdentityServerInteractionService interaction,
            IClientStore clientStore,
            IAuthenticationSchemeProvider schemeProvider,
            IEventService events,
            IConfiguration configuration,
            IBasicHttpClient basicHttpClient,
            IPasswordValidatorService passwordValidatorService,
            IPageContentService pageContentService
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;

            _interaction = interaction;
            _clientStore = clientStore;
            _schemeProvider = schemeProvider;
            _events = events;
            _configuration = configuration;
            _basicHttpClient = basicHttpClient;
            _passwordValidatorService = passwordValidatorService;
            _pageContentService = pageContentService;
        }

        [AllowAnonymous]
        [HttpGet("[controller]/[action]/{service?}")]
        public async Task<IActionResult> Officer(string service)
        {
            var vm = new RegisterOfficerViewModel
            {
                Enabled = false,
                ReturnUrl = service
            };

            // Get T&Cs Content
            var apiSection = _configuration.GetSection("MavApiSettings");
            var apiSettings = apiSection.Get<Mav.IDP.MavApiSettings>();
            var apiUrl = apiSettings.BaseUrl;

            if (apiUrl == null)
            {
                throw new Exception("API base url missing");
            }

            var pageModel = await _pageContentService.GetPublicPageContent<PublicPageViewModel>(Mav.Common.SystemConstants.TermsAndConditionsRegistration, apiUrl);
            ViewBag.TermsAndConditionsTitle = pageModel.MessageBody.Title.Replace("(Registration)", "");
            ViewBag.TermsAndConditionsContent = pageModel.MessageBody.Content;

            return View(vm);
        }

        [AllowAnonymous]
        [HttpGet("[controller]/[action]/{service?}")]
        public async Task<IActionResult> Invigilator(string service)
        {
            var vm = new RegisterUserViewModel
            {
                Enabled = false,
                ReturnUrl = service
            };

            // Get T&Cs Content
            var apiSection = _configuration.GetSection("MavApiSettings");
            var apiSettings = apiSection.Get<Mav.IDP.MavApiSettings>();
            var apiUrl = apiSettings.BaseUrl;

            if (apiUrl == null)
            {
                throw new Exception("API base url missing");
            }

            var pageModel = await _pageContentService.GetPublicPageContent<PublicPageViewModel>(Mav.Common.SystemConstants.TermsAndConditionsRegistration, apiUrl);
            ViewBag.TermsAndConditionsTitle = pageModel.MessageBody.Title.Replace("(Registration)", "");
            ViewBag.TermsAndConditionsContent = pageModel.MessageBody.Content;

            return View(vm);
        }

        [AllowAnonymous]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Invigilator(RegisterUserViewModel vm, string button)
        {
            if(ModelState.IsValid)
            {
                // API settings
                var apiSection = _configuration.GetSection("MavApiSettings");
                var apiSettings = apiSection.Get<Mav.IDP.MavApiSettings>();
                var apiUrl = apiSettings.BaseUrl;

                // Set HTTP client
                var httpClient = await _basicHttpClient.GetClient(false);
                httpClient.BaseAddress = new Uri(apiUrl);

                if (vm.Enabled != true)
                {
                    ModelState.AddModelError("Enabled", "Please agree to the terms and conditions");
                }
                if (!vm.Email.Equals(vm.ConfirmEmail))
                {
                    ModelState.AddModelError("ConfirmEmail", "Please ensure both emails match");
                }
                if (!vm.Password.Equals(vm.ConfirmPassword))
                {
                    ModelState.AddModelError("ConfirmPassword", "Please ensure both passwords match");
                }

                // Check password complexity
                if (!string.IsNullOrEmpty(vm.Password) && !_passwordValidatorService.IsValid(vm.Password))
                {
                    ModelState.AddModelError("Password", "Password not complex enough. Please ensure at least 8 chars in length and contains 2 or more upper-case letters, numbers or special characters");
                }

                // Check centre number
                var centreId = 0;
                var c2 = httpClient.GetAsync(Mav.Common.SystemConstants.GetCentreByNumber.Replace("{centreNumber}", vm.CentreNumber)).Result;
                if (c2.IsSuccessStatusCode)
                {
                    var jsonString = await c2.Content.ReadAsStringAsync();
                    var deserialised = JsonConvert.DeserializeObject<CentreViewModel>(jsonString);
                    if (deserialised == null)
                    {
                        ModelState.AddModelError("CentreNumber", "A centre with this number does not exist.");
                    }
                    else
                    {
                        centreId = deserialised.ID;
                    }
                }

                if (ModelState.IsValid)
                {
                    // Check if username already exists
                    var userCheck = await _userManager.FindByNameAsync(vm.Email);
                    if (userCheck != null)
                    {
                        ModelState.AddModelError("Email", "An account is already registered using that email");
                    }
                    else
                    {
                        // Email settings
                        var emailConfigSection = _configuration.GetSection("EmailConfigModel");
                        var emailConfig = emailConfigSection.Get<EmailConfigModel>();

                        if (apiUrl == null)
                        {
                            throw new Exception("API base url missing");
                        }

                        if (emailConfig == null)
                        {
                            throw new Exception("Email settings missing");
                        }

                        // User model
                        var newUser = new ApplicationUser
                        {
                            UserName = vm.Email,
                            Email = vm.Email,
                            EmailConfirmed = true,
                            TwoFactorEnabled = false,
                            Enabled = false,
                            FirstName = vm.FirstName,
                            Surname = vm.Surname
                        };

                        // Create user account & password
                        var result = await _userManager.CreateAsync(newUser, vm.Password);
                        if (result.Succeeded)
                        {
                            // Create verification token
                            var verifyToken = Guid.NewGuid().ToString();

                            // Save the token against the user
                            newUser.ResetToken = verifyToken;
                            await _userManager.UpdateAsync(newUser);

                            // UserCentre model
                            var newLink = new AddUserCentreViewModel
                            {
                                CentreID = centreId,
                                UserID = newUser.Id
                            };

                            // Create new link between centre and user
                            var addUserCentreResponse = httpClient.PostAsync(
                                Mav.Common.SystemConstants.AddUserCentre,
                                new StringContent(JsonConvert.SerializeObject(newLink), System.Text.Encoding.Unicode, "application/json")
                                ).Result;

                            // Assign role
                            var roleName = "";
                            if(vm.Role == "Exams Officer")
                            {
                                roleName = EnumRoleType.ExamOfficer.ToString();
                            }
                            if(vm.Role == "Invigilator")
                            {
                                roleName = EnumRoleType.ExamInvigilator.ToString();
                            }
                            else if (vm.Role == "SLT")
                            {
                                roleName = EnumRoleType.SLT.ToString();
                            }
                            result = await _userManager.AddToRoleAsync(newUser, roleName);
                            if (!result.Succeeded)
                            {
                                throw new Exception(result.Errors.First().Description);
                            }

                            // Assign claims
                            result = await _userManager.AddClaimsAsync(newUser, new Claim[]{
                                new Claim(JwtClaimTypes.Name, $"{newUser.FirstName} {newUser.Surname}"),
                                new Claim(JwtClaimTypes.GivenName, newUser.FirstName),
                                new Claim(JwtClaimTypes.FamilyName, newUser.Surname),
                                new Claim(JwtClaimTypes.Email, newUser.Email),
                                new Claim(JwtClaimTypes.EmailVerified, "false", ClaimValueTypes.Boolean),
                                new Claim(JwtClaimTypes.Role, roleName)
                            });
                            if (!result.Succeeded)
                            {
                                throw new Exception(result.Errors.First().Description);
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

                            var verifyLink = string.Format(Mav.Common.SystemConstants.VerifyAccount, verifyToken, newUser.Id, vm.ReturnUrl);
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
                                                EnumEmailType.NewOfficerAccount.ToString(),
                                                EnumHelperService.GetDescription(EnumEmailType.NewOfficerAccount),
                                                null,
                                                emailParams);

                            if (!emailResult)
                            {
                                throw new Exception("An error occurred sending the verification email");
                            }

                            // Display confirmation
                            return View("InvigilatorConfirmed", vm);
                        }
                        else
                        {
                            ModelState.AddModelError("Password", result.Errors.First().Description);
                        }
                    }
                }

            }
            return View(vm);
        }

        [AllowAnonymous]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Officer(RegisterOfficerViewModel vm, string button)
        {
            if (ModelState.IsValid)
            {
                // API settings
                var apiSection = _configuration.GetSection("MavApiSettings");
                var apiSettings = apiSection.Get<Mav.IDP.MavApiSettings>();
                var apiUrl = apiSettings.BaseUrl;

                // Set HTTP client
                var httpClient = await _basicHttpClient.GetClient(false);
                httpClient.BaseAddress = new Uri(apiUrl);

                if (vm.Enabled != true)
                {
                    ModelState.AddModelError("Enabled", "Please agree to the terms and conditions");
                }
                if (!vm.Email.Equals(vm.ConfirmEmail))
                {
                    ModelState.AddModelError("ConfirmEmail", "Please ensure both emails match");
                }
                if (!vm.Password.Equals(vm.ConfirmPassword))
                {
                    ModelState.AddModelError("ConfirmPassword", "Please ensure both passwords match");
                }

                // Check password complexity
                if (!string.IsNullOrEmpty(vm.Password) && !_passwordValidatorService.IsValid(vm.Password))
                {
                    ModelState.AddModelError("Password", "Password not complex enough. Please ensure at least 8 chars in length and contains 2 or more upper-case letters, numbers or special characters");
                }

                // Check centre number
                var c2 = httpClient.GetAsync(Mav.Common.SystemConstants.GetCentreByNumber.Replace("{centreNumber}", vm.CentreNumber)).Result;
                if (c2.IsSuccessStatusCode)
                {
                    var jsonString = await c2.Content.ReadAsStringAsync();
                    var deserialised = JsonConvert.DeserializeObject<CentreViewModel>(jsonString);
                    if (deserialised != null)
                    {
                        ModelState.AddModelError("CentreNumber", "A centre with this number already exists.");
                    }
                }

                if (ModelState.IsValid)
                {
                    // Check if username already exists
                    var userCheck = await _userManager.FindByNameAsync(vm.Email);
                    if (userCheck != null)
                    {
                        ModelState.AddModelError("Email", "An account is already registered using that email");
                    }
                    else
                    {
                        // Email settings
                        var emailConfigSection = _configuration.GetSection("EmailConfigModel");
                        var emailConfig = emailConfigSection.Get<EmailConfigModel>();

                        if (apiUrl == null)
                        {
                            throw new Exception("API base url missing");
                        }

                        if (emailConfig == null)
                        {
                            throw new Exception("Email settings missing");
                        }
                        
                        // User model
                        var newUser = new ApplicationUser
                        {
                            UserName = vm.Email,
                            Email = vm.Email,
                            EmailConfirmed = false,
                            TwoFactorEnabled = false,
                            Enabled = false,
                            FirstName = vm.FirstName,
                            Surname = vm.Surname
                        };

                        // Create user account & password
                        var result = await _userManager.CreateAsync(newUser, vm.Password);
                        if (result.Succeeded)
                        {
                            // Create verification token
                            var verifyToken = Guid.NewGuid().ToString();

                            // Create centre record
                            var newCentre = new AddCentreViewModel
                            {
                                UserID = newUser.Id,
                                Name = vm.CentreName,
                                Number = vm.CentreNumber,
                                TypeID = vm.CentreTypeID,
                                Enabled = true
                            };

                            var addCentreResponse = httpClient.PostAsync(
                                Mav.Common.SystemConstants.AddCentre,
                                new StringContent(JsonConvert.SerializeObject(newCentre), System.Text.Encoding.Unicode, "application/json")
                            ).Result;

                            // Save the token against the user
                            newUser.ResetToken = verifyToken;
                            await _userManager.UpdateAsync(newUser);

                            // Assign role
                            var roleName = EnumRoleType.ExamOfficer.ToString();
                            result = await _userManager.AddToRoleAsync(newUser, roleName);
                            if (!result.Succeeded)
                            {
                                throw new Exception(result.Errors.First().Description);
                            }

                            // Assign claims
                            result = await _userManager.AddClaimsAsync(newUser, new Claim[]{
                                new Claim(JwtClaimTypes.Name, $"{newUser.FirstName} {newUser.Surname}"),
                                new Claim(JwtClaimTypes.GivenName, newUser.FirstName),
                                new Claim(JwtClaimTypes.FamilyName, newUser.Surname),
                                new Claim(JwtClaimTypes.Email, newUser.Email),
                                new Claim(JwtClaimTypes.EmailVerified, "false", ClaimValueTypes.Boolean),
                                new Claim(JwtClaimTypes.Role, roleName)
                            });
                            if (!result.Succeeded)
                            {
                                throw new Exception(result.Errors.First().Description);
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

                            var verifyLink = string.Format(Mav.Common.SystemConstants.VerifyAccount, verifyToken, newUser.Id, vm.ReturnUrl);
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
                                                EnumEmailType.NewOfficerAccount.ToString(),
                                                EnumHelperService.GetDescription(EnumEmailType.NewOfficerAccount),
                                                null,
                                                emailParams);

                            if (!emailResult)
                            {
                                throw new Exception("An error occurred sending the verification email");
                            }

                            // Display confirmation
                            return View("OfficerConfirmed", vm);
                        }
                        else
                        {
                            ModelState.AddModelError("Password", result.Errors.First().Description);
                        }
                    }
                }
            }

            return View(vm);
        }

        [AllowAnonymous]
        [HttpGet("[controller]/[action]/{token}/{userId}/{service?}")]
        public async Task<IActionResult> Verify(string token, string userId, string service)
        {
            var vm = new VerifyResultViewModel() { Success = false, ReturnUrl = service ?? "" };

            var appUser = await _userManager.FindByIdAsync(userId);
            if (!string.IsNullOrEmpty(appUser?.ResetToken))
            {
                var userTokenMatches = appUser.ResetToken != null && appUser.ResetToken.Equals(token);
                if (userTokenMatches)
                {
                    appUser.ResetToken = null;
                    appUser.Enabled = true;
                    appUser.EmailConfirmed = true;
                    
                    var updateResult = await _userManager.UpdateAsync(appUser);
                    if (updateResult.Succeeded)
                    {
                        // Update EmailVerified Claim value
                        var emailVerifiedClaim = (await _userManager.GetClaimsAsync(appUser)).FirstOrDefault(x => x.Type == JwtClaimTypes.EmailVerified);
                        if (emailVerifiedClaim == null)
                        {
                            await _userManager.AddClaimAsync(appUser, new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean));
                        }
                        else
                        {
                            await _userManager.ReplaceClaimAsync(appUser, emailVerifiedClaim, new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean));
                        }

                        vm.Success = true;
                    }
                }
                else
                {
                    vm.Message = "Invalid or expired activation token";
                }
            }
            else
            {
                vm.Message = "An unexpected error has occurred";
            }            

            return View(vm);
        }

        [AllowAnonymous]
        [HttpGet("[controller]/[action]/{token}/{userId}/{service?}")]
        public async Task<IActionResult> VerifyInvigilator(string token, string userId, string service)
        {
            var vm = new VerifyInvigilatorViewModel() { Enabled = false, Success = false, ReturnUrl = service ?? "" };

            var appUser = await _userManager.FindByIdAsync(userId);
            if (!string.IsNullOrEmpty(appUser?.ResetToken))
            {
                var userTokenMatches = appUser.ResetToken != null && appUser.ResetToken.Equals(token);
                if (userTokenMatches)
                {
                    // Get T&Cs Content
                    var apiSection = _configuration.GetSection("MavApiSettings");
                    var apiSettings = apiSection.Get<Mav.IDP.MavApiSettings>();
                    var apiUrl = apiSettings.BaseUrl;

                    if (apiUrl == null)
                    {
                        throw new Exception("API base url missing");
                    }

                    var pageModel = await _pageContentService.GetPublicPageContent<PublicPageViewModel>(Mav.Common.SystemConstants.TermsAndConditionsRegistration, apiUrl);
                    ViewBag.TermsAndConditionsTitle = pageModel.MessageBody.Title.Replace("(Registration)", "");
                    ViewBag.TermsAndConditionsContent = pageModel.MessageBody.Content;

                    vm.Success = true;
                }
                else
                {
                    vm.Message = "Invalid or expired activation token";
                }
            }
            else
            {
                vm.Message = "An unexpected error has occurred";
            }

            return View(vm);
        }

        [AllowAnonymous]
        [HttpPost("[controller]/[action]/{token}/{userId}/{service?}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> VerifyInvigilator(string token, string userId, string service, VerifyInvigilatorViewModel vm)
        {
            if (ModelState.IsValid)
            {
                // Check passwords match
                if (!vm.Password.Equals(vm.ConfirmPassword))
                {
                    ModelState.AddModelError("ConfirmPassword", "Please ensure both passwords match");
                }

                // Check password complexity
                if (!string.IsNullOrEmpty(vm.Password) && !_passwordValidatorService.IsValid(vm.Password))
                {
                    ModelState.AddModelError("Password", "Password not complex enough. Please ensure at least 8 chars in length and contains 2 or more upper-case letters, numbers or special characters");
                }

                if (ModelState.IsValid)
                {
                    var appUser = await _userManager.FindByIdAsync(vm.UserId);
                    if (!string.IsNullOrEmpty(appUser?.ResetToken))
                    {
                        var userTokenMatches = appUser.ResetToken != null && appUser.ResetToken.Equals(vm.Token);
                        if (userTokenMatches)
                        {
                            // Email settings
                            var emailConfigSection = _configuration.GetSection("EmailConfigModel");
                            var emailConfig = emailConfigSection.Get<EmailConfigModel>();

                            if (emailConfig == null)
                            {
                                throw new Exception("Email settings missing");
                            }

                            appUser.ResetToken = null;
                            appUser.Enabled = true;
                            appUser.EmailConfirmed = true;

                            var passwordHasher = new PasswordHasher<ApplicationUser>();
                            var passwordHashed = passwordHasher.HashPassword(appUser, vm.Password);
                            appUser.PasswordHash = passwordHashed;

                            var updateResult = await _userManager.UpdateAsync(appUser);
                            if (updateResult.Succeeded)
                            {
                                vm.Success = true;

                                // Update EmailVerified Claim value
                                var emailVerifiedClaim = (await _userManager.GetClaimsAsync(appUser)).FirstOrDefault(x => x.Type == JwtClaimTypes.EmailVerified);
                                if (emailVerifiedClaim == null)
                                {
                                    await _userManager.AddClaimAsync(appUser, new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean));
                                }
                                else
                                {
                                    await _userManager.ReplaceClaimAsync(appUser, emailVerifiedClaim, new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean));
                                }

                                // Send confirmation email
                                var emailConfigModel = new EmailConfigModel
                                {
                                    SiteName = emailConfig.SiteName,
                                    SiteUrl = emailConfig.SiteUrl,
                                    SenderEmailAddress = emailConfig.SenderEmailAddress,
                                    SupportRcptEmailAddress = emailConfig.SupportRcptEmailAddress,
                                    DebugMode = emailConfig.DebugMode
                                };
                                
                                var Recipients = new string[] { appUser.Email };
                                var emailParams = new EmailParam[] {
                                    new EmailParam("[RECIPIENT_FIRSTNAME]", appUser.FirstName),
                                    new EmailParam("[FULL_NAME]", $"{appUser.FirstName} {appUser.Surname}"),
                                    new EmailParam("[EMAIL]", appUser.Email),
                                    new EmailParam("[LOGIN_LINK]", $"{emailConfigModel.SiteUrl}")
                                };

                                var emailResult = EmailService.SendEmail(emailConfigModel,
                                                    Recipients,
                                                    new string[] { "" },
                                                    EnumEmailType.InvigilatorAccountConfirmation.ToString(),
                                                    EnumHelperService.GetDescription(EnumEmailType.InvigilatorAccountConfirmation),
                                                    null,
                                                    emailParams);

                                if (!emailResult)
                                {
                                    throw new Exception("An error occurred sending the verification email");
                                }

                                // Display confirmation
                                return View("VerifyInvigilatorConfirmed", vm);
                            }                            
                        }
                        else
                        {
                            vm.Message = "Invalid or expired activation token";
                        }
                    }
                    else
                    {
                        vm.Message = "An unexpected error has occurred";
                    }
                }
            }

            return View(vm);
        }

    
       
        [AllowAnonymous]
        [HttpGet("[controller]/[action]/{token}/{userId}/{service?}")]
        public async Task<IActionResult> VerifyAdmin(string token, string userId, string service)
        {
            var vm = new VerifyAdminViewModel() { Success = false, ReturnUrl = service ?? "" };

            var appUser = await _userManager.FindByIdAsync(userId);
            if (!string.IsNullOrEmpty(appUser?.ResetToken))
            {
                var userTokenMatches = appUser.ResetToken != null && appUser.ResetToken.Equals(token);
                if (userTokenMatches)
                {
                    vm.Success = true;
                }
                else
                {
                    vm.Message = "Invalid or expired activation token";
                }
            }
            else
            {
                vm.Message = "An unexpected error has occurred";
            }

            return View(vm);
        }

        [AllowAnonymous]
        [HttpPost("[controller]/[action]/{token}/{userId}/{service?}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> VerifyAdmin(string token, string userId, string service, VerifyAdminViewModel vm)
        {
            if (ModelState.IsValid)
            {
                // Check passwords match
                if (!vm.Password.Equals(vm.ConfirmPassword))
                {
                    ModelState.AddModelError("ConfirmPassword", "Please ensure both passwords match");
                }

                // Check password complexity
                if (!string.IsNullOrEmpty(vm.Password) && !_passwordValidatorService.IsValid(vm.Password))
                {
                    ModelState.AddModelError("Password", "Password not complex enough. Please ensure at least 8 chars in length and contains 2 or more upper-case letters, numbers or special characters");
                }

                if (ModelState.IsValid)
                {
                    var appUser = await _userManager.FindByIdAsync(vm.UserId);
                    if (!string.IsNullOrEmpty(appUser?.ResetToken))
                    {
                        var userTokenMatches = appUser.ResetToken != null && appUser.ResetToken.Equals(vm.Token);
                        if (userTokenMatches)
                        {
                            appUser.ResetToken = null;
                            appUser.Enabled = true;
                            appUser.EmailConfirmed = true;

                            var passwordHasher = new PasswordHasher<ApplicationUser>();
                            var passwordHashed = passwordHasher.HashPassword(appUser, vm.Password);
                            appUser.PasswordHash = passwordHashed;

                            var updateResult = await _userManager.UpdateAsync(appUser);
                            if (updateResult.Succeeded)
                            {
                                vm.Success = true;

                                // Update EmailVerified Claim value
                                var emailVerifiedClaim = (await _userManager.GetClaimsAsync(appUser)).FirstOrDefault(x => x.Type == JwtClaimTypes.EmailVerified);
                                if (emailVerifiedClaim == null)
                                {
                                    await _userManager.AddClaimAsync(appUser, new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean));
                                }
                                else
                                {
                                    await _userManager.ReplaceClaimAsync(appUser, emailVerifiedClaim, new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean));
                                }

                                // Display confirmation
                                return View("VerifyAdminConfirmed", vm);
                            }
                        }
                        else
                        {
                            vm.Message = "Invalid or expired activation token";
                        }
                    }
                    else
                    {
                        vm.Message = "An unexpected error has occurred";
                    }
                }
            }

            return View(vm);
        }

        [AllowAnonymous]
        [HttpGet("[controller]/[action]/{token}/{userId}/{service?}")]
        public async Task<IActionResult> VerifyOfficer(string token, string userId, string service)
        {
            var vm = new VerifyAdminViewModel() { Success = false, ReturnUrl = service ?? "" };

            var appUser = await _userManager.FindByIdAsync(userId);
            if (!string.IsNullOrEmpty(appUser?.ResetToken))
            {
                var userTokenMatches = appUser.ResetToken != null && appUser.ResetToken.Equals(token);
                if (userTokenMatches)
                {
                    vm.Success = true;
                }
                else
                {
                    vm.Message = "Invalid or expired activation token";
                }
            }
            else
            {
                vm.Message = "An unexpected error has occurred";
            }

            return View("VerifyAdmin", vm);
        }

        [AllowAnonymous]
        [HttpPost("[controller]/[action]/{token}/{userId}/{service?}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> VerifyOfficer(string token, string userId, string service, VerifyAdminViewModel vm)
        {
            if (ModelState.IsValid)
            {
                // Check passwords match
                if (!vm.Password.Equals(vm.ConfirmPassword))
                {
                    ModelState.AddModelError("ConfirmPassword", "Please ensure both passwords match");
                }

                // Check password complexity
                if (!string.IsNullOrEmpty(vm.Password) && !_passwordValidatorService.IsValid(vm.Password))
                {
                    ModelState.AddModelError("Password", "Password not complex enough. Please ensure at least 8 chars in length and contains 2 or more upper-case letters, numbers or special characters");
                }

                if (ModelState.IsValid)
                {
                    var appUser = await _userManager.FindByIdAsync(vm.UserId);
                    if (!string.IsNullOrEmpty(appUser?.ResetToken))
                    {
                        var userTokenMatches = appUser.ResetToken != null && appUser.ResetToken.Equals(vm.Token);
                        if (userTokenMatches)
                        {
                            appUser.ResetToken = null;
                            appUser.Enabled = true;
                            appUser.EmailConfirmed = true;

                            var passwordHasher = new PasswordHasher<ApplicationUser>();
                            var passwordHashed = passwordHasher.HashPassword(appUser, vm.Password);
                            appUser.PasswordHash = passwordHashed;

                            var updateResult = await _userManager.UpdateAsync(appUser);
                            if (updateResult.Succeeded)
                            {
                                vm.Success = true;

                                // Update EmailVerified Claim value
                                var emailVerifiedClaim = (await _userManager.GetClaimsAsync(appUser)).FirstOrDefault(x => x.Type == JwtClaimTypes.EmailVerified);
                                if (emailVerifiedClaim == null)
                                {
                                    await _userManager.AddClaimAsync(appUser, new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean));
                                }
                                else
                                {
                                    await _userManager.ReplaceClaimAsync(appUser, emailVerifiedClaim, new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean));
                                }

                                // Display confirmation
                                return View("VerifyAdminConfirmed", vm);
                            }
                        }
                        else
                        {
                            vm.Message = "Invalid or expired activation token";
                        }
                    }
                    else
                    {
                        vm.Message = "An unexpected error has occurred";
                    }
                }
            }

            return View("VerifyAdmin", vm);
        }
    }
}