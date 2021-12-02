using Mav.Common.Models;
using Mav.Data.Repositories;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface ICentreSearchService
    {
        Task<IPaginate<T>> GetCentreSearch<T>(CentreSearchModel vm);
        
        Task<IEnumerable<CentreListingModel>> GetCentres();

        Task<IEnumerable<CentreListingModel>> GetCentresEnum(CentreSearchModel vm);

        Task<CentreListingModel> GetCentreSearchByUserId(string userId);

        Task<GenericResult<T>> UpdateCentreContact<T>(UpdateCentreContactViewModel vm);
    }
}
