using System;
using System.Security.Claims;
using IdentityModel;
using Mav.Common;
using System.Collections.Generic;
using System.Linq;

namespace Mav.Services.Identity
{
    public class ConnectPrincipal
    {
        public IEnumerable<Claim> Claims { get; set; }

        public ConnectPrincipal(IEnumerable<Claim> claims) {
            Claims = claims;
        }

        public string UserID => GetStringClaimValue(SystemConstants.IdentityKey);

        public string FirstName => GetStringClaimValue(JwtClaimTypes.GivenName);

        public string Surname => GetStringClaimValue(JwtClaimTypes.FamilyName);

        public string Email => GetStringClaimValue(JwtClaimTypes.Email);

        #region Private Helper Methods

        protected Claim FindFirst(string claimType)
        {
            if (Claims == null || !Claims.Any(x => x.Type == claimType)) { return null; }
            var claim = Claims.FirstOrDefault(x => x.Type == claimType);
            return claim;
        }

        /// <summary>
        /// Returns a System.Guid claim value
        /// </summary>
        /// <param name="claimType">A single claim type string value</param>
        /// <returns>A single System.Guid value</returns>
        protected Guid GetGuidClaimValue(string claimType)
        {
            var claim = FindFirst(claimType);
            if (claim == null) { return default(Guid); }
            Guid value;
            return Guid.TryParse(claim.Value, out value) ? value : default(Guid);
        }

        /// <summary>
        /// Returns an int claim value
        /// </summary>
        /// <param name="claimType">A single claim type string value</param>
        /// <returns>A single int value</returns>
        protected int GetIntClaimValue(string claimType)
        {
            var claim = FindFirst(claimType);
            if (claim == null) { return default(int); }
            int value;
            return int.TryParse(claim.Value, out value) ? value : default(int);
        }

        /// <summary>
        /// Returns a decimal claim value
        /// </summary>
        /// <param name="claimType">A single claim type string value</param>
        /// <returns>A single decimal value</returns>
        protected decimal GetDecimalClaimValue(string claimType)
        {
            var claim = FindFirst(claimType);
            if (claim == null) { return default(decimal); }
            decimal value;
            return decimal.TryParse(claim.Value, out value) ? value : default(decimal);
        }

        /// <summary>
        /// Returns a boolean claim value
        /// </summary>
        /// <param name="claimType">A single claim type string value</param>
        /// <returns>A single boolean value</returns>
        protected bool GetBoolClaimValue(string claimType)
        {
            var claim = FindFirst(claimType);
            if (claim == null) { return default(bool); }
            bool value;
            return bool.TryParse(claim.Value, out value) && value;
        }

        /// <summary>
        /// Returns a string claim value
        /// </summary>
        /// <param name="claimType">A single claim type string value</param>
        /// <returns>A single string value</returns>
        protected string GetStringClaimValue(string claimType)
        {
            var claim = FindFirst(claimType);
            if (claim == null) { return default(string); }
            return !string.IsNullOrWhiteSpace(claim.Value) ? claim.Value : default(string);
        }

        #endregion Private Helper Methods
    }
}
