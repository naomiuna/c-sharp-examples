using Mav.Common.Models;
using Mav.Models.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface IQuestionService
    {
        Task<T> GetQuestionById<T>(int id);

        Task<ExamQuestionViewModel> GetExamQuestionById(int id);

        Task<IEnumerable<T>> GetQuestionList<T>(int sectionId);

        Task<GenericResult<T>> CreateQuestion<T>(AddQuestionViewModel m);

        Task<GenericResult<T>> UpdateQuestion<T>(UpdateQuestionViewModel m);

        Task<GenericResult<T>> DeleteQuestion<T>(int id);

        Task<IEnumerable<T>> GetQuestionBySectionId<T>(int sectionId);
    }
}
