using Mav.Common.Models;
using Mav.Data.Repositories;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface IUserAssessmentSectionService
    {
        Task<T> GetById<T>(int id);

        Task<List<AssignQuestionItem>> GetUserAssessmentSectionQuestions(int id);

        Task<IPaginate<UserAssessmentSectionListingModel>> GetListByUserId(UserAssessmentSectionSearchModel vm);

        Task<AssessmentSectionTotals> GetUserAssessmentSectionTotals(int id);

        Task<List<AssessmentSectionSummary>> GetSectionSummaryDetails(int id);

        Task<int> GetRecentScore(int id);

        Task<ExamSectionStepViewModel> LookupNextSectionStep(int id);

        Task<GenericResult<T>> Add<T>(AddUserAssessmentSectionViewModel vm);

        Task<GenericResult<T>> Restart<T>(int id);

        Task<GenericResult<T>> Update<T>(UpdateUserAssessmentSectionViewModel vm);

        Task<GenericResult<T>> Submit<T>(SubmitUserAssessmentSectionViewModel vm);

        Task<AssignSectionQuestionsViewModel> AssignSectionQuestions(int sectionID);

        Task<GenericResult<T>> UpdateUserSectionStats<T>(UpdateUserSectionStatsViewModel vm);
    }
}
