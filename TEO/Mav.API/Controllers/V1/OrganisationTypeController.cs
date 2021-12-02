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
    public class OrganisationTypeController : ApiControllerBase
    {
        private readonly IOrganisationTypeService OrganisationTypeService;

        public OrganisationTypeController(IConfiguration configuration, IOrganisationTypeService organisationTypeService) :base(configuration)
        {
            OrganisationTypeService = organisationTypeService;
        }

        // GET api/1.0/OrganisationType/GetOrganisationTypeById/{id}
        [HttpGet("GetOrganisationTypeById/{id}", Name = "GetOrganisationTypeByIdRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetOrganisationTypeById(int id)
        {
            return await TryActionAsync(async () => await OrganisationTypeService.GetById<OrganisationTypeViewModel>(id));
        }

        // GET api/1.0/OrganisationType/GetOrganisationTypeList
        [HttpGet("GetOrganisationTypeList", Name = "GetOrganisationTypeListRoute")]
        [Authorize]
        public async Task<IActionResult> GetOrganisationTypeList()
        {
            return await TryActionAsync(async () => await OrganisationTypeService.GetList<OrganisationTypeViewModel>());
        }

        // POST api/1.0/OrganisationType/CreateOrganisationType
        [HttpPost("CreateOrganisationType", Name = "CreateOrganisationTypeRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateOrganisationType(OrganisationTypeViewModel m)
        {
            return await TryActionAsync(async () => await OrganisationTypeService.Create<int>(m));
        }

        //PUT api/1.0/OrganisationType/UpdateOrganisationType
        [HttpPut("UpdateOrganisationType", Name = "UpdateOrganisationTypeRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateOrganisationType(OrganisationTypeViewModel m)
        {
            return await TryActionAsync(async () => await OrganisationTypeService.Update<int>(m));
        }

        // POST api/1.0/OrganisationType/DeleteOrganisationType/{id}
        [HttpPost("DeleteOrganisationType/{id}", Name = "DeleteOrganisationTypeRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteOrganisationType([FromRoute] int id)
        {
            return await TryActionAsync(async () => await OrganisationTypeService.Delete<int>(id));
        }
    }
}
