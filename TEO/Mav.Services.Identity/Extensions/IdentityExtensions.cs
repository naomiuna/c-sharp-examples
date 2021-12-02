using Microsoft.AspNetCore.Http;
using IdentityModel.Client;
using System.Linq;
using System.Threading.Tasks;

namespace Mav.Services.Identity.Extensions
{
    public static class IdentityExtensions
    {
        public async static Task<ConnectPrincipal> GetConnectPrincipalAsync(this HttpContext httpContext, string userInfoUri)
        {
            var accessToken = httpContext.GetAccessToken();
            var userInfo = await accessToken.GetUserInfoAsync(userInfoUri);
            var connect = new ConnectPrincipal(userInfo.Claims);
            return connect;
        }

        public static string GetAccessToken(this HttpContext httpContext)
        {
            var accessToken = httpContext.Request.Headers.FirstOrDefault(x => x.Key.Equals("Authorization"));
            if (accessToken.Key == null) { return null; }

            var r = accessToken.Value.ToString().Remove(0, "Bearer ".Length);
            return r;
        }

        public async static Task<UserInfoResponse> GetUserInfoAsync(this string accessToken, string infoEndpoint)
        {
            var userInfoClient = new UserInfoClient(infoEndpoint);
            var r = await userInfoClient.GetAsync(accessToken);
            return r;
        }

        public static string GetUserClaimValue(this UserInfoResponse userInfo, string claimType)
        {
            var claims = userInfo.Claims;
            if (!claims.Any(x => x.Type == claimType)) { return null; }

            var claim = claims.FirstOrDefault(x => x.Type == claimType);
            return claim.Value;
        }
    }
}
