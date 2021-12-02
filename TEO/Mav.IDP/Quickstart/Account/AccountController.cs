// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

using IdentityModel;
using IdentityServer4.Events;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using Mav.Services.Identity.Models;
using Microsoft.Extensions.Configuration;
using Mav.Common.Models;
using Mav.Common.Services;
using Mav.IDP;
using Mav.Common;

namespace IdentityServer4.Quickstart.UI
{
    /// <summary>
    /// This sample controller implements a typical login/logout/provision workflow for local and external accounts.
    /// The login service encapsulates the interactions with the user data store. This data store is in-memory only and cannot be used for production!
    /// The interaction service provides a way for the UI to communicate with identityserver for validation and context retrieval
    /// </summary>
    [SecurityHeaders]
    [AllowAnonymous]
    public class AccountController : Controller
    {
        //private readonly TestUserStore _users;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        private readonly IIdentityServerInteractionService _interaction;
        private readonly IClientStore _clientStore;
        private readonly IAuthenticationSchemeProvider _schemeProvider;
        private readonly IEventService _events;
        private readonly IConfiguration _configuration;
        private readonly IPasswordValidatorService _passwordValidatorService;
        private readonly IBasicHttpClient _basicHttpClient;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IIdentityServerInteractionService interaction,
            IClientStore clientStore,
            IAuthenticationSchemeProvider schemeProvider,
            IEventService events,
            IConfiguration configuration,
            IPasswordValidatorService passwordValidatorService,
            IBasicHttpClient basicHttpClient
        ) {
            _userManager = userManager;
            _signInManager = signInManager;

            _interaction = interaction;
            _clientStore = clientStore;
            _schemeProvider = schemeProvider;
            _events = events;
            _configuration = configuration;
            _passwordValidatorService = passwordValidatorService;
            _basicHttpClient = basicHttpClient;
        }

        /// <summary>
        /// Entry point into the login workflow
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Login(string returnUrl)
        {
            // build a model so we know what to show on the login page
            var vm = await BuildLoginViewModelAsync(returnUrl);

            if (vm.IsExternalLoginOnly)
            {
                // we only have one option for logging in and it's an external provider
                return await ExternalLogin(vm.ExternalLoginScheme, returnUrl);
            }

            return View(vm);
        }

