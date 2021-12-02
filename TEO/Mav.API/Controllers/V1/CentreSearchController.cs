using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Mav.Models.SearchModels;
using Mav.Services.Abstract;
using Mav.Models.ViewModels;

namespace Mav.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/{version:apiVersion}/[controller]")]
    [ApiController]
    public class CentreSearchController : ApiControllerBase
    {
        private readonly ICentreSearchService CentreSearchService;

        public CentreSearchController(
            IConfiguration configuration,
            ICentreSearchService centreSearchService
        ) : base(configuration)
        {
            CentreSearchService = centreSearchService;
        }

        // POST api/1.0/CentreSearch/GetCentreSearch
        [HttpPost("GetCentreSearch", Name = "GetCentreSearchRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetCentreSearch(CentreSearchModel vm)
        {
            return await TryActionAsync(async () => await CentreSearchService.GetCentreSearch<CentreListingModel>(vm));
        }

        // GET api/1.0/CentreSearch/GetCentreSearchByUserId
        [HttpGet("GetCentreSearchByUserId/{userId}", Name = "GetCentreSearchByUserIdRoute")]
        [Authorize(Roles = "Administrator, ExamOfficer")]
        public async Task<IActionResult> GetCentreSearchByUserId(string userId)
        {
            return await TryActionAsync(async () => await CentreSearchService.GetCentreSearchByUserId(userId));
        }

        // PUT api/1.0/CentreSearch/UpdateCentreContact
        [HttpPut("UpdateCentreContact", Name = "UpdateCentreContactRoute")]
        [Authorize(Roles = "Administrator, ExamOfficer")]
        public async Task<IActionResult> UpdateCentreContact(UpdateCentreContactViewModel vm)
        {
            return await TryActionAsync(async () => await CentreSearchService.UpdateCentreContact<int>(vm));
        }
    }
}