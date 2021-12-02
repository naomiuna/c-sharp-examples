using Mav.Common.Models;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using Mav.Services.Identity.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace Mav.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/{version:apiVersion}/[controller]")]
    [ApiController]
    public class UserAssessmentController : ApiControllerBase
    {
        private readonly IUserAssessmentService UserAssessmentService;
        private readonly ICentreService CentreService;
        private readonly IUserService _userService;


        public UserAssessmentController(
            IConfiguration configuration,
            IUserAssessmentService userAssessmentService,
            ICentreService centreService,
            IUserService userService
        ) : base(configuration)
        {
            UserAssessmentService = userAssessmentService;
            CentreService = centreService;
            _userService = userService;
        }

        // GET api/1.0/UserAssessment/GetUserAssessmentById/{id}
        [HttpGet("GetUserAssessmentById/{id}", Name = "GetUserAssessmentByIdRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer, SLT")]
        public async Task<IActionResult> GetUserAssessmentById(int id)
        {
            return await TryActionAsync(async () => await UserAssessmentService.GetById<UserAssessmentViewModel>(id));
        }

        //POST api/1.0/UserAssessment/GetUserAssessmentListByUserId
        [HttpPost("GetUserAssessmentListByUserId", Name = "GetUserAssessmentListByUserIdRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer,SLT")]
        public async Task<IActionResult> GetUserAssessmentListByUserId(UserAssessmentSearchModel vm)
        {
            //This will need to grab the user's role and only return assessments for that role
            var principle = await GetCurrentUserAsync();
            var r = _userService.GetUserRoles(principle.UserID).Result;
            //get ID of role
            vm.Role = await _userService.GetRoleIDByRole(r[0]);     
            return await TryActionAsync(async () => await UserAssessmentService.GetListByUserId(vm));
        }

        // GET api/1.0/UserAssessment/GetUserLatestAssessment/{id}
        [HttpGet("GetUserLatestAssessment/{id}", Name = "GetUserLatestAssessmentRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer, SLT")]
        public async Task<IActionResult> GetUserLatestAssessment(string id)
        {
            return await TryActionAsync(async () => await UserAssessmentService.GetUserLatestAssessment(id));
        }

        //POST api/1.0/UserAssessment/GetUserHistory
        [HttpPost("GetUserHistory", Name = "GetUserHistoryRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer, SLT")]
        public async Task<IActionResult> GetUserHistory(UserAssessmentSearchModel vm)
        {
            return await TryActionAsync(async () => await UserAssessmentService.GetUserHistory(vm));
        }

        //POST api/1.0/UserAssessment/CreateUserAssessment
        [HttpPost("CreateUserAssessment", Name = "CreateUserAssessmentRoute")]
        [Authorize(Roles = "ExamInvigilator,SLT,ExamOfficer")]
        public async Task<IActionResult> CreateUserAssessment(AddUserAssessmentViewModel vm)
        {
            return await TryActionAsync(async () => await UserAssessmentService.Add<int>(vm));
        }

        //PUT api/1.0/UserAssessment/UpdateUserAssessment
        [HttpPut("UpdateUserAssessment", Name = "UpdateUserAssessmentRoute")]
        [Authorize(Roles = "ExamInvigilator, SLT,ExamOfficer")]
        public async Task<IActionResult> UpdateUserAssessment(UpdateUserAssessmentViewModel vm)
        {
            return await TryActionAsync(async () => await UserAssessmentService.Update<int>(vm));
        }

        //PUT api/1.0/UserAssessment/SubmitUserAssessment
        [HttpPut("SubmitUserAssessment", Name = "SubmitUserAssessmentRoute")]
        [Authorize(Roles = "ExamInvigilator,SLT,ExamOfficer")]
        public async Task<IActionResult> SubmitUserAssessment(SubmitUserAssessmentViewModel vm)
        {
            var principal = await GetCurrentUserAsync();
            if (string.IsNullOrEmpty(principal?.UserID))
            {
                return BadRequest();
            }

            var user = new InvigilatorViewModel
            {
                Id = principal.UserID,
                Email = principal.Email,
                FirstName = principal.FirstName,
                Surname = principal.Surname
            };

            var centreLookup = await CentreService.GetUserCentreAsync(principal.UserID);
            if (centreLookup.Status != EnumStatusCode.Ok)
            {
                return BadRequest();
            }
            user.CentreID = centreLookup.KeyID;

            return await TryActionAsync(async () => await UserAssessmentService.Submit<int>(vm, user));
        }
    }
}