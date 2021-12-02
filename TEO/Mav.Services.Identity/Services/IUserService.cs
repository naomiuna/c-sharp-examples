using Mav.Common.Models;
using Mav.Models.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mav.Services.Identity.Services
{
    public interface IUserService
    {
        Task<T> GetUserById<T>(string id);

        Task<ExamUserViewModel> GetExamUserById(string id);

        Task<IList<string>> GetUserRoles(string id);

        Task<GenericResult<T>> CreateUser<T>(AddUserViewModel vm);

        Task<GenericResult<T>> CreateExamInvigilator<T>(AddInvigilatorViewModel vm);
        Task<GenericResult<T>> CreateSLT<T>(AddSLTViewModel vm);

        Task<GenericResult<T>> CreateExamOfficer<T>(AddInvigilatorViewModel vm);

        Task<GenericResult<T>> UpdateUser<T>(UserViewModel vm);

        Task<GenericResult<T>> DeleteUser<T>(string id);

        Task<string> GetRoleIDByRole(string role);
        Task<string> GetRoleNameByRole(string roleId);

    }
}
