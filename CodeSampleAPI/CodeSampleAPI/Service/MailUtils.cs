using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;

namespace CodeSampleAPI.Service
{
    public class MailUtils
    {
        public static async Task<string> SendGMail(string from, string to, string subject, string body)
        {
            MailMessage message = new MailMessage(from, to, subject, body);
            message.BodyEncoding = System.Text.Encoding.UTF8;
            message.SubjectEncoding = System.Text.Encoding.UTF8;
            message.IsBodyHtml = true;

            message.ReplyToList.Add(new MailAddress(from));
            message.Sender = new MailAddress(to);

            using var smtpClient = new SmtpClient("smtp.gmail.com");
            smtpClient.Port = 587;
            smtpClient.EnableSsl = true;
            smtpClient.Credentials = new NetworkCredential("phanvuloi001@gmail.com", "yvobiuwmxevvxnqy");


            try
            {
                await smtpClient.SendMailAsync(message);
                return "Đã gửi mail cho" + " " + to;
            }catch(Exception ex)
            {
                return "Gưi mail không thành công \n" + ex;
            }

        }
    }
}
