using Mav.Common.Models;
using System.Threading.Tasks;

namespace Mav.IDP.Services
{
    public interface IPageContentService
    {
        Task<MessageBase<T>> GetPublicPageContent<T>(int id, string apiUrl);
    }
}
