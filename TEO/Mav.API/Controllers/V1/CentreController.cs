using Mav.Common.Models;
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
    public class CentreController : ApiControllerBase
    {
        private readonly ICentreService CentreService;

        public CentreController (
            IConfiguration configuration, 
            ICentreService centreService
        ) : base(configuration)
        {
            CentreService = centreService;
        }

        // GET api/1.0/Centre/GetCentreById/{id}
        [HttpGet("GetCentreById/{id}", Name = "GetCentreByIdRoute")]
        [Authorize]
        public async Task<IActionResult> GetCentreById(int id)
        {
            return await TryActionAsync(async () => await CentreService.GetCentreByIdAsync(id));
        }

        // GET api/1.0/Centre/GetCentreByUserId/{id}
        [HttpGet("GetCentreByUserId/{id}", Name = "GetCentreByUserIdRoute")]
        [Authorize]
        public async Task<IActionResult> GetCentreByUserId(string id)
        {
            return await TryActionAsync(async () => await CentreService.GetCentreByUserIdAsync(id));
        }

        // GET api/1.0/Centre/GetMyCentre
        [HttpGet("GetMyCentre", Name = "GetMyCentreRoute")]
        [Authorize(Roles = "ExamInvigilator,ExamOfficer")]
        public async Task<IActionResult> GetMyCentre()
        {
            var principal = await GetCurrentUserAsync();
            if (string.IsNullOrEmpty(principal?.UserID))
            {
                return BadRequest();
            }
            return await TryActionAsync(async () => await CentreService.GetCentreByUserIdAsync(principal?.UserID));
        }

        // GET api/1.0/Centre/GetCentreInvigilatorTotals/{id}
        [HttpGet("GetCentreInvigilatorTotals/{id}", Name = "GetCentreInvigilatorTotalsRoute")]
        [Authorize(Roles = "Administrator,ExamOfficer")]
        public async Task<IActionResult> GetCentreInvigilatorTotals(int id)
        {
            var principal = await GetCurrentUserAsync();

            if (string.IsNullOrEmpty(principal?.UserID))
            {
                return BadRequest();
            }

            if (id == 0)
            {
                var centreLookup = await CentreService.GetUserCentreAsync(principal.UserID);
                if (centreLookup.Status != EnumStatusCode.Ok)
                {
                    return BadRequest();
                }
                id = centreLookup.KeyID;
            }

            return await TryActionAsync(async () => await CentreService.GetCentreInvigilatorTotals(id));
        }

        // GET api/1.0/Centre/GetCentreSLTTotals/{id}
        [HttpGet("GetCentreSLTTotals/{id}", Name = "GetCentreSLTTotalsRoute")]
        [Authorize(Roles = "Administrator,ExamOfficer")]
        public async Task<IActionResult> GetCentreSLTTotals(int id)
        {
            var principal = await GetCurrentUserAsync();

            if (string.IsNullOrEmpty(principal?.UserID))
            {
                return BadRequest();
            }

            if (id == 0)
            {
                var centreLookup = await CentreService.GetUserCentreAsync(principal.UserID);
                if (centreLookup.Status != EnumStatusCode.Ok)
                {
                    return BadRequest();
                }
                id = centreLookup.KeyID;
            }

            return await TryActionAsync(async () => await CentreService.GetCentreSLTTotals(id));
        }

        // GET api/1.0/Centre/IsCentreActive/{id}
        [HttpGet("IsCentreActive/{id}", Name = "IsCentreActiveRoute")]
        [AllowAnonymous]
        public async Task<IActionResult> IsCentreActive(int id)
        {
            var isActive = await CentreService.IsCentreActive(id);
            if (isActive.Status == Common.Models.EnumStatusCode.Ok) { return Ok(isActive); }
            return BadRequest();
        }

        // GET api/1.0/Centre/IsCentreActiveByUserId/{id}
        [HttpGet("IsCentreActiveByUserId/{id}", Name = "IsCentreActiveByUserIdRoute")]
        [AllowAnonymous]
        public async Task<IActionResult> IsCentreActiveByUserId(string id)
        {
            var isActive = await CentreService.IsCentreActiveByUserId(id);
            if (isActive.Status == Common.Models.EnumStatusCode.Ok) { return Ok(isActive); }
            return BadRequest();
        }

        //POST api/1.0/Centre/AddCentre
        [HttpPost("AddCentre", Name = "AddCentreRoute")]
        [AllowAnonymous]
        public async Task<IActionResult> AddCentre(AddCentreViewModel m)
        {
            return await TryActionAsync(async () => await CentreService.AddCentreAsync(m));
        }

        //PUT api/1.0/Centre/UpdateCentre
        [HttpPut("UpdateCentre", Name = "UpdateCentreRoute")]
        [Authorize(Roles = "Administrator,ExamOfficer")]
        public async Task<IActionResult> UpdateCentre(UpdateCentreViewModel m)
        {
            return await TryActionAsync(async () => await CentreService.UpdateCentreAsync<int>(m));
        }

        // POST api/1.0/Centre/DeleteCentre/{id}
        [HttpPost("DeleteCentre/{id}", Name = "DeleteCentreRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteCentre([FromRoute] int id)
        {
            return await TryActionAsync(async () => await CentreService.Delete<int>(id));
        }

        // Get api/1.0/Centre/AddUserCentre
        [HttpPost("AddUserCentre", Name = "AddUserCentreRoute")]
        [AllowAnonymous]
        public async Task<IActionResult> AddUserCentre(AddUserCentreViewModel vm)
        {
            return await TryActionAsync(async () => await CentreService.AddUserCentreAsync<int>(vm));
        }

        // Get api/1.0/Centre/GetUserCentres
        [HttpGet("GetUserCentres", Name = "GetUserCentresRoute")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserCentres()
        {
            return await TryActionAsync(async () => await CentreService.GetUserCentres());
        }

        // Get api/1.0/Centre/GetCentreByName/{centreName}
        [HttpGet("GetCentreByName/{centreName}", Name = "GetCentreByNameRoute")]
        public async Task<IActionResult> GetCentreByName(string centreName)
        {
            return await TryActionAsync(async () => await CentreService.GetCentreByName(centreName));
        }

        // Get api/1.0/Centre/GetCentreByNumber/{centreNumber}
        [HttpGet("GetCentreByNumber/{centreNumber}", Name = "GetCentreByNumberRoute")]
        public async Task<IActionResult> GetCentreByNumber(string centreNumber)
        {
            return await TryActionAsync(async () => await CentreService.GetCentreByNumber(centreNumber));
        }
    }
}