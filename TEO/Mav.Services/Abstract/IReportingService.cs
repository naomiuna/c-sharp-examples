using Mav.Models.ReportModels;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface IReportingService
    {
        Task<IEnumerable<AssessmentSectionReportModel>> GetAssessmentSectionReport(AssessmentSectionSearchModel vm);

        Task<IEnumerable<SectionReportModel>> GetSectionReport(SectionSearchModel vm);

        Task<CentreReportModel> GetCentreReport(CentreSearchModel vm);

        Task<IEnumerable<CentreReportModel>> GetCentreReportsAll(CentreSearchModel vm);

        Task<CsvModel> ExportCentreReports(CentreSearchModel vm);

        Task<CsvModel> ExportAssessmentReports(AssessmentSearchModel vm);

        Task<CsvModel> ExportAssessmentSectionReports(AssessmentSectionSearchModel vm);

        Task<CsvModel> ExportSectionReports(SectionSearchModel vm);
    }
}
