using Mav.Models.SearchModels;
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
    public class OrganisationController : ApiControllerBase
    {
        private readonly IOrganisationService OrganisationService;

        public OrganisationController(
            IConfiguration configuration,
            IOrganisationService organisationService) : base(configuration)
        {
            OrganisationService = organisationService;
        }

        // GET api/1.0/Organisation/GetOrganisationById/{id}
        [HttpGet("GetOrganisationById/{id}", Name = "GetOrganisationByIdRoute")]
        [Authorize]
        public async Task<IActionResult> GetOrganisationById(int id)
        {
            return await TryActionAsync(async () => await OrganisationService.GetOrganisationById<OrganisationViewModel>(id));
        }

        // POST api/1.0/Organisation/GetAllOrganisations
        [HttpPost("GetAllOrganisations", Name = "GetAllOrganisationsRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetAllOrganisations(OrganisationSearchModel vm)
        {
            return await TryActionAsync(async () => await OrganisationService.GetAllOrganisations(vm));
        }

        // POST api/1.0/Organisation/CreateOrganisation
        [HttpPost("CreateOrganisation", Name = "CreateOrganisationRoute")]
        //[Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateOrganisation(AddOrganisationViewModel m)
        {
            return await TryActionAsync(async () => await OrganisationService.AddOrganisation<int>(m));
        }

        // PUT api/1.0/Organisation/UpdateOrganisation
        [HttpPut("UpdateOrganisation", Name = "UpdateOrganisationRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateOrganisation(UpdateOrganisationViewModel m)
        {
            return await TryActionAsync(async () => await OrganisationService.Update<int>(m));
        }

        // POST api/1.0/Organisation/DeleteOrganisation
        [HttpPost("DeleteOrganisation/{id}", Name = "DeleteOrganisationRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteOrganisation([FromRoute] int id)
        {
            return await TryActionAsync(async () => await OrganisationService.Delete<int>(id));
        }

    }
}
