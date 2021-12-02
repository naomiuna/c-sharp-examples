namespace Mav.Common.Models
{
    public class GenericResult<T>
    {
        public T KeyID { get; set; }
        public EnumStatusCode Status { get; set; }
        public string Message { get; set; }
    }
}
