using Mav.Common.Models;
using Mav.Models.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface IAssessmentYearService
    {
        Task<T> GetById<T>(int id);

        Task<T> GetByYear<T>(int id);

        Task<List<T>> GetList<T>();

        Task<GenericResult<T>> Create<T>(AssessmentYearViewModel m);

        Task<GenericResult<T>> Update<T>(AssessmentYearViewModel m);

        Task<GenericResult<T>> Delete<T>(int id);
    }
}
