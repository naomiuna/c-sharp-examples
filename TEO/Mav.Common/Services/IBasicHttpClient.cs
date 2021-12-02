using System.Net.Http;
using System.Threading.Tasks;

namespace Mav.Common.Services
{
    public interface IBasicHttpClient
    {
        Task<HttpClient> GetClient(bool authRequired);
    }
}
