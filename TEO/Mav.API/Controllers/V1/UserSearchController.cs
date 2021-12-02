using Mav.Services.Identity.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Mav.Models.SearchModels;
using Mav.Services.Abstract;
using Mav.Common.Models;
using System.Collections.Generic;

namespace Mav.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/{version:apiVersion}/[controller]")]
    [ApiController]
    public class UserSearchController : ApiControllerBase
    {
        private readonly IUserSearchService UserSearchService;
        private readonly IUserAssessmentService UserAssessmentService;
        private readonly ICentreService CentreService;

        public UserSearchController(
            IConfiguration configuration,
            IUserSearchService userSearchService,
            IUserAssessmentService userAssessmentService,
            ICentreService centreService
        ) : base(configuration)
        {
            UserSearchService = userSearchService;
            UserAssessmentService = userAssessmentService;
            CentreService = centreService;
        }

        // POST api/1.0/UserSearch/GetInvigilatorSearch
        [HttpPost("GetInvigilatorSearch", Name = "GetInvigilatorSearchRoute")]
        [Authorize(Roles = "Administrator,ExamOfficer")]
        public async Task<IActionResult> GetInvigilatorSearch(UserSearchModel vm)
        {
            var principal = await GetCurrentUserAsync();

            if (string.IsNullOrEmpty(principal?.UserID))
            {
                return BadRequest();
            }
            vm.CreatorID = principal.UserID;

            if (!vm.CentreID.HasValue) {
                var centreLookup = await CentreService.GetUserCentreAsync(principal.UserID);
                if (centreLookup.Status != EnumStatusCode.Ok) {
                    return BadRequest();
                }
                vm.CentreID = centreLookup.KeyID;
            }

            var userSet = await UserSearchService.GetUserSearch<InvigilatorListingModel>(vm, EnumRoleType.ExamInvigilator);

            foreach (var user in userSet.Items)
            {
                var assessment = await UserAssessmentService.GetUserLatestAssessment(user.Id);
                user.LatestAssessment = assessment;
            }

            return Ok(userSet);
        }

        // POST api/1.0/UserSearch/GetSLTSearch
        [HttpPost("GetSLTSearch", Name = "GetSLTSearchRoute")]
        [Authorize(Roles = "Administrator,ExamOfficer")]
        public async Task<IActionResult> GetSLTSearch(UserSearchModel vm)
        {
            var principal = await GetCurrentUserAsync();

            if (string.IsNullOrEmpty(principal?.UserID))
            {
                return BadRequest();
            }
            vm.CreatorID = principal.UserID;

            if (!vm.CentreID.HasValue)
            {
                var centreLookup = await CentreService.GetUserCentreAsync(principal.UserID);
                if (centreLookup.Status != EnumStatusCode.Ok)
                {
                    return BadRequest();
                }
                vm.CentreID = centreLookup.KeyID;
            }

            var userSet = await UserSearchService.GetUserSearch<SLTListingModel>(vm, EnumRoleType.SLT);

            foreach (var user in userSet.Items)
            {
                var assessment = await UserAssessmentService.GetUserLatestAssessment(user.Id);
                user.LatestAssessment = assessment;
            }

            return Ok(userSet);
        }

        // POST api/1.0/UserSearch/GetOfficerSearch
        [HttpPost("GetOfficerSearch", Name = "GetOfficerSearchRoute")]
        [Authorize(Roles = "Administrator,ExamOfficer")]
        public async Task<IActionResult> GetOfficerSearch(UserSearchModel vm)
        {
            var principal = await GetCurrentUserAsync();

            if (string.IsNullOrEmpty(principal?.UserID))
            {
                return BadRequest();
            }
            vm.CreatorID = principal.UserID;

            if (!vm.CentreID.HasValue || vm.CentreID == 0)
            {
                var centreLookup = await CentreService.GetUserCentreAsync(principal.UserID);
                if (centreLookup.Status != EnumStatusCode.Ok)
                {
                    return BadRequest();
                }
                vm.CentreID = centreLookup.KeyID;
            }

            return await TryActionAsync(async () => await UserSearchService.GetUserSearch<UserListingModel>(vm, EnumRoleType.ExamOfficer));
        }

        // POST api/1.0/UserSearch/GetAdminUserSearch
        [HttpPost("GetAdminUserSearch", Name = "GetAdminUserSearchRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetAdminUserSearch(UserSearchModel vm)
        {
            var principal = await GetCurrentUserAsync();

            if (string.IsNullOrEmpty(principal?.UserID))
            {
                return BadRequest();
            }
            vm.CreatorID = principal.UserID;

            var allowableRoles = new List<EnumRoleType>() { EnumRoleType.Administrator, EnumRoleType.Editor };
            if (vm.Role == "Administrator") { allowableRoles.RemoveAt(1); }
            if (vm.Role == "Editor") { allowableRoles.RemoveAt(0); }

            return await TryActionAsync(async () => await UserSearchService.GetUserSearch<UserListingModel>(vm, allowableRoles));
        }
    }
}