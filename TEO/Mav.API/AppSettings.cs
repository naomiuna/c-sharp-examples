namespace Mav.API
{
    public class AuthAppSettings
    {
        public AuthoritySettings Authority { get; set; }

        public AllowableAccessSettings AllowableAccess { get; set; }
    }

    public class AuthoritySettings
    {
        public string Host { get; set; }
    }

    public class AllowableAccessSettings
    {
        public string[] Hosts { get; set; }
    }

    public class TinySettings
    {
        public string ImagesCdnPath { get; set; }

        public string ImagesCdnFolder { get; set; }
    }
}
