using Mav.Common.Models;
using Mav.Data.Repositories;
using Mav.Models.PageModels;
using Mav.Models.SearchModels;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface IPageService
    {
        Task<T> GetPageById<T>(int id);

        Task<T> GetPublicPageById<T>(int id);

        Task<IPaginate<T>> GetPageList<T>(PageFilterModel filter);

        Task<GenericResult<T>> UpdatePage<T>(PageViewModel m);
    }
}
