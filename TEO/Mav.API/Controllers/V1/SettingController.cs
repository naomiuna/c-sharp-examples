using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace Mav.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/{version:apiVersion}/[controller]")]
    [ApiController]
    public class SettingController : ApiControllerBase
    {
        private readonly ISettingsService SettingsService;

        public SettingController(
            IConfiguration configuration,
            ISettingsService settingsService
        ) : base(configuration)
        {
            SettingsService = settingsService;
        }

        // GET api/1.0/Setting/GetSettingById/{id}
        [HttpGet("GetSettingById/{id}", Name = "GetSettingByIdRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetSettingById(int id)
        {
            return await TryActionAsync(async () => await SettingsService.GetSettingById<SettingViewModel>(id));
        }

        // GET api/1.0/Setting/GetSettingByName/{id}
        [HttpGet("GetSettingByName/{id}", Name = "GetSettingByNameRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetSettingByName(string id)
        {
            return await TryActionAsync(async () => await SettingsService.GetSettingByName<SettingViewModel>(id));
        }

        // GET api/1.0/Setting/GetSettings
        [HttpGet("GetSettings", Name = "GetSettingsRoute")]
        [Authorize]
        public async Task<IActionResult> GetSettings(string id)
        {
            return await TryActionAsync(async () => await SettingsService.GetSettings<SettingViewModel>());
        }

        //PUT api/1.0/Setting/UpdateSetting
        [HttpPut("UpdateSetting", Name = "UpdateSettingRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateSetting(SettingViewModel m)
        {
            return await TryActionAsync(async () => await SettingsService.UpdateSetting<int>(m));
        }
    }
}