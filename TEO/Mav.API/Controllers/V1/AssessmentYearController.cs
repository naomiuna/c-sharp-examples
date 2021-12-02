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
    public class AssessmentYearController : ApiControllerBase
    {
        private readonly IAssessmentYearService AssessmentYearService;

        public AssessmentYearController(
            IConfiguration configuration,
            IAssessmentYearService assessmentYearService
        ) : base(configuration)
        {
            AssessmentYearService = assessmentYearService;
        }

        // GET api/1.0/AssessmentYear/GetAssessmentYearById/{id}
        [HttpGet("GetAssessmentYearById/{id}", Name = "GetAssessmentYearByIdRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetAssessmentYearById(int id)
        {
            return await TryActionAsync(async () => await AssessmentYearService.GetById<AssessmentYearViewModel>(id));
        }

        // GET api/1.0/AssessmentYear/GetAssessmentYearList
        [HttpGet("GetAssessmentYearList", Name = "GetAssessmentYearListRoute")]
        [Authorize]
        public async Task<IActionResult> GetAssessmentYearList()
        {
            return await TryActionAsync(async () => await AssessmentYearService.GetList<AssessmentYearViewModel>());
        }

        // POST api/1.0/AssessmentYear/CreateAssessmentYear
        [HttpPost("CreateAssessmentYear", Name = "CreateAssessmentYearRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateAssessmentYear(AssessmentYearViewModel m)
        {
            return await TryActionAsync(async () => await AssessmentYearService.Create<int>(m));
        }

        //PUT api/1.0/AssessmentYear/UpdateAssessmentYear
        [HttpPut("UpdateAssessmentYear", Name = "UpdateAssessmentYeargRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateAssessmentYear(AssessmentYearViewModel m)
        {
            return await TryActionAsync(async () => await AssessmentYearService.Update<int>(m));
        }

        // POST api/1.0/AssessmentYear/DeleteAssessmentYear/{id}
        [HttpPost("DeleteAssessmentYear/{id}", Name = "DeleteAssessmentYearRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteAssessmentYear([FromRoute] int id)
        {
            return await TryActionAsync(async () => await AssessmentYearService.Delete<int>(id));
        }
    }
}