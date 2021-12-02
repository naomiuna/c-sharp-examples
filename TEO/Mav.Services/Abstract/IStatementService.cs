using Mav.Common.Models;
using Mav.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface IStatementService
    {
        Task<T> GetStatementById<T>(int id);

        Task<T> GetStatementBySectionId<T>(int id);

        Task<T> GetStatementByAssessmentById<T>(int id);

        Task<GenericResult<T>> CreateStatement<T>(AddStatementViewModel m);

        Task<GenericResult<T>> UpdateStatement<T>(UpdateStatementViewModel m);

        Task<GenericResult<T>> DeleteStatement<T>(int id);

        Task<T> GetStatementAnswers<T>(int statementId, string userId);

        Task<GenericResult<T>> CreateStatementAnswer<T>(UserStatementAnswerViewModel m);

        Task<GenericResult<T>> UpdateStatementAnswer<T>(UserStatementAnswerViewModel m);
    }
}