        /// <summary>
        /// Handle postback from username/password login
        /// </summary>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginInputModel model, string button)
        {
            // check if we are in the context of an authorization request
            var context = await _interaction.GetAuthorizationContextAsync(model.ReturnUrl);

            // the user clicked the "cancel" button
            if (button != "login")
            {
                if (context != null)
                {
                    // if the user cancels, send a result back into IdentityServer as if they 
                    // denied the consent (even if this client does not require consent).
                    // this will send back an access denied OIDC error response to the client.
                    await _interaction.GrantConsentAsync(context, ConsentResponse.Denied);

                    // we can trust model.ReturnUrl since GetAuthorizationContextAsync returned non-null
                    if (await _clientStore.IsPkceClientAsync(context.ClientId))
                    {
                        // if the client is PKCE then we assume it's native, so this change in how to
                        // return the response is for better UX for the end user.
                        return View("Redirect", new RedirectViewModel { RedirectUrl = model.ReturnUrl });
                    }

                    return Redirect(model.ReturnUrl);
                }
                else
                {
                    // since we don't have a valid context, then we just go back to the home page
                    return Redirect("~/Grants");
                }
            }

            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, model.RememberLogin, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    // API settings
                    var apiSection = _configuration.GetSection("MavApiSettings");
                    var apiSettings = apiSection.Get<Mav.IDP.MavApiSettings>();
                    var apiUrl = apiSettings.BaseUrl;

                    if (apiUrl == null)
                    {
                        throw new Exception("API base url missing");
                    }

                    var user = await _userManager.FindByNameAsync(model.Username);
                    if (user.Enabled != true || user.Deleted == true)
                    {
                        await _events.RaiseAsync(new UserLoginFailureEvent(model.Username, "Account is disabled"));
                        ModelState.AddModelError("", AccountOptions.AccountDisabledErrorMessage);
                    }
                    if (user.EmailConfirmed != true)
                    {
                        await _events.RaiseAsync(new UserLoginFailureEvent(model.Username, "Account has not been activated"));
                        ModelState.AddModelError("", AccountOptions.AccountNotActivatedErrorMessage);
                    }

                    if (await _userManager.IsInRoleAsync(user, EnumRoleType.ExamOfficer.ToString()) 
                        || await _userManager.IsInRoleAsync(user, EnumRoleType.ExamInvigilator.ToString()))
                    {
                        //Must check Centre is active and non deleted
                        var httpClient = await _basicHttpClient.GetClient(false);
                        httpClient.BaseAddress = new Uri(apiUrl);

                        var isCentreActiveResponse = await httpClient.GetAsync(Mav.Common.SystemConstants.IsCentreActiveByUserId.Replace("{id}", user.Id))
                            .ConfigureAwait(false);

                        if (!isCentreActiveResponse.IsSuccessStatusCode)
                        {
                            await _events.RaiseAsync(new UserLoginFailureEvent(user.UserName, "Centre account is disabled"));
                            ModelState.AddModelError("", AccountOptions.AccountDisabledErrorMessage);
                        }
                    }

                    if (ModelState.IsValid)
                    {
                        await _events.RaiseAsync(new UserLoginSuccessEvent(user.UserName, user.Id, user.UserName));

                        if (!string.IsNullOrEmpty(model.ReturnUrl) && !model.ReturnUrl.Contains("http"))
                        {
                            var clientSettingsSection = _configuration.GetSection("ClientsAppSettings");
                            var clientSettings = clientSettingsSection.Get<ClientsAppSettings>();
                            switch (model.ReturnUrl)
                            {
                                case "js_oidc":
                                    model.ReturnUrl = clientSettings.Clients.JsOidc.PostLogoutRedirectUris;
                                    return Redirect(model.ReturnUrl);
                                default:
                                    model.ReturnUrl = clientSettings.Clients.ExamOffice.PostLogoutRedirectUris;
                                    return Redirect(model.ReturnUrl);
                            }
                        }

                        if (string.IsNullOrEmpty(model.ReturnUrl))
                        {
                            var clientSettingsSection = _configuration.GetSection("ClientsAppSettings");
                            var clientSettings = clientSettingsSection.Get<ClientsAppSettings>();
                            model.ReturnUrl = clientSettings.Clients.ExamOffice.PostLogoutRedirectUris;
                            return Redirect(model.ReturnUrl);
                        }

                        if (Url.IsLocalUrl(model.ReturnUrl))
                        {
                            return Redirect(model.ReturnUrl);
                        }

                        // make sure the returnUrl is still valid, and if so redirect back to authorize endpoint or a local page
                        // the IsLocalUrl check is only necessary if you want to support additional local pages, otherwise IsValidReturnUrl is more strict
                        if (_interaction.IsValidReturnUrl(model.ReturnUrl) || Url.IsLocalUrl(model.ReturnUrl))
                        {
                            return Redirect(model.ReturnUrl);
                        }

                        return Redirect("~/Grants");
                    }
                }
                else
                {
                    await _events.RaiseAsync(new UserLoginFailureEvent(model.Username, "invalid credentials"));
                    ModelState.AddModelError("", AccountOptions.InvalidCredentialsErrorMessage);
                }                
            }

            // something went wrong, show form with error
            var vm = await BuildLoginViewModelAsync(model);
            return View(vm);
        }

        /// <summary>
        /// initiate roundtrip to external authentication provider
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> ExternalLogin(string provider, string returnUrl)
        {
            if (AccountOptions.WindowsAuthenticationSchemeName == provider)
            {
                // windows authentication needs special handling
                return await ProcessWindowsLoginAsync(returnUrl);
            }
            else
            {
                // start challenge and roundtrip the return URL and 
                var props = new AuthenticationProperties()
                {
                    RedirectUri = Url.Action("ExternalLoginCallback"),
                    Items =
                    {
                        { "returnUrl", returnUrl },
                        { "scheme", provider },
                    }
                };
                return Challenge(props, provider);
            }
        }

        /// <summary>
        /// Post processing of external authentication
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> ExternalLoginCallback()
        {
            // read external identity from the temporary cookie
            var result = await HttpContext.AuthenticateAsync(IdentityConstants.ExternalScheme);
            if (result?.Succeeded != true)
            {
                throw new Exception("External authentication error");
            }

            // lookup our user and external provider info
            var (user, provider, providerUserId, claims) = await FindUserFromExternalProviderAsync(result);
            if (user == null)
            {
                // this might be where you might initiate a custom workflow for user registration
                // in this sample we don't show how that would be done, as our sample implementation
                // simply auto-provisions new external user
                user = await AutoProvisionUserAsync(provider, providerUserId, claims);
            }

            // this allows us to collect any additonal claims or properties
            // for the specific prtotocols used and store them in the local auth cookie.
            // this is typically used to store data needed for signout from those protocols.
            var additionalLocalClaims = new List<Claim>();
            var localSignInProps = new AuthenticationProperties();
            ProcessLoginCallbackForOidc(result, additionalLocalClaims, localSignInProps);
            ProcessLoginCallbackForWsFed(result, additionalLocalClaims, localSignInProps);
            ProcessLoginCallbackForSaml2p(result, additionalLocalClaims, localSignInProps);

            // issue authentication cookie for user
            // we must issue the cookie maually, and can't use the SignInManager because
            // it doesn't expose an API to issue additional claims from the login workflow
            var principal = await _signInManager.CreateUserPrincipalAsync(user);
            additionalLocalClaims.AddRange(principal.Claims);
            var name = principal.FindFirst(JwtClaimTypes.Name)?.Value ?? user.Id;
            await _events.RaiseAsync(new UserLoginSuccessEvent(provider, providerUserId, user.Id, name));
            await HttpContext.SignInAsync(user.Id, name, provider, localSignInProps, additionalLocalClaims.ToArray());

            // delete temporary cookie used during external authentication
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

            // validate return URL and redirect back to authorization endpoint or a local page
            var returnUrl = result.Properties.Items["returnUrl"];
            if (_interaction.IsValidReturnUrl(returnUrl) || Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }

            return Redirect("~/Grants");
        }

        /// <summary>
        /// Show logout page
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Logout(string logoutId)
        {
            // build a model so the logout page knows what to display
            var vm = await BuildLogoutViewModelAsync(logoutId);

            if (vm.ShowLogoutPrompt == false)
            {
                // if the request for logout was properly authenticated from IdentityServer, then
                // we don't need to show the prompt and can just log the user out directly.
                return await Logout(vm);
            }

            return View(vm);
        }

        /// <summary>
        /// Handle logout page postback
        /// </summary>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout(LogoutInputModel model)
        {
            // build a model so the logged out page knows what to display
            var vm = await BuildLoggedOutViewModelAsync(model.LogoutId);

            if (User?.Identity.IsAuthenticated == true)
            {
                // delete local authentication cookie
                await _signInManager.SignOutAsync();
                await HttpContext.SignOutAsync(IdentityServerConstants.DefaultCookieAuthenticationScheme);
                await HttpContext.SignOutAsync();


                // raise the logout event
                await _events.RaiseAsync(new UserLogoutSuccessEvent(User.GetSubjectId(), User.GetDisplayName()));
            }

            // check if we need to trigger sign-out at an upstream identity provider
            if (vm.TriggerExternalSignout)
            {
                // build a return URL so the upstream provider will redirect back
                // to us after the user has logged out. this allows us to then
                // complete our single sign-out processing.
                string url = Url.Action("Logout", new { logoutId = vm.LogoutId });

                // this triggers a redirect to the external provider for sign-out
                return SignOut(new AuthenticationProperties { RedirectUri = url }, vm.ExternalAuthenticationScheme);
            }

            //return View("LoggedOut", vm);
            var redirectUrl = _configuration.GetValue<string>("ClientsAppSettings:Clients:ExamOfficePortal:PostLogoutRedirectUris");
            return Redirect(redirectUrl);
        }

        [HttpGet]
        public IActionResult RequestPasswordReset(string returnUrl)
        {
            var vm = new RequestPasswordResetViewModel
            {
                ReturnUrl = returnUrl
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RequestPasswordReset(RequestPasswordResetViewModel vm)
        {
            if (ModelState.IsValid)
            {
                // API settings
                var apiSection = _configuration.GetSection("MavApiSettings");
                var apiSettings = apiSection.Get<Mav.IDP.MavApiSettings>();
                var apiUrl = apiSettings.BaseUrl;

                if (apiUrl == null)
                {
                    throw new Exception("API base url missing");
                }

                // Check if username exists
                var userCheck = await _userManager.FindByNameAsync(vm.Email);
                if (userCheck == null)
                {
                    ModelState.AddModelError("Email", "An account with the specified email address could not be found");
                }
                else if (userCheck.Enabled != true || userCheck.Deleted == true)
                {
                    ModelState.AddModelError("Email", "This account is currently marked as disabled");
                }
                else if (userCheck.EmailConfirmed != true)
                {
                    ModelState.AddModelError("Email", "This account has not yet been verified");
                }
                else
                {
                    if (await _userManager.IsInRoleAsync(userCheck, EnumRoleType.ExamOfficer.ToString())
                        || await _userManager.IsInRoleAsync(userCheck, EnumRoleType.ExamInvigilator.ToString()))
                    {
                        //Must check Centre is active and non deleted
                        var httpClient = await _basicHttpClient.GetClient(false);
                        httpClient.BaseAddress = new Uri(apiUrl);

                        var isCentreActiveResponse = httpClient.GetAsync(Mav.Common.SystemConstants.IsCentreActiveByUserId.Replace("{id}", userCheck.Id)).Result;

                        if (!isCentreActiveResponse.IsSuccessStatusCode)
                        {
                            await _events.RaiseAsync(new UserLoginFailureEvent(userCheck.UserName, "Centre account is disabled"));
                            ModelState.AddModelError("", AccountOptions.AccountDisabledErrorMessage);
                        }
                    }
                }

                // All is OK so proceed with the email
                if (ModelState.IsValid)
                {
                    // Email settings
                    var emailConfigSection = _configuration.GetSection("EmailConfigModel");
                    var emailConfig = emailConfigSection.Get<EmailConfigModel>();

                    if (emailConfig == null)
                    {
                        throw new Exception("Email settings missing");
                    }

                    // Create verification token
                    var verifyToken = Guid.NewGuid().ToString();

                    // Double encode the tocken as angular cannot handle '%2f's
                    // verifyToken = System.Web.HttpUtility.UrlEncode(System.Web.HttpUtility.UrlEncode(verifyToken));        

                    // Save the token against the user
                    userCheck.ResetToken = verifyToken;
                    await _userManager.UpdateAsync(userCheck);

                    // Email for verification
                    var emailConfigModel = new EmailConfigModel
                    {
                        SiteName = emailConfig.SiteName,
                        SiteUrl = emailConfig.AuthorityUrl,
                        SenderEmailAddress = emailConfig.SenderEmailAddress,
                        SupportRcptEmailAddress = emailConfig.SupportRcptEmailAddress,
                        DebugMode = emailConfig.DebugMode
                    };

                    var verifyLink = string.Format(Mav.Common.SystemConstants.VerifyRasswordRequestAccount, verifyToken, userCheck.Id, vm.ReturnUrl);
                    var Recipients = new string[] { userCheck.Email };
                    var emailParams = new EmailParam[] {
                            new EmailParam("[RECIPIENT_FIRSTNAME]", userCheck.FirstName),
                            new EmailParam("[FULL_NAME]", $"{userCheck.FirstName} {userCheck.Surname}"),
                            new EmailParam("[EMAIL]", userCheck.Email),
                            new EmailParam("[VERIFY_LINK]", $"{emailConfigModel.SiteUrl}{verifyLink}"),
                            new EmailParam("[USERID]", userCheck.Id)
                        };

                    var emailResult = EmailService.SendEmail(emailConfigModel,
                                        Recipients,
                                        new string[] { "" },
                                        EnumEmailType.RequestPasswordReset.ToString(),
                                        EnumHelperService.GetDescription(EnumEmailType.RequestPasswordReset),
                                        null,
                                        emailParams);

                    if (!emailResult)
                    {
                        throw new Exception("An error occurred sending the verification email");
                    }

                    // Display confirmation
                    return View("RequestPasswordResetConfirmed", vm);
                }                
            }

            return View(vm);
        }

        [HttpGet("[controller]/[action]/{token}/{userId}/{service?}")]
        public async Task<IActionResult> ResetPassword(string token, string userId, string service)
        {
            var vm = new ResetPasswordViewModel
            {
                Success = false,
                ReturnUrl = service
            };

            var appUser = await _userManager.FindByIdAsync(userId);
            if (appUser != null)
            {
                var userTokenMatches = appUser.ResetToken != null && appUser.ResetToken.Equals(token);
                if (userTokenMatches)
                {
                    // Token can only be used once so must clear it immediately
                    appUser.ResetToken = null;

                    var updateResult = await _userManager.UpdateAsync(appUser);
                    if (updateResult.Succeeded)
                    {
                        vm.Success = true;
                        vm.UserId = appUser.Id;
                    }
                }                
            }
            
            if (!vm.Success)
            {
                vm.Message = "Invalid or expired verification token";
                ModelState.AddModelError("Password", "Invalid or expired verification token");
            }

            return View(vm);
        }

        [HttpPost("[controller]/[action]/{token}/{userId}/{returnUrl?}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(string token, string userId, string returnUrl, ResetPasswordViewModel vm)
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
                    // Check if user exists and is active
                    var userCheck = await _userManager.FindByIdAsync(vm.UserId);
                    if (userCheck == null)
                    {
                        ModelState.AddModelError("Password", "Missing or invalid user identifier");
                    }
                    else if (userCheck.Enabled != true || userCheck.Deleted == true)
                    {
                        ModelState.AddModelError("Password", "This account is currently marked as disabled");
                    }
                    else if (userCheck.EmailConfirmed != true)
                    {
                        ModelState.AddModelError("Password", "This account has not yet been verified");
                    }

                    if (ModelState.IsValid)
                    {
                        var passwordHasher = new PasswordHasher<ApplicationUser>();
                        var passwordHashed = passwordHasher.HashPassword(userCheck, vm.Password);
                        userCheck.PasswordHash = passwordHashed;

                        var updateResult = await _userManager.UpdateAsync(userCheck);
                        if (!updateResult.Succeeded)
                        {
                            throw new Exception("An error occurred saving the new password hash");
                        }

                        // var loginResult = await _signInManager.PasswordSignInAsync(userCheck, vm.Password, false, false);
                        // if (!loginResult.Succeeded)
                        // {
                        //     throw new Exception("An error occurred while attempting to sign you in");
                        // }

                        vm.Success = true;
                        return View("ResetPasswordConfirmed", vm);
                    }
                }
            }

            return View(vm);
        }

        [HttpGet]
        public IActionResult ResendActivation()
        {
            var vm = new RequestPasswordResetViewModel
            {
                ReturnUrl = ""
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResendActivation(RequestPasswordResetViewModel vm)
        {
            if (ModelState.IsValid)
            {
                // Check if username exists
                var userCheck = await _userManager.FindByNameAsync(vm.Email);

                bool isExamOfficer = false;
                bool isExamInvigilator = false;

                if (userCheck == null)
                {
                    ModelState.AddModelError("Email", "This account was not found");
                }
                else
                {
                    if (userCheck.Deleted == true)
                    {
                        ModelState.AddModelError("Email", "This account is currently marked as disabled");
                    }
                    else if (userCheck.EmailConfirmed == true)
                    {
                        ModelState.AddModelError("Email", "This account is currently marked as verified");
                    }

                    isExamOfficer = await _userManager.IsInRoleAsync(userCheck, EnumRoleType.ExamOfficer.ToString());
                    isExamInvigilator = await _userManager.IsInRoleAsync(userCheck, EnumRoleType.ExamInvigilator.ToString());

                    if (!isExamOfficer && !isExamInvigilator)
                    {
                        ModelState.AddModelError("Email", "Reseding activation email for this account type is unavailable");
                    }
                }

                // All is OK so proceed with the email
                if (ModelState.IsValid)
                {
                    // Email settings
                    var emailConfigSection = _configuration.GetSection("EmailConfigModel");
                    var emailConfig = emailConfigSection.Get<EmailConfigModel>();

                    if (emailConfig == null)
                    {
                        throw new Exception("Email settings missing");
                    }

                    // Create verification token
                    var verifyToken = Guid.NewGuid().ToString();
                    
                    // Save the token against the user
                    userCheck.ResetToken = verifyToken;
                    await _userManager.UpdateAsync(userCheck);

                    // Email for verification
                    var emailConfigModel = new EmailConfigModel
                    {
                        SiteName = emailConfig.SiteName,
                        SiteUrl = emailConfig.AuthorityUrl,
                        SenderEmailAddress = emailConfig.SenderEmailAddress,
                        SupportRcptEmailAddress = emailConfig.SupportRcptEmailAddress,
                        DebugMode = emailConfig.DebugMode
                    };

                    var verifyLink = string.Format(
                        isExamInvigilator ? SystemConstants.VerifyInvigilatorAccount 
                            : SystemConstants.VerifyOfficerAccount, 
                        verifyToken, 
                        userCheck.Id, 
                        vm.ReturnUrl);

                    var Recipients = new string[] { userCheck.Email };
                    var emailParams = new EmailParam[] {
                            new EmailParam("[RECIPIENT_FIRSTNAME]", userCheck.FirstName),
                            new EmailParam("[FULL_NAME]", $"{userCheck.FirstName} {userCheck.Surname}"),
                            new EmailParam("[EMAIL]", userCheck.Email),
                            new EmailParam("[VERIFY_LINK]", $"{emailConfigModel.SiteUrl}{verifyLink}"),
                            new EmailParam("[USERID]", userCheck.Id)
                        };

                    var emailResult = EmailService.SendEmail(emailConfigModel,
                                        Recipients,
                                        new string[] { "" },
                                        isExamInvigilator ? EnumEmailType.NewInvigilatorAccount.ToString() 
                                            : EnumEmailType.NewOfficerAccount.ToString(),
                                        isExamInvigilator ? EnumHelperService.GetDescription(EnumEmailType.NewInvigilatorAccount) 
                                            : EnumHelperService.GetDescription(EnumEmailType.NewOfficerAccount),
                                        null,
                                        emailParams);

                    if (!emailResult)
                    {
                        throw new Exception("An error occurred sending the verification email");
                    }
                }
            }

            return View("ResendActivationConfirmed", vm);
        }

        /*****************************************/
        /* helper APIs for the AccountController */
        /*****************************************/
        private async Task<LoginViewModel> BuildLoginViewModelAsync(string returnUrl)
        {
            var context = await _interaction.GetAuthorizationContextAsync(returnUrl);
            if (context?.IdP != null)
            {
                // this is meant to short circuit the UI and only trigger the one external IdP
                return new LoginViewModel
                {
                    EnableLocalLogin = false,
                    ReturnUrl = returnUrl,
                    Username = context?.LoginHint,
                    ExternalProviders = new ExternalProvider[] { new ExternalProvider { AuthenticationScheme = context.IdP } }
                };
            }

            var schemes = await _schemeProvider.GetAllSchemesAsync();

            var providers = schemes
                .Where(x => x.DisplayName != null ||
                            (x.Name.Equals(AccountOptions.WindowsAuthenticationSchemeName, StringComparison.OrdinalIgnoreCase))
                )
                .Select(x => new ExternalProvider
                {
                    DisplayName = x.DisplayName,
                    AuthenticationScheme = x.Name
                }).ToList();

            var allowLocal = true;
            if (context?.ClientId != null)
            {
                var client = await _clientStore.FindEnabledClientByIdAsync(context.ClientId);
                if (client != null)
                {
                    allowLocal = client.EnableLocalLogin;

                    if (client.IdentityProviderRestrictions != null && client.IdentityProviderRestrictions.Any())
                    {
                        providers = providers.Where(provider => client.IdentityProviderRestrictions.Contains(provider.AuthenticationScheme)).ToList();
                    }
                }
            }

            return new LoginViewModel
            {
                AllowRememberLogin = AccountOptions.AllowRememberLogin,
                EnableLocalLogin = allowLocal && AccountOptions.AllowLocalLogin,
                ReturnUrl = returnUrl,
                Username = context?.LoginHint,
                ExternalProviders = providers.ToArray()
            };
        }

        private async Task<LoginViewModel> BuildLoginViewModelAsync(LoginInputModel model)
        {
            var vm = await BuildLoginViewModelAsync(model.ReturnUrl);
            vm.Username = model.Username;
            vm.RememberLogin = model.RememberLogin;
            return vm;
        }

        private async Task<LogoutViewModel> BuildLogoutViewModelAsync(string logoutId)
        {
            var vm = new LogoutViewModel { LogoutId = logoutId, ShowLogoutPrompt = AccountOptions.ShowLogoutPrompt };

            if (User?.Identity.IsAuthenticated != true)
            {
                // if the user is not authenticated, then just show logged out page
                vm.ShowLogoutPrompt = false;
                return vm;
            }

            var context = await _interaction.GetLogoutContextAsync(logoutId);
            if (context?.ShowSignoutPrompt == false)
            {
                // it's safe to automatically sign-out
                vm.ShowLogoutPrompt = false;
                return vm;
            }

            // show the logout prompt. this prevents attacks where the user
            // is automatically signed out by another malicious web page.
            return vm;
        }

        private async Task<LoggedOutViewModel> BuildLoggedOutViewModelAsync(string logoutId)
        {
            // get context information (client name, post logout redirect URI and iframe for federated signout)
            var logout = await _interaction.GetLogoutContextAsync(logoutId);

            var vm = new LoggedOutViewModel
            {
                AutomaticRedirectAfterSignOut = AccountOptions.AutomaticRedirectAfterSignOut,
                PostLogoutRedirectUri = logout?.PostLogoutRedirectUri,
                ClientName = string.IsNullOrEmpty(logout?.ClientName) ? logout?.ClientId : logout?.ClientName,
                SignOutIframeUrl = logout?.SignOutIFrameUrl,
                LogoutId = logoutId
            };

            if (User?.Identity.IsAuthenticated == true)
            {
                var idp = User.FindFirst(JwtClaimTypes.IdentityProvider)?.Value;
                if (idp != null && idp != IdentityServer4.IdentityServerConstants.LocalIdentityProvider)
                {
                    var providerSupportsSignout = await HttpContext.GetSchemeSupportsSignOutAsync(idp);
                    if (providerSupportsSignout)
                    {
                        if (vm.LogoutId == null)
                        {
                            // if there's no current logout context, we need to create one
                            // this captures necessary info from the current logged in user
                            // before we signout and redirect away to the external IdP for signout
                            vm.LogoutId = await _interaction.CreateLogoutContextAsync();
                        }

                        vm.ExternalAuthenticationScheme = idp;
                    }
                }
            }

            return vm;
        }

        private async Task<IActionResult> ProcessWindowsLoginAsync(string returnUrl)
        {
            // see if windows auth has already been requested and succeeded
            var result = await HttpContext.AuthenticateAsync(AccountOptions.WindowsAuthenticationSchemeName);
            if (result?.Principal is WindowsPrincipal wp)
            {
                // we will issue the external cookie and then redirect the
                // user back to the external callback, in essence, tresting windows
                // auth the same as any other external authentication mechanism
                var props = new AuthenticationProperties()
                {
                    RedirectUri = Url.Action("ExternalLoginCallback"),
                    Items =
                    {
                        { "returnUrl", returnUrl },
                        { "scheme", AccountOptions.WindowsAuthenticationSchemeName },
                    }
                };

                var id = new ClaimsIdentity(AccountOptions.WindowsAuthenticationSchemeName);
                id.AddClaim(new Claim(JwtClaimTypes.Subject, wp.Identity.Name));
                id.AddClaim(new Claim(JwtClaimTypes.Name, wp.Identity.Name));

                // add the groups as claims -- be careful if the number of groups is too large
                if (AccountOptions.IncludeWindowsGroups)
                {
                    var wi = wp.Identity as WindowsIdentity;
                    var groups = wi.Groups.Translate(typeof(NTAccount));
                    var roles = groups.Select(x => new Claim(JwtClaimTypes.Role, x.Value));
                    id.AddClaims(roles);
                }

                await HttpContext.SignInAsync(
                    IdentityConstants.ExternalScheme,
                    new ClaimsPrincipal(id),
                    props);
                return Redirect(props.RedirectUri);
            }
            else
            {
                // trigger windows auth
                // since windows auth don't support the redirect uri,
                // this URL is re-triggered when we call challenge
                return Challenge(AccountOptions.WindowsAuthenticationSchemeName);
            }
        }

        private async Task<(ApplicationUser user, string provider, string providerUserId, IEnumerable<Claim> claims)>
            FindUserFromExternalProviderAsync(AuthenticateResult result)
        {
            var externalUser = result.Principal;

            // try to determine the unique id of the external user (issued by the provider)
            // the most common claim type for that are the sub claim and the NameIdentifier
            // depending on the external provider, some other claim type might be used
            var userIdClaim = externalUser.FindFirst(JwtClaimTypes.Subject) ??
                              externalUser.FindFirst(ClaimTypes.NameIdentifier) ??
                              throw new Exception("Unknown userid");

            // remove the user id claim so we don't include it as an extra claim if/when we provision the user
            var claims = externalUser.Claims.ToList();
            claims.Remove(userIdClaim);

            var provider = result.Properties.Items["scheme"];
            var providerUserId = userIdClaim.Value;

            // find external user
            var user = await _userManager.FindByLoginAsync(provider, providerUserId);

            return (user, provider, providerUserId, claims);
        }

        private async Task<ApplicationUser> AutoProvisionUserAsync(string provider, string providerUserId, IEnumerable<Claim> claims)
        {
            // create a list of claims that we want to transfer into our store
            var filtered = new List<Claim>();

            // user's display name
            var name = claims.FirstOrDefault(x => x.Type == JwtClaimTypes.Name)?.Value ??
                claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;
            if (name != null)
            {
                filtered.Add(new Claim(JwtClaimTypes.Name, name));
            }
            else
            {
                var first = claims.FirstOrDefault(x => x.Type == JwtClaimTypes.GivenName)?.Value ??
                    claims.FirstOrDefault(x => x.Type == ClaimTypes.GivenName)?.Value;
                var last = claims.FirstOrDefault(x => x.Type == JwtClaimTypes.FamilyName)?.Value ??
                    claims.FirstOrDefault(x => x.Type == ClaimTypes.Surname)?.Value;
                if (first != null && last != null)
                {
                    filtered.Add(new Claim(JwtClaimTypes.Name, first + " " + last));
                }
                else if (first != null)
                {
                    filtered.Add(new Claim(JwtClaimTypes.Name, first));
                }
                else if (last != null)
                {
                    filtered.Add(new Claim(JwtClaimTypes.Name, last));
                }
            }

            // email
            var email = claims.FirstOrDefault(x => x.Type == JwtClaimTypes.Email)?.Value ??
               claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            if (email != null)
            {
                filtered.Add(new Claim(JwtClaimTypes.Email, email));
            }

            var user = new ApplicationUser
            {
                UserName = Guid.NewGuid().ToString(),
            };
            var identityResult = await _userManager.CreateAsync(user);
            if (!identityResult.Succeeded) throw new Exception(identityResult.Errors.First().Description);

            if (filtered.Any())
            {
                identityResult = await _userManager.AddClaimsAsync(user, filtered);
                if (!identityResult.Succeeded) throw new Exception(identityResult.Errors.First().Description);
            }

            identityResult = await _userManager.AddLoginAsync(user, new UserLoginInfo(provider, providerUserId, provider));
            if (!identityResult.Succeeded) throw new Exception(identityResult.Errors.First().Description);

            return user;
        }

        private void ProcessLoginCallbackForOidc(AuthenticateResult externalResult, List<Claim> localClaims, AuthenticationProperties localSignInProps)
        {
            // if the external system sent a session id claim, copy it over
            // so we can use it for single sign-out
            var sid = externalResult.Principal.Claims.FirstOrDefault(x => x.Type == JwtClaimTypes.SessionId);
            if (sid != null)
            {
                localClaims.Add(new Claim(JwtClaimTypes.SessionId, sid.Value));
            }

            // if the external provider issued an id_token, we'll keep it for signout
            var id_token = externalResult.Properties.GetTokenValue("id_token");
            if (id_token != null)
            {
                localSignInProps.StoreTokens(new[] { new AuthenticationToken { Name = "id_token", Value = id_token } });
            }
        }

        private void ProcessLoginCallbackForWsFed(AuthenticateResult externalResult, List<Claim> localClaims, AuthenticationProperties localSignInProps)
        {
        }

        private void ProcessLoginCallbackForSaml2p(AuthenticateResult externalResult, List<Claim> localClaims, AuthenticationProperties localSignInProps)
        {
        }
    }
}