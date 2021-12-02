using Mav.Common.Extensions;
using Mav.Models.SearchModels;
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
    public class UserAssessmentSectionController : ApiControllerBase
    {
        private readonly IUserAssessmentService UserAssessmentService;
        private readonly IUserAssessmentSectionService UserAssessmentSectionService;

        public UserAssessmentSectionController(
            IConfiguration configuration,
            IUserAssessmentService userAssessmentService,
            IUserAssessmentSectionService userAssessmentSectionService
        ) : base(configuration)
        {
            UserAssessmentService = userAssessmentService;
            UserAssessmentSectionService = userAssessmentSectionService;
        }

        // GET api/1.0/UserAssessmentSection/GetUserAssessmentSectionById/{id}
        [HttpGet("GetUserAssessmentSectionById/{id}", Name = "GetUserAssessmentSectionByIdRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer,SLT")]
        public async Task<IActionResult> GetUserAssessmentSectionById(int id)
        {
            var r1 = await UserAssessmentSectionService.GetById<UserAssessmentSectionViewModel>(id);
            if (r1 == null)
            {
                return BadRequest();
            }

            var userAssessmentRecord = await UserAssessmentService.GetById<UserAssessmentViewModel>(r1.UserAssessmentID);
            var userAssessmentSubmitted = userAssessmentRecord.SubmittedOn.HasValue;
            var assessmentYear = userAssessmentRecord.YearID;
            var currentAcademicYear = assessmentYear.GetCurrentAcademicYear();

            r1.ActionAllowed = assessmentYear == currentAcademicYear && !userAssessmentSubmitted;

            return Ok(r1);
        }
        
        // GET api/1.0/UserAssessmentSection/GetUserAssessmentSectionQuestions/{id}
        [HttpGet("GetUserAssessmentSectionQuestions/{id}", Name = "GetUserAssessmentSectionQuestionsRoute")]
        [Authorize(Roles = "ExamOfficer,ExamInvigilator,SLT")]
        public async Task<IActionResult> GetUserAssessmentSectionQuestions(int id)
        {
            return await TryActionAsync(async () => await UserAssessmentSectionService.GetUserAssessmentSectionQuestions(id));
        }

        // GET api/1.0/UserAssessmentSection/GetUserAssessmentSectionTotals/{id}
        [HttpGet("GetUserAssessmentSectionTotals/{id}", Name = "GetUserAssessmentSectionTotalsRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer,SLT")]
        public async Task<IActionResult> GetUserAssessmentSectionTotals(int id)
        {
            return await TryActionAsync(async () => await UserAssessmentSectionService.GetUserAssessmentSectionTotals(id));
        }

        // GET api/1.0/UserAssessmentSection/LookupNextSectionStep/{id}
        [HttpGet("LookupNextSectionStep/{id}", Name = "LookupNextSectionStepRoute")]
        [Authorize(Roles = "ExamOfficer,ExamInvigilator,SLT")]
        public async Task<IActionResult> LookupNextSectionStep(int id)
        {
            return await TryActionAsync(async () => await UserAssessmentSectionService.LookupNextSectionStep(id));
        }

        //POST api/1.0/UserAssessmentSection/GetUserAssessmentSectionListByUserId
        [HttpPost("GetUserAssessmentSectionListByUserId", Name = "GetUserAssessmentSectionListByUserIdRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer,SLT")]
        public async Task<IActionResult> GetUserAssessmentSectionListByUserId(UserAssessmentSectionSearchModel vm)
        {
            return await TryActionAsync(async () => await UserAssessmentSectionService.GetListByUserId(vm));
        }

        //POST api/1.0/UserAssessmentSection/CreateUserAssessmentSection
        [HttpPost("CreateUserAssessmentSection", Name = "CreateUserAssessmentSectionRoute")]
        [Authorize(Roles = "ExamOfficer,ExamInvigilator,SLT")]
        public async Task<IActionResult> CreateUserAssessmentSection(AddUserAssessmentSectionViewModel vm)
        {
            return await TryActionAsync(async () => await UserAssessmentSectionService.Add<int>(vm));
        }

        //POST api/1.0/UserAssessmentSection/RestartUserAssessmentSection/{id}
        [HttpPost("RestartUserAssessmentSection/{id}", Name = "RestartUserAssessmentSectionRoute")]
        [Authorize(Roles = "ExamOfficer,ExamInvigilator,SLT")]
        public async Task<IActionResult> RestartUserAssessmentSection(int id)
        {
            return await TryActionAsync(async () => await UserAssessmentSectionService.Restart<int>(id));
        }

        //PUT api/1.0/UserAssessmentSection/UpdateUserAssessmentSection
        [HttpPut("UpdateUserAssessmentSection", Name = "UpdateUserAssessmentSectionRoute")]
        [Authorize(Roles = "ExamOfficer,ExamInvigilator,SLT")]
        public async Task<IActionResult> UpdateUserAssessmentSection(UpdateUserAssessmentSectionViewModel vm)
        {
            return await TryActionAsync(async () => await UserAssessmentSectionService.Update<int>(vm));
        }
        
        //PUT api/1.0/UserAssessmentSection/SubmitUserAssessmentSection
        [HttpPut("SubmitUserAssessmentSection", Name = "SubmitUserAssessmentSectionRoute")]
        [Authorize(Roles = "ExamOfficer,ExamInvigilator,SLT")]
        public async Task<IActionResult> SubmitUserAssessmentSection(SubmitUserAssessmentSectionViewModel vm)
        {
            return await TryActionAsync(async () => await UserAssessmentSectionService.Submit<int>(vm));
        }

        //POST api/1.0/UserAssessmentSection/UpdateUserSectionStats
        [HttpPost("UpdateUserSectionStats", Name = "UpdateUserSectionStatsRoute")]
        [Authorize(Roles = "ExamOfficer")]
        public async Task<IActionResult> UpdateUserSectionStats(UpdateUserSectionStatsViewModel vm)
        {
            return await TryActionAsync(async () => await UserAssessmentSectionService.UpdateUserSectionStats<int>(vm));
        }
    }
}