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
    public class QuestionGroupController : ApiControllerBase
    {
        private readonly IQuestionGroupService QuestionGroupService;

        public QuestionGroupController(
            IConfiguration configuration,
            IQuestionGroupService questionGroupService
        ) : base(configuration)
        {
            QuestionGroupService = questionGroupService;
        }

        // GET api/1.0/QuestionGroup/GetQuestionGroupById/{id}
        [HttpGet("GetQuestionGroupById/{id}", Name = "GetQuestionGroupByIdRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetQuestionGroupById(int id)
        {
            return await TryActionAsync(async () => await QuestionGroupService.GetQuestionGroupById<UpdateQuestionGroupViewModel>(id));
        }


        //GET api/1.0/QuestionGroup/GetQuestionGroupList/{id}
        [HttpGet("GetQuestionGroupList/{id}", Name = "GetQuestionGroupListRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetQuestionGroupList(int id)
        {
            return await TryActionAsync(async () => await QuestionGroupService.GetQuestionGroupList<QuestionGroupViewModel>(id));
        }

        //POST api/1.0/QuestionGroup/CreateQuestionGroup
        [HttpPost("CreateQuestionGroup", Name = "CreateQuestionGroupRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateQuestionGroup(AddQuestionGroupViewModel m)
        {
            return await TryActionAsync(async () => await QuestionGroupService.CreateQuestionGroup<int>(m));
        }

        //PUT api/1.0/QuestionGroup/UpdateQuestionGroup
        [HttpPut("UpdateQuestionGroup", Name = "UpdateQuestionGrouptRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateQuestionGroup(UpdateQuestionGroupViewModel m)
        {
            return await TryActionAsync(async () => await QuestionGroupService.UpdateQuestionGroup<int>(m));
        }


        // POST api/1.0/QuestionGroup/DeleteQuestionGroup/{id}
        [HttpPost("DeleteQuestionGroup/{id}", Name = "DeleteQuestionGroupRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteQuestionGroup([FromRoute] int id)
        {
            return await TryActionAsync(async () => await QuestionGroupService.DeleteQuestionGroup<int>(id));
        }
    }
}