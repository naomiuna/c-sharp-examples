using System;
using System.Threading.Tasks;
using System.Net.Http;
using Mav.Common.Services;
using Mav.Common.Models;
using Mav.Common;

namespace Mav.IDP.Services
{
    public class PageContentService : IPageContentService
    {
        private readonly IBasicHttpClient _basicHttpClient;

        public PageContentService(IBasicHttpClient basicHttpClient)
        {
            _basicHttpClient = basicHttpClient;
        }

        public async Task<MessageBase<T>> GetPublicPageContent<T>(int id, string apiUrl)
        {
            var httpClient = await _basicHttpClient.GetClient(false);
            httpClient.BaseAddress = new Uri(apiUrl);

            var response = await httpClient.GetAsync(
                SystemConstants.GetPublicPageById.Replace("{id}", $"{id}")
                ).ConfigureAwait(false);

            if (response.IsSuccessStatusCode)
            {
                return new MessageBase<T>
                {
                    StatusCode = response.StatusCode,
                    MessageBody = response.Content.ReadAsAsync<T>().Result
                };
            }

            return new MessageBase<T>
            {
                StatusCode = response.StatusCode,
                ResponseMessage = await response.Content.ReadAsStringAsync()
            };
        }
    }
}
