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
    public class ExamController : ApiControllerBase
    {
        private readonly IQuestionService QuestionService;
        private readonly IAnswerService AnswerService;
        private readonly IUserAssessmentSectionService UserAssessmentSectionService;

        public ExamController(
            IConfiguration configuration,
            IQuestionService questionService,
            IAnswerService answerService,
            IUserAssessmentSectionService userAssessmentSectionService
        ) : base(configuration)
        {
            QuestionService = questionService;
            AnswerService = answerService;
            UserAssessmentSectionService = userAssessmentSectionService;
        }

        // GET api/1.0/Exam/GetExamQuestionById/{id}
        [HttpGet("GetExamQuestionById/{id}", Name = "GetExamQuestionByIdRoute")]
        [Authorize(Roles = "ExamOfficer,ExamInvigilator,SLT")]
        public async Task<IActionResult> GetExamQuestionById(int id)
        {
            return await TryActionAsync(async () => await QuestionService.GetExamQuestionById(id));
        }

        // GET api/1.0/Exam/GetSectionSummaryDetails/{id}
        [HttpGet("GetSectionSummaryDetails/{id}", Name = "GetSectionSummaryDetailsRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer,SLT")]
        public async Task<IActionResult> GetSectionSummaryDetails(int id)
        {
            return await TryActionAsync(async () => await UserAssessmentSectionService.GetSectionSummaryDetails(id));
        }

        // GET api/1.0/Exam/GetRecentScore/{id}
        [HttpGet("GetRecentScore/{id}", Name = "GetRecentScoreRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer,SLT")]
        public async Task<IActionResult> GetRecentScore(int id)
        {
            return await TryActionAsync(async () => await UserAssessmentSectionService.GetRecentScore(id));
        }

    }
}