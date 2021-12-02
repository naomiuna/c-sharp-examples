using Mav.Common.Models;
using Mav.Models.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface IUserAssessmentAnswerService
    {
        Task<T> GetById<T>(int id);

        Task<T> GetByKeys<T>(int assessmentSectionID, int questionID);

        Task<GenericResult<T>> Add<T>(AddUserAssessmentSectionAnswerViewModel vm);

        Task<GenericResult<T>> Update<T>(UpdateUserAssessmentSectionAnswerViewModel vm);

        Task<IEnumerable<T>> GetByQuestionId<T>(int questionId);
    }
}
