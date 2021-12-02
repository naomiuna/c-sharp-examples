using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace Mav.IDP
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Address(),
                new IdentityResources.Email(),
                new IdentityResource(
                    "roles",
                    "Your role(s)",
                     new List<string>() { "role" })
            };
        }

        // api-related resources (scopes)
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("mavapi", "Mav API",
                    new List<string>() { "role" } )
                    {
                         ApiSecrets = { new Secret("apisecret".Sha256()) }
                    }
            };
        }

        public static IEnumerable<Client> GetClients(ClientsAppSettings settings)
        {
            return new List<Client>()
            {
                new Client
                {
                    ClientId = "exams_office",
                    ClientName = "Exams Office",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false,

                    RedirectUris =           settings.Clients.ExamOffice.RedirectUris,
                    PostLogoutRedirectUris = { settings.Clients.ExamOffice.PostLogoutRedirectUris },
                    AllowedCorsOrigins =     { settings.Clients.ExamOffice.AllowedCorsOrigins },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Address,
                        IdentityServerConstants.StandardScopes.Email,
                        "roles",
                        "mavapi"
                    }
                },
                new Client
                {
                    ClientId = "exams_office_portal",
                    ClientName = "Exams Office Portal",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false,

                    RedirectUris =           settings.Clients.ExamOfficePortal.RedirectUris,
                    PostLogoutRedirectUris = { settings.Clients.ExamOfficePortal.PostLogoutRedirectUris },
                    AllowedCorsOrigins =     { settings.Clients.ExamOfficePortal.AllowedCorsOrigins },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Address,
                        IdentityServerConstants.StandardScopes.Email,
                        "roles",
                        "mavapi"
                    }
                },
                new Client
                {
                    ClientId = "js_oidc",
                    ClientName = "JavaScript OIDC Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false,

                    RedirectUris =           settings.Clients.JsOidc.RedirectUris,
                    PostLogoutRedirectUris = { settings.Clients.JsOidc.PostLogoutRedirectUris },
                    AllowedCorsOrigins =     { settings.Clients.JsOidc.AllowedCorsOrigins },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Address,
                        IdentityServerConstants.StandardScopes.Email,
                        "roles",
                        "mavapi"
                    }
                }
            };
        }
    }
}
