using Mav.Common.Models;
using Mav.Data.Repositories;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface IAssessmentService
    {
        Task<T> GetAssessmentById<T>(int id);

        Task<IPaginate<AssessmentListingModel>> GetAllAssessments(AssessmentSearchModel vm);

        Task<IEnumerable<T>> GetAllAssessmentsEnum<T>(AssessmentSearchModel vm);

        Task<GenericResult<T>> AddAssessment<T>(AddAssessmentViewModel m);

        Task<GenericResult<T>> AddAssessment<T>(AddAssessmentEoViewModel m);

        Task<GenericResult<T>> Update<T>(UpdateAssessmentViewModel m);

        Task<GenericResult<T>> Delete<T>(int id);

        Task<List<T>> GetAssessmentRoles<T>();

        Task<bool> IsEOQualification(int id);

        Task<GenericResult<T>> DuplicateAssessment<T>(DuplicateAssessmentViewModel vm);
    }
}
