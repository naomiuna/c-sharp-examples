using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Mav.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/{version:apiVersion}/[controller]")]
    [ApiController]
    public class StatementController : ApiControllerBase
    {
        private readonly IStatementService StatementService;

        public StatementController(IConfiguration configuration, IStatementService statementService) : base(configuration)
        {
            StatementService = statementService;
        }

        // GET api/1.0/Statement/GetStatementById/{id}
        [HttpGet("GetStatementById/{id}", Name = "GetStatementByIdRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer,SLT")]
        public async Task<IActionResult> GetStatementById(int id)
        {
            return await TryActionAsync(async () => await StatementService.GetStatementById<UpdateStatementViewModel>(id));
        }

        // GET api/1.0/Statement/GetStatementByAssessmentId/{id}
        [HttpGet("GetStatementByAssessmentId/{id}", Name = "GetStatementByAssessmentIdRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer,SLT")]
        public async Task<IActionResult> GetStatementByAssessmentId(int id)
        {
            return await TryActionAsync(async () => await StatementService.GetStatementByAssessmentById<UpdateStatementViewModel>(id));
        }

        // GET api/1.0/Statement/GetStatementBySectionId/{id}
        [HttpGet("GetStatementBySectionId/{id}", Name = "GetStatementBySectionIdRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer,SLT")]
        public async Task<IActionResult> GetStatementBySectionId(int id)
        {
            return await TryActionAsync(async () =>
            {
                var statement = await StatementService.GetStatementBySectionId<UpdateStatementViewModel>(id);

                if (statement == null) return null;

                var userId = (await GetCurrentUserAsync()).UserID;
                statement.Answers = await StatementService.GetStatementAnswers<List<UserStatementAnswerViewModel>>(statement.ID, userId);

                return statement;

            });

        }

        //PUT api/1.0/Statement/CreateStatement
        [HttpPut("CreateStatement", Name = "CreateStatementRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateStatement(AddStatementViewModel m)
        {
            return await TryActionAsync(async () => await StatementService.CreateStatement<int>(m));
        }

        //PUT api/1.0/Statement/UpdateStatement
        [HttpPut("UpdateStatement", Name = "UpdateStatementRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateStatement(UpdateStatementViewModel m)
        {
            return await TryActionAsync(async () => await StatementService.UpdateStatement<int>(m));
        }

        //PUT api/1.0/Statement/UpdateStatement
        [HttpPut("DeleteStatement", Name = "DeleteStatementRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteStatement(int id)
        {
            return await TryActionAsync(async () => await StatementService.DeleteStatement<int>(id));
        }


        // GET api/1.0/Statement/GetUserStatmentAnswers/{id}/{userid}
        [HttpGet("GetUserStatementAnswers/{id}/{userid}", Name = "GetUserStatementAnswersRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer,SLT")]
        public async Task<IActionResult> GetUserStatementAnswers(int id, string userid)
        {
            if (string.IsNullOrEmpty(userid))
            {
                userid = (await GetCurrentUserAsync()).UserID;
            }
            
            return await TryActionAsync(async () => await StatementService.GetStatementAnswers<List<UserStatementAnswerViewModel>>(id, userid));
        }

        //PUT api/1.0/Statement/UpdateUserStatementAnswers
        [HttpPut("UpdateUserStatementAnswers", Name = "UpdateUserStatementAnswersRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer,SLT")]
        public async Task<IActionResult> UpdateUserStatementAnswers(UpdateStatementViewModel m)
        {
            return await TryActionAsync(async () => 
            {
                var userId = (await GetCurrentUserAsync()).UserID;

                foreach (var answer in m.Answers)
                {
                    answer.UserID = userId;
                    if (answer.ID > 0)
                    {
                        await StatementService.UpdateStatementAnswer<int>(answer);
                    }
                    else
                    {
                        await StatementService.CreateStatementAnswer<int>(answer);
                    }
                }

                return true;
            });
          
        }
    }
}