using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace Mav.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/{version:apiVersion}/[controller]")]
    [ApiController]
    public class AssessmentController : ApiControllerBase
    {
        private readonly IAssessmentService AssessmentService;
        private readonly IAssessmentYearService AssessmentYearService;
        private readonly ISectionService SectionService;
        private readonly ISettingsService SettingsService;

        public AssessmentController(
            IConfiguration configuration,
            IAssessmentService assessmentService,
            IAssessmentYearService assessmentYearService,
            ISectionService sectionService,
            ISettingsService settingsService
        ) : base(configuration)
        {
            AssessmentService = assessmentService;
            AssessmentYearService = assessmentYearService;
            SectionService = sectionService;
            SettingsService = settingsService;
        }

        // GET api/1.0/Assessment/GetAssessmentById/{id}
        [HttpGet("GetAssessmentById/{id}", Name = "GetAssessmentByIdRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer,SLT")]
        public async Task<IActionResult> GetAssessmentById(int id)
        {
            return await TryActionAsync(async () => await AssessmentService.GetAssessmentById<UpdateAssessmentViewModel>(id));
        }

        //POST api/1.0/Assessment/GetAllAssessments
        [HttpPost("GetAllAssessments", Name = "GetAllAssessmentsRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetAllAssessments(AssessmentSearchModel vm)
        {
            return await TryActionAsync(async () => await AssessmentService.GetAllAssessments(vm));
        }

        //POST api/1.0/Assessment/CreateAssessment
        [HttpPost("CreateAssessment", Name = "CreateAssessmentRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateAssessment(AddAssessmentViewModel m)
        {
            return await TryActionAsync(async () => await AssessmentService.AddAssessment<int>(m));
        }

        //POST api/1.0/Assessment/CreateEoAssessment
        [HttpPost("CreateEoAssessment", Name = "CreateEoAssessmentRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateEoAssessment(AddAssessmentEoViewModel m)
        {
            return await TryActionAsync(async () => await AssessmentService.AddAssessment<int>(m));
        }

        //PUT api/1.0/Assessment/UpdateAssessment
        [HttpPut("UpdateAssessment", Name = "UpdateAssessmentRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateAssessment(UpdateAssessmentViewModel m)
        {
            return await TryActionAsync(async () => await AssessmentService.Update<int>(m));
        }

        // POST api/1.0/Assessment/DeleteAssessment/{id}
        [HttpPost("DeleteAssessment/{id}", Name = "DeleteAssessmentRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteAssessment([FromRoute] int id)
        {
            return await TryActionAsync(async () => await AssessmentService.Delete<int>(id));
        }

        // GET api/1.0/Assessment/GetAssessmentRoles
        [HttpGet("GetAssessmentRoleList", Name = "GetAssessmentRolesRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetAssessmentRoleList()
        {
            return await TryActionAsync(async () => await AssessmentService.GetAssessmentRoles<AssessmentRoleViewModel>());
        }

        // GET api/1.0/Assessment/IsEOQualification
        [HttpGet("IsEOQualification/{id}", Name = "IsEOQualificationRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> IsEOQualification(int id)
        {
            return await TryActionAsync(async () => await AssessmentService.IsEOQualification(id));
        }

        // POST api/1.0/Assessment/DuplicateAssessment
        [HttpPost("DuplicateAssessment", Name = "DuplicateAssessmentRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DuplicateAssessment(DuplicateAssessmentViewModel vm)
        {
            return await TryActionAsync(async () => await AssessmentService.DuplicateAssessment<int>(vm));
        }
    }
}