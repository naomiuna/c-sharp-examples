using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mav.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/{version:apiVersion}/[controller]")]
    [ApiController]
    public class AnswerController : ApiControllerBase
    {
        private readonly IAnswerService AnswerService;

        public AnswerController(
            IConfiguration configuration,
            IAnswerService answerService
        ) : base(configuration)
        {
            AnswerService = answerService;
        }

        // GET api/1.0/Answer/GetAnswerById/{id}
        [HttpGet("GetAnswerById/{id}", Name = "GetAnswerByIdRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetAnswerById(int id)
        {
            return await TryActionAsync(async () => await AnswerService.GetAnswerById<UpdateAnswerViewModel>(id));
        }


        //GET api/1.0/Answer/GetAnswerList/{id}
        [HttpGet("GetAnswerList/{id}", Name = "GetAnswerListRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetAnswerList(int id)
        {
            return await TryActionAsync(async () => await AnswerService.GetAnswerList<UpdateAnswerViewModel>(id));
        }

        //POST api/1.0/Answer/CreateAnswer
        [HttpPost("CreateAnswer", Name = "CreateAnswerRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateAnswer(AddAnswerViewModel m)
        {
            return await TryActionAsync(async () => await AnswerService.CreateAnswer<int>(m));
        }

        //PUT api/1.0/Answer/UpdateAnswer
        [HttpPut("UpdateAnswer", Name = "UpdateAnswertRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateAnswer(UpdateAnswerViewModel m)
        {
            return await TryActionAsync(async () => await AnswerService.UpdateAnswer<int>(m));
        }

        //POST api/1.0/Answer/InsertUpdateAnswer
        [HttpPost("InsertUpdateAnswer", Name = "InsertUpdateAnswerRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> InsertUpdateAnswer([FromBody] List<UpdateAnswerViewModel> models)
        {
            return await TryActionAsync(async () => await AnswerService.InsertUpdateAnswer<int>(models));
        }

        // POST api/1.0/Answer/DeleteAnswer/{id}
        [HttpPost("DeleteAnswer/{id}", Name = "DeleteAnswerRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteAnswer([FromRoute] int id)
        {
            return await TryActionAsync(async () => await AnswerService.DeleteAnswer<int>(id));
        }
    }
}