using Mav.Common.Models;
using Mav.Data.Repositories;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface IUserAssessmentService
    {
        Task<T> GetById<T>(int id);

        Task<IPaginate<UserAssessmentListingModel>> GetListByUserId(UserAssessmentSearchModel vm);

        Task<UserAssessmentListingModel> GetUserLatestAssessment(string id);

        Task<IPaginate<UserAssessmentListingModel>> GetUserHistory(UserAssessmentSearchModel vm);

        Task<GenericResult<T>> Add<T>(AddUserAssessmentViewModel vm);

        Task<GenericResult<T>> Update<T>(UpdateUserAssessmentViewModel vm);

        Task<GenericResult<T>> Submit<T>(SubmitUserAssessmentViewModel vm, InvigilatorViewModel userModel);

    }
}
