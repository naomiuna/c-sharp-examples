using Mav.Models.PageModels;
using Mav.Models.SearchModels;
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
    public class PageController : ApiControllerBase
    {
        private readonly IPageService PageService;

        public PageController(
            IConfiguration configuration,
            IPageService pageService
        ) : base(configuration)
        {
            PageService = pageService;
        }
        
        // GET api/1.0/Page/GetPageById/{id}
        [HttpGet("GetPageById/{id}", Name = "GetPageByIdRoute")]
        [Authorize]
        public async Task<IActionResult> GetPageById(int id)
        {
            return await TryActionAsync(async () => await PageService.GetPageById<PageViewModel>(id));
        }

        // GET api/1.0/Page/GetPublicPageById/{id}
        [HttpGet("GetPublicPageById/{id}", Name = "GetPublicPageByIdRoute")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPublicPageById(int id)
        {
            return await TryActionAsync(async () => await PageService.GetPublicPageById<PublicPageViewModel>(id));
        }

        // POST api/1.0/Page/GetPageList
        [HttpPost("GetPageList", Name = "GetPageListRoute")]
        [Authorize]
        public async Task<IActionResult> GetPageList(PageFilterModel filter)
        {
            return await TryActionAsync(async () => await PageService.GetPageList<PageListingViewModel>(filter));
        }

        //PUT api/1.0/Page/UpdatePage
        [HttpPut("UpdatePage", Name = "UpdatePageRoute")]
        [Authorize(Roles = "Administrator,Editor")]
        public async Task<IActionResult> UpdatePage(PageViewModel m)
        {
            return await TryActionAsync(async () => await PageService.UpdatePage<int>(m));
        }
    }
}