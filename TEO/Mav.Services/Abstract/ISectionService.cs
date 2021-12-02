using Mav.Common.Models;
using Mav.Data.Repositories;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface ISectionService
    {
        Task<T> GetSectionById<T>(int id);

        Task<IEnumerable<T>> GetSectionList<T>(int assessmentId);

        Task<IPaginate<T>> GetSectionListPages<T>(SectionSearchModel vm);

        Task<GenericResult<T>> CreateSection<T>(AddSectionViewModel m);

        Task<GenericResult<T>> UpdateSection<T>(UpdateSectionViewModel m);

        Task<GenericResult<T>> DeleteSection<T>(int id);

        Task<int> GetSectionCount(int assessmentId);

    }
}
