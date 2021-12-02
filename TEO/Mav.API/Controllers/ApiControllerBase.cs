using Mav.Services.Identity;
using Mav.Services.Identity.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Mav.API.Controllers
{
    public class ApiControllerBase : ControllerBase
    {
        protected readonly IConfiguration Configuration;

        protected ConnectPrincipal CurrentUser { get; set; }

        public ApiControllerBase(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        
        protected async Task<ConnectPrincipal> GetCurrentUserAsync()
        {
            if (CurrentUser != null && CurrentUser.Claims != null && CurrentUser.Claims.Any())
            {
                return CurrentUser;
            }

            var authSettingsSection = Configuration.GetSection("AuthAppSettings");
            var authSettings = authSettingsSection.Get<AuthAppSettings>();
            var idpHost = $"{authSettings.Authority.Host.TrimEnd('/')}/connect/userinfo";
            CurrentUser = await HttpContext.GetConnectPrincipalAsync(idpHost);
            return CurrentUser;
        }

        protected IActionResult TryAction(Action action)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    // Logger.Warn(ModelState.Values.GetModelStateErrorAsString());
                    return BadRequest(ModelState);
                }

                action();
                return Ok();
            }
            catch (Exception ex)
            {
                var res = HandleException(ex);
                if (res == null)
                {
                    throw;
                }

                return res;
            }
        }

        /// <summary>
        /// Executes the supplied action in a safe context, returning a status result
        /// </summary>
        /// <param name="action">The ction to perform</param>
        /// <returns>The action result</returns>
        protected IActionResult TryAction<T>(Func<T> action)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    // Logger.Warn(ModelState.Values.GetModelStateErrorAsString());
                    BadRequest(ModelState);
                }

                var result = action();
                return Ok(result);
            }
            catch (Exception ex)
            {
                var res = HandleException(ex);
                if (res == null)
                {
                    throw;
                }

                return res;
            }
        }

        /// <summary>
        /// Executes the supplied action asynchronously in a safe context, returning a status result
        /// </summary>
        /// <param name="action">The ction to perform</param>
        /// <returns>The action result</returns>
        protected async Task<IActionResult> TryActionAsync<T>(Func<Task<T>> action)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    // Logger.Warn(ModelState.Values.GetModelStateErrorAsString());
                    return BadRequest(ModelState);
                }

                var result = await action();
                return Ok(result);
            }
            catch (Exception ex)
            {
                var res = HandleException(ex);
                if (res == null)
                {
                    throw;
                }

                return res;
            }
        }

        /// <summary>
        /// Executes the supplied action asynchronously in a safe context, returning a status result
        /// </summary>
        /// <param name="action">The ction to perform</param>
        /// <returns>The action result</returns>
        protected async Task<IActionResult> TryActionAsync(Func<Task<IActionResult>> action)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    // Logger.Warn(ModelState.Values.GetModelStateErrorAsString());
                    return BadRequest(ModelState);
                }

                return await action();
            }
            catch (Exception ex)
            {
                var res = HandleException(ex);
                if (res == null)
                {
                    throw;
                }

                return res;
            }
        }

        private IActionResult HandleException(Exception ex1)
        {
            // Logger.Error(ex1.InnerException?.Message ?? ex1.Message);

            if (ex1 is NotImplementedException)
            {
                return StatusCode((int)HttpStatusCode.NotImplemented);
            }

            return null;
        }
    }
}
