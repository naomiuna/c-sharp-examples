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
    public class QuestionController : ApiControllerBase
    {
        private readonly IQuestionService QuestionService;

        public QuestionController(
            IConfiguration configuration,
            IQuestionService questionService
        ) : base(configuration)
        {
            QuestionService = questionService;
        }

        // GET api/1.0/Question/GetQuestionById/{id}
        [HttpGet("GetQuestionById/{id}", Name = "GetQuestionByIdRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,SLT")]
        public async Task<IActionResult> GetQuestionById(int id)
        {
            return await TryActionAsync(async () => await QuestionService.GetQuestionById<UpdateQuestionViewModel>(id));
        }

        //GET api/1.0/Question/GetQuestionList/{id}
        [HttpGet("GetQuestionList/{id}", Name = "GetQuestionListRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetQuestionList(int id)
        {
            return await TryActionAsync(async () => await QuestionService.GetQuestionList<QuestionViewModel>(id));
        }

        //POST api/1.0/Question/CreateQuestion
        [HttpPost("CreateQuestion", Name = "CreateQuestionRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateQuestion(AddQuestionViewModel m)
        {
            return await TryActionAsync(async () => await QuestionService.CreateQuestion<int>(m));
        }

        //PUT api/1.0/Question/UpdateQuestion
        [HttpPut("UpdateQuestion", Name = "UpdateQuestiontRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateQuestion(UpdateQuestionViewModel m)
        {
            return await TryActionAsync(async () => await QuestionService.UpdateQuestion<int>(m));
        }


        // POST api/1.0/Question/DeleteQuestion/{id}
        [HttpPost("DeleteQuestion/{id}", Name = "DeleteQuestionRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteQuestion([FromRoute] int id)
        {
            return await TryActionAsync(async () => await QuestionService.DeleteQuestion<int>(id));
        }
    }
}