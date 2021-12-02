using System;
using System.Threading.Tasks;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using Mav.Services.Identity.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Mav.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/{version:apiVersion}/[controller]")]
    [ApiController]
    public class CertificateController : ApiControllerBase
    {
        private readonly IUserAssessmentService UserAssessmentService;
        private readonly IUserAssessmentSectionService UserAssessmentSectionService;
        private readonly IAssessmentYearService AssessmentYearService;
        private readonly IAssessmentService AssessmentService;
        private readonly ICentreService CentreService;
        private readonly IUserService UserService;

        public CertificateController(
            IConfiguration configuration,
            IUserAssessmentService userAssessmentService,
            IUserAssessmentSectionService userAssessmentSectionService,
            IAssessmentYearService assessmentYearService,
            ICentreService centreService,
            IUserService userService,
            IAssessmentService assessmentService
        ) : base(configuration)
        {
            UserAssessmentService = userAssessmentService;
            UserAssessmentSectionService = userAssessmentSectionService;
            AssessmentYearService = assessmentYearService;
            CentreService = centreService;
            UserService = userService;
            AssessmentService = assessmentService;
        }

        // GET api/1.0/Certificate/GetCertificate/{id}/{key}
        [HttpGet("GetCertificate/{id}/{key}", Name = "GetCertificateRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer")]
        public async Task<IActionResult> GetCertificate(int id, Guid key)
        {
            var vm = await UserAssessmentService.GetById<CertificateViewModel>(id);

            if (vm.KeyID != key)
            {
                return BadRequest();
            }

            var totalsModel = await UserAssessmentSectionService.GetUserAssessmentSectionTotals(id);
            var yearModel = await AssessmentYearService.GetByYear<AssessmentYearViewModel>(vm.YearID);
            var centreModel = await CentreService.GetCentreByUserIdAsync(vm.UserID);
            var userModel = await UserService.GetUserById<InvigilatorViewModel>(vm.UserID);

            var sectionFilter = new UserAssessmentSectionSearchModel {
                PageNo = 1,
                PageSize = 1000,
                UserAssessmentID = id
            };
            var sectionsList = await UserAssessmentSectionService.GetListByUserId(sectionFilter);

            // Get assessment grades for assessment
            var assessmentGrade = await UserAssessmentService.GetById<AssessmentGradeViewModel>(id);

            vm.TotalScore = totalsModel.TotalScore;
            vm.MaxScore = totalsModel.MaxScore;
            vm.YearDisplay = yearModel.Display;
            vm.CentreName = centreModel.Name;
            vm.UserName = $"{userModel.FirstName} {userModel.Surname}";
            vm.Sections = sectionsList.Items;

            // Covert score to percentage
            int scoreAsPct = 0;
            if(vm.MaxScore != 0)
            {
                scoreAsPct = Convert.ToInt32(Math.Round(decimal.Divide(vm.TotalScore, vm.MaxScore) * 100));
            }
            else
            {
                scoreAsPct = 0;
            }

            // Apply grade - maybe change to simplified if statement
            if(scoreAsPct >= assessmentGrade.PassScore)
            {
                if (scoreAsPct >= assessmentGrade.PassScore && scoreAsPct < assessmentGrade.MeritScore)
                {
                    vm.Grade = "Pass";
                }
                if (scoreAsPct >= assessmentGrade.MeritScore && scoreAsPct < assessmentGrade.DistinctionScore)
                {
                    vm.Grade = "Merit";
                }
                if (scoreAsPct >= assessmentGrade.DistinctionScore)
                {
                    vm.Grade = "Distinction";
                }
            }
            else
            {
                vm.Grade = "Fail";
            }

            return Ok(vm);
        }
    }
}