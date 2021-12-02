using System.Collections.Generic;

namespace Mav.IDP
{
    #region Clients

    public class ClientsAppSettings
    {
        public ClientSettings Clients { get; set; }
    }

    public class ClientSettings
    {
        public JsOidcSettings JsOidc { get; set; }
        public JsOidcSettings ExamOffice { get; set; }
        public JsOidcSettings ExamOfficePortal { get; set; }
    }

    public class JsOidcSettings
    {
        public string ClientId { get; set; }
        public string ClientName { get; set; }
        public string[] RedirectUris { get; set; }
        public string PostLogoutRedirectUris { get; set; }
        public string AllowedCorsOrigins { get; set; }
    }

    #endregion Clients

    #region Roles

    public class SystemRoles
    {
        public string Client { get; set; }
        public string[] Roles { get; set; }
    }

    #endregion Roles

    #region Mav API

    public class MavApiSettings
    {
        public string BaseUrl { get; set; }
    }

    #endregion Mav API
}
