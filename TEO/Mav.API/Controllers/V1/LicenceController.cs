using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mav.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/{version:apiVersion}/[controller]")]
    [ApiController]
    public class LicenceController : ApiControllerBase
    {
        private readonly ILicenceService LicenceService;

        public LicenceController(IConfiguration configuration, ILicenceService licenceService) : base(configuration)
        {
            LicenceService = licenceService;
        }

        // GET api/1.0/Licence/GetLicenceById/{id}
        [HttpGet("GetLicenceById/{id}", Name = "GetLicenceByIdRoute")]
        [Authorize]
        public async Task<IActionResult> GetLicenceById(int id)
        {
            return await TryActionAsync(async () => await LicenceService.GetLicenceById<LicenceViewModel>(id));
        }

        // Add and enable account
        // POST api/1.0/Licence/CreateLicence
        [HttpPost("CreateLicence", Name = "CreateLicenceRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateLicence(AddLicenceViewModel m)
        {
            return await TryActionAsync(async () => await LicenceService.AddLicence<int>(m, true));
        }

        // Add and don't enable account
        // POST api/1.0/Licence/CreateLicenceDisabled
        [HttpPost("CreateLicenceDisabled", Name = "CreateLicenceDisabledRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateLicenceDisabled(AddLicenceViewModel m)
        {
            return await TryActionAsync(async () => await LicenceService.AddLicence<int>(m, false));
        }

        // Save changes and enable account
        // PUT api/1.0/Licence/UpdateLicence
        [HttpPut("UpdateLicence", Name = "UpdateLicenceRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateLicence(UpdateLicenceViewModel m)
        {
            return await TryActionAsync(async () => await LicenceService.Update<int>(m, true));
        }

        // Save changes and don't enable account
        // PUT api/1.0/Licence/UpdateLicence
        [HttpPut("UpdateLicenceDisabled", Name = "UpdateLicenceDisabledRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateLicenceDisabled(UpdateLicenceViewModel m)
        {
            return await TryActionAsync(async () => await LicenceService.Update<int>(m, false));
        }

        // POST api/1.0/Organisation/DeleteOrganisation
        [HttpPost("DeleteLicence/{id}", Name = "DeleteLicenceRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteLicence([FromRoute] int id)
        {
            return await TryActionAsync(async () => await LicenceService.Delete<int>(id));
        }

        // Enable account
        // POST api/1.0/Organisation/EnableAccount{id}
        [HttpPost("EnableAccount/{orgId}", Name = "EnableAccountRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> EnableAccount([FromRoute] int orgId)
        {
            return await TryActionAsync(async () => await LicenceService.EnableAccount<int>(orgId));
        }

        // Disable account
        // POST api/1.0/Organisation/DisableAccount/{id}
        [HttpPost("DisableAccount/{orgId}", Name = "DisableAccountRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DisableAccount([FromRoute] int orgId)
        {
            return await TryActionAsync(async () => await LicenceService.DisableAccount<int>(orgId));
        }


    }
}
