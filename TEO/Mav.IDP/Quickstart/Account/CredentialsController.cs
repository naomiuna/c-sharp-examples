using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using Mav.Services.Identity.Models;
using Mav.Common.Services;
using Microsoft.Extensions.Configuration;
using Mav.IDP;

namespace IdentityServer4.Quickstart.UI
{
    [SecurityHeaders]
    public class CredentialsController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IPasswordValidatorService _passwordValidatorService;
        private readonly IConfiguration _configuration;

        public CredentialsController(
            UserManager<ApplicationUser> userManager,
            IPasswordValidatorService passwordValidatorService,
            IConfiguration configuration
        ) {
            _userManager = userManager;
            _passwordValidatorService = passwordValidatorService;
            _configuration = configuration;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Update(string returnUrl)
        {
            var vm = new ChangePasswordViewModel() {
                Success = false,
                ReturnUrl = returnUrl
            };

            if (string.IsNullOrEmpty(vm.ReturnUrl))
            {
                var clientSettingsSection = _configuration.GetSection("ClientsAppSettings");
                var clientSettings = clientSettingsSection.Get<ClientsAppSettings>();
                vm.ReturnUrl = clientSettings.Clients.ExamOffice.PostLogoutRedirectUris;
            }

            return View(vm);
        }

        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(ChangePasswordViewModel vm)
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
                    ModelState.AddModelError("Password", "Password not complex enough. Please ensure at least 8 chars in length and contains 1 or more upper-case letters and 1 or more numbers");
                }

                if (ModelState.IsValid)
                {
                    var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type.Equals("sub")).Value;

                    // Check if user exists and is active
                    var userCheck = await _userManager.FindByIdAsync(userId);
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

                        vm.Success = true;
                        return View("UpdateConfirmed", vm);
                    }
                }
            }

            return View(vm);
        }
    }
}