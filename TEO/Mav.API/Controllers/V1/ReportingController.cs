using Mav.Models.ReportModels;
using Mav.Models.SearchModels;
using Mav.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Mav.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/{version:apiVersion}/[controller]")]
    [ApiController]
    [EnableCors("default")]
    public class ReportingController : ApiControllerBase
    {
        private readonly IReportingService ReportingService;

        public ReportingController(
            IConfiguration configuration,
            IReportingService reportingService
        ) : base(configuration)
        {
            ReportingService = reportingService;
        }

        // POST api/1.0/Reporting/GetAssessmentSectionReport
        [HttpPost("GetAssessmentSectionReport", Name = "GetAssessmentSectionReportRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetAssessmentSectionReport(AssessmentSectionSearchModel vm)
        {
            return await TryActionAsync(async () => await ReportingService.GetAssessmentSectionReport(vm));
        }

        // POST api/1.0/Reporting/GetSectionReport
        [HttpPost("GetSectionReport", Name = "GetSectionReportRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetSectionReport(SectionSearchModel vm)
        {
            return await TryActionAsync(async () => await ReportingService.GetSectionReport(vm));
        }

        // POST api/1.0/Reporting/GetCentreReport
        [HttpPost("GetCentreReport", Name = "GetCentreReportRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetCentreReport(CentreSearchModel vm)
        {
            return await TryActionAsync(async () => await ReportingService.GetCentreReport(vm));
        }

        [HttpPost("GetCentreReportsCsvAll", Name = "GetCentreReportsCsvAll")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetCentreReportsCsvAll(CentreSearchModel vm)
        {
            return await TryActionAsync(async () => await ReportingService.ExportCentreReports(vm));
        }

        [HttpPost("GetAssessmentReportsCsvAll", Name = "GetAssessmentReportsCsvAll")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetAssessmentReportsCsvAll(AssessmentSearchModel vm)
        {
            return await TryActionAsync(async () => await ReportingService.ExportAssessmentReports(vm));
        }

        [HttpPost("GetAssessmentSectionReportsCsvAll", Name = "GetAssessmentSectionReportsCsvAll")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetAssessmentSectionReportsCsvAll(AssessmentSectionSearchModel vm)
        {
            return await TryActionAsync(async () => await ReportingService.ExportAssessmentSectionReports(vm));
        }

        [HttpPost("GetSectionReportsCsvAll", Name = "GetSectionReportsCsvAll")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetSectionReportsCsvAll(SectionSearchModel vm)
        {
            return await TryActionAsync(async () => await ReportingService.ExportSectionReports(vm));
        }
    }
}