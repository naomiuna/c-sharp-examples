namespace Mav.Common.Services
{
    public class PasswordValidatorService : IPasswordValidatorService
    {
        public bool IsValid(string entry)
        {
            if (string.IsNullOrEmpty(entry))
            {
                return false;
            }

            if (entry.Length < 8 || entry.Length > 30)
            {
                return false;
            }

            if (entry.Contains("\""))
            {
                return false;
            }

            var charsetCount = 0;

            if (ValidationPatterns.ContainsAtLeastOneLowerCaseRegex.IsMatch(entry)) { charsetCount++; }
            if (ValidationPatterns.ContainsAtLeastOneUpperCaseRegex.IsMatch(entry)) { charsetCount++; }
            if (ValidationPatterns.ContainsAtLeastOneNumeralRegex.IsMatch(entry)) { charsetCount++; }
            //remove requirement for special characters
            // if (ValidationPatterns.ContainsAtLeastOneNonAlphaNumericRegex.IsMatch(entry)) { charsetCount++; }

            return charsetCount >= 3;
        }
    }
}
