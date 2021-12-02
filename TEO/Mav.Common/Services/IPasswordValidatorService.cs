namespace Mav.Common.Services
{
    public interface IPasswordValidatorService
    {
        bool IsValid(string entry);
    }
}
