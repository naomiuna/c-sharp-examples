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
    public class CentreTypeController : ApiControllerBase
    {
        private readonly ICentreTypeService CentreTypeService;

        public CentreTypeController(
            IConfiguration configuration,
            ICentreTypeService centreTypeService
        ) : base(configuration)
        {
            CentreTypeService = centreTypeService;
        }

        // GET api/1.0/CentreType/GetCentreTypeById/{id}
        [HttpGet("GetCentreTypeById/{id}", Name = "GetCentreTypeByIdRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetCentreTypeById(int id)
        {
            return await TryActionAsync(async () => await CentreTypeService.GetById<CentreTypeViewModel>(id));
        }

        // GET api/1.0/CentreType/GetCentreTypeList
        [HttpGet("GetCentreTypeList", Name = "GetCentreTypeListRoute")]
        [Authorize]
        public async Task<IActionResult> GetCentreTypeList()
        {
            return await TryActionAsync(async () => await CentreTypeService.GetList<CentreTypeViewModel>());
        }

        // POST api/1.0/CentreType/CreateCentreType
        [HttpPost("CreateCentreType", Name = "CreateCentreTypeRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateCentreType(CentreTypeViewModel m)
        {
            return await TryActionAsync(async () => await CentreTypeService.Create<int>(m));
        }

        //PUT api/1.0/CentreType/UpdateCentreType
        [HttpPut("UpdateCentreType", Name = "UpdateCentreTypegRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateCentreType(CentreTypeViewModel m)
        {
            return await TryActionAsync(async () => await CentreTypeService.Update<int>(m));
        }

        // POST api/1.0/CentreType/DeleteCentreType/{id}
        [HttpPost("DeleteCentreType/{id}", Name = "DeleteCentreTypeRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteCentreType([FromRoute] int id)
        {
            return await TryActionAsync(async () => await CentreTypeService.Delete<int>(id));
        }
    }
}