namespace Mav.Common.Models
{
    public class EmailConfigModel
    {
        public string SenderEmailAddress { get; set; }
        public string SupportRcptEmailAddress { get; set; }
        public string SiteName { get; set; }
        public string SiteUrl { get; set; }
        public string AuthorityUrl { get; set; }
        public bool DebugMode { get; set; }
    }

    public class EmailParam
    {
        public EmailParam(string key, string value)
        {
            Key = key;
            Value = value;
        }

        public string Key { get; set; }
        public string Value { get; set; }
    }
}
