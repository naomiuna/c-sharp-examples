using System.Text.RegularExpressions;

namespace Mav.Common
{
    public static class ValidationPatterns
    {
        public static readonly Regex ContainsAtLeastOneLowerCaseRegex = new Regex("[a-z]", RegexOptions.Compiled);
        public static readonly Regex ContainsAtLeastOneUpperCaseRegex = new Regex("[A-Z]", RegexOptions.Compiled);
        public static readonly Regex ContainsAtLeastOneNumeralRegex = new Regex("[0-9]", RegexOptions.Compiled);
        public static readonly Regex ContainsAtLeastOneNonAlphaNumericRegex = new Regex("[^a-zA-Z0-9]", RegexOptions.Compiled);
        public static readonly Regex ContainsEmail = new Regex(@"^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$", RegexOptions.Compiled);
        public static readonly Regex ContainsName = new Regex(@"^[a-zA-Z-'\s]+$", RegexOptions.Compiled);
        public static readonly Regex EmailAddressRegex = new Regex(@"^[\S]+@[\S]+(?:\.[\S]+)+$", RegexOptions.Compiled);
    }
}
