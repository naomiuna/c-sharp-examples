using Mav.Common.Models;
using Mav.Data.Repositories;
using Mav.Models.SearchModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mav.Services.Identity.Services
{
    public interface IUserSearchService
    {
        Task<IPaginate<T>> GetUserSearch<T>(UserSearchModel vm, EnumRoleType roleType);

        Task<IPaginate<T>> GetUserSearch<T>(UserSearchModel vm, List<EnumRoleType> allowableRoleTypes);

        Task<int> CountCentreUsers(int id, string role);
    }
}
