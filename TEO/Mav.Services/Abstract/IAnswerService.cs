using Mav.Common.Models;
using Mav.Models.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface IAnswerService
    {
        Task<T> GetAnswerById<T>(int id);

        Task<IEnumerable<T>> GetAnswerList<T>(int questionId);

        Task<GenericResult<T>> CreateAnswer<T>(AddAnswerViewModel m);

        Task<GenericResult<T>> UpdateAnswer<T>(UpdateAnswerViewModel m);

        Task<GenericResult<T>> InsertUpdateAnswer<T>(List<UpdateAnswerViewModel> models);

        Task<GenericResult<T>> DeleteAnswer<T>(int id);

        Task<AddUserAssessmentSectionAnswerViewModel> MarkAnswers(AddUserAssessmentSectionAnswerViewModel vm);
    }
}
