using Mav.Models.ReportModels;
using Mav.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface IUserCentreService
    {
        Task<IEnumerable<T>> GetUserCentres<T>(int centreId);

        Task<int> GetUserCountForCentreById(int centreId);

        Task<List<UserAssessmentViewModel>> GetUserAssessmentCount(List<UserCentreViewModel> users);

        Task<List<UserAssessmentSectionViewModel>> GetUserScoreCount(List<UserAssessmentViewModel> userAssessments);
    }
}
