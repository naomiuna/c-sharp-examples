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
    public class UserAssessmentAnswerController : ApiControllerBase
    {
        private readonly IUserAssessmentAnswerService UserAssessmentAnswerService;
        private readonly IAnswerService AnswerService;

        public UserAssessmentAnswerController(
            IConfiguration configuration,
            IUserAssessmentAnswerService userAssessmentAnswerService,
            IAnswerService answerService
        ) : base(configuration)
        {
            UserAssessmentAnswerService = userAssessmentAnswerService;
            AnswerService = answerService;
        }
        
        // GET api/1.0/UserAssessmentAnswer/GetUserAssessmentAnswerById/{id}
        [HttpGet("GetUserAssessmentAnswerById/{id}", Name = "GetUserAssessmentAnswerByIdRoute")]
        [Authorize(Roles = "ExamOfficer,ExamInvigilator,SLT")]
        public async Task<IActionResult> GetUserAssessmentAnswerById(int id)
        {
            return await TryActionAsync(async () => await UserAssessmentAnswerService.GetById<UpdateUserAssessmentSectionAnswerViewModel>(id));
        }
        
        // GET api/1.0/UserAssessmentAnswer/GetUserAssessmentAnswerByKeys/{sectid}/{questid}
        [HttpGet("GetUserAssessmentAnswerByKeys/{sectid}/{questid}", Name = "GetUserAssessmentAnswerByKeysRoute")]
        [Authorize(Roles = "ExamOfficer,ExamInvigilator,SLT")]
        public async Task<IActionResult> GetUserAssessmentAnswerByKeys(int sectid, int questid)
        {
            return await TryActionAsync(async () => await UserAssessmentAnswerService.GetByKeys<UpdateUserAssessmentSectionAnswerViewModel>(sectid, questid));
        }

        //POST api/1.0/UserAssessmentAnswer/CreateUserAssessmentSectionAnswer
        [HttpPost("CreateUserAssessmentSectionAnswer", Name = "CreateUserAssessmentSectionAnswerRoute")]
        [Authorize(Roles = "ExamOfficer,ExamInvigilator,SLT")]
        public async Task<IActionResult> CreateUserAssessmentSectionAnswer(AddUserAssessmentSectionAnswerViewModel vm)
        {

            return await TryActionAsync(async () => await UserAssessmentAnswerService.Add<int>(
                await AnswerService.MarkAnswers(vm)
            ));
        }

        //PUT api/1.0/UserAssessmentAnswer/UpdateUserAssessmentSectionAnswer
        [HttpPut("UpdateUserAssessmentSectionAnswer", Name = "UpdateUserAssessmentSectionAnswerRoute")]
        [Authorize(Roles = "ExamOfficer,ExamInvigilator,SLT")]
        public async Task<IActionResult> UpdateUserAssessmentSectionAnswer(UpdateUserAssessmentSectionAnswerViewModel vm)
        {
            return await TryActionAsync(async () => await UserAssessmentAnswerService.Update<int>(vm));
        }
    }
}