using Mav.Common.Models;
using Mav.Models.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface IQuestionGroupService
    {
        Task<T> GetQuestionGroupById<T>(int id);

        Task<IEnumerable<T>> GetQuestionGroupList<T>(int sectionId);

        Task<GenericResult<T>> CreateQuestionGroup<T>(AddQuestionGroupViewModel m);

        Task<GenericResult<T>> UpdateQuestionGroup<T>(UpdateQuestionGroupViewModel m);

        Task<GenericResult<T>> DeleteQuestionGroup<T>(int id);
    }
}
