using System;
using System.IO;
using System.Net.Mail;
using Mav.Common.Models;

namespace Mav.Common.Services
{
    public class EmailService
    {
        public static bool SendEmail(EmailConfigModel config, string recipient, string cc_recipient, string contentTemplate, string subject, Attachment[] attachments = null, params EmailParam[] codeFields)
        {
            return SendEmail(config, new[] { recipient }, new[] { cc_recipient }, contentTemplate, subject, attachments, codeFields);
        }

        public static bool SendEmail(EmailConfigModel config, string recipient, string cc_recipient, string contentTemplate, string subject, Attachment attachment = null, params EmailParam[] codeFields)
        {
            return SendEmail(config, new[] { recipient }, new[] { cc_recipient }, contentTemplate, subject, attachment != null ? new[] { attachment } : null, codeFields);
        }

        public static bool SendEmail(EmailConfigModel config, string recipient, string cc_recipient, string contentTemplate, string subject, params EmailParam[] codeFields)
        {
            return SendEmail(config, new[] { recipient }, new[] { cc_recipient }, contentTemplate, subject, null, codeFields);
        }

        public static bool SendEmail(EmailConfigModel config, string[] recipients, string[] cc_recipients, string contentTemplate, string subject, Attachment[] attachments = null, params EmailParam[] codeFields)
        {
            var content = GetTemplate(contentTemplate);

            foreach (var codeField in codeFields)
            {
                content = content.Replace(codeField.Key, codeField.Value);
            }

            var template = GetBasicEmail(config, content);

            var message = new MailMessage();

            foreach (var recipient in recipients)
            {
                message.To.Add(recipient);
            }

            foreach (var cc in cc_recipients)
            {
                if (!string.IsNullOrEmpty(cc))
                {
                    message.CC.Add(cc);
                }
            }

            message.Subject = subject;
            message.From = new MailAddress(config.SenderEmailAddress);
            message.IsBodyHtml = true;
            message.Body = template;

            if (attachments != null)
            {
                foreach (var attachment in attachments)
                {
                    message.Attachments.Add(attachment);
                }
            }

            try
            {
                using (var client = new SmtpClient())
                {
                    if (config.DebugMode) {
                        client.DeliveryMethod = SmtpDeliveryMethod.SpecifiedPickupDirectory;
                        client.PickupDirectoryLocation = "C:\\temp\\emaildrop\\";
                    }
                    else
                    {
                        client.DeliveryMethod = SmtpDeliveryMethod.Network;
                        client.Host = "127.0.0.1";
                        client.UseDefaultCredentials = true;
                    }             

                    client.Send(message);
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static bool SendEmail(EmailConfigModel config, string to, string subject, string body, Attachment attachment = null)
        {
            var message = new MailMessage();
            message.From = new MailAddress(config.SenderEmailAddress);
            message.To.Add(to);
            message.Subject = subject;
            message.IsBodyHtml = true;
            message.Body = body;

            if (attachment != null)
            {
                message.Attachments.Add(attachment);
            }

            try
            {
                using (var client = new SmtpClient())
                {
                    if (config.DebugMode)
                    {
                        client.DeliveryMethod = SmtpDeliveryMethod.SpecifiedPickupDirectory;
                        client.PickupDirectoryLocation = "C:\\temp\\emaildrop\\";
                    }
                    else
                    {
                        client.DeliveryMethod = SmtpDeliveryMethod.Network;
                        client.Host = "127.0.0.1";
                        client.UseDefaultCredentials = true;
                    }

                    client.Send(message);
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }

        public static string GetBasicEmail(EmailConfigModel config, string content, string signoff = null, string footer = null)
        {
            var template = GetTemplate("Basic");

            template = template
                .Replace("[CONTENT]", content)
                .Replace("[BASE_URL]", config.SiteUrl)
                .Replace("[SITE_NAME]", config.SiteName)
                .Replace("[SIGNED]", signoff ?? GetTemplate("SignOff"))
                .Replace("[FOOTER]", footer ?? GetFooter());

            return template;
        }

        public static string GetFooter()
        {
            var rootPath = $"{AppDomain.CurrentDomain.BaseDirectory}\\Email\\Footer.html";

            var template = File.ReadAllText(rootPath);
            return template;
        }

        public static string GetTemplate(string templateName)
        {
            var rootPath = $"{AppDomain.CurrentDomain.BaseDirectory}\\Email\\{templateName}.html";

            var template = File.ReadAllText(rootPath);
            return template;
        }
    }    
}
