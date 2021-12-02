using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Models.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface ICentreService
    {
        Task<CentreViewModel> GetCentreByIdAsync(int id);
        Task<CentreViewModel> GetCentreByUserIdAsync(string id);
        Task<CentreTotalsViewModel> GetCentreInvigilatorTotals(int id);
        Task<CentreTotalsViewModel> GetCentreSLTTotals(int id);
        Task<GenericResult<bool>> IsCentreActive(int id);
        Task<GenericResult<bool>> IsCentreActiveByUserId(string id);
        Task<UserCentre> AddCentreAsync(AddCentreViewModel m);
        Task<GenericResult<T>> AddUserCentreAsync<T>(AddUserCentreViewModel m);
        Task<GenericResult<T>> UpdateCentreAsync<T>(UpdateCentreViewModel m);
        Task<GenericResult<T>> Delete<T>(int id);

        Task<GenericResult<int>> GetUserCentreAsync(string userId);
        Task<List<string>> GetCentreUsers(int id);
        Task<List<CentrePolicyViewModel>> GetUserCentres();

        Task<CentreViewModel> GetCentreByName(string centreName);

        Task<CentreViewModel> GetCentreByNumber(string centreName);
    }
}
