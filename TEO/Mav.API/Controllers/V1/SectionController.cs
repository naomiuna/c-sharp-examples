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
    public class SectionController : ApiControllerBase
    {
        private readonly ISectionService SectionService;

        public SectionController(
            IConfiguration configuration,
            ISectionService sectionService
        ) : base(configuration)
        {
            SectionService = sectionService;
        }


        // GET api/1.0/Section/GetSectionById/{id}
        [HttpGet("GetSectionById/{id}", Name = "GetSectionByIdRoute")]
        [Authorize(Roles = "Administrator,ExamInvigilator,ExamOfficer,SLT")]
        public async Task<IActionResult> GetSectionById(int id)
        {
            return await TryActionAsync(async () =>
            {
                var r1 = await SectionService.GetSectionById<UpdateSectionViewModel>(id);

                if (r1 != null)
                {
                    r1.SectionCount = await SectionService.GetSectionCount(r1.AssessmentID);
                }

                return r1;
            }
            ); 
        }

        
        //GET api/1.0/Section/GetSectionList/{id}
        [HttpGet("GetSectionList/{id}", Name = "GetSectionListRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetSectionList(int id)
        {
            return await TryActionAsync(async () => await SectionService.GetSectionList<SectionListingModel>(id));
        }
        
        //POST api/1.0/Section/GetSectionListPages
        [HttpPost("GetSectionListPages", Name = "GetSectionListPagesRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetSectionListPages(SectionSearchModel vm)
        {
            return await TryActionAsync(async () => await SectionService.GetSectionListPages<SectionListingModel>(vm));
        }

        //POST api/1.0/Section/CreateSection
        [HttpPost("CreateSection", Name = "CreateSectionRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateSection(AddSectionViewModel m)
        {
            return await TryActionAsync(async () => await SectionService.CreateSection<int>(m));
        }
        
        //PUT api/1.0/Section/UpdateSection
        [HttpPut("UpdateSection", Name = "UpdateSectiontRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateSection(UpdateSectionViewModel m)
        {
            return await TryActionAsync(async () => await SectionService.UpdateSection<int>(m));
        }

        
        // POST api/1.0/Section/DeleteSection/{id}
        [HttpPost("DeleteSection/{id}", Name = "DeleteSectionRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteSection([FromRoute] int id)
        {
            return await TryActionAsync(async () => await SectionService.DeleteSection<int>(id));
        }

    }
}