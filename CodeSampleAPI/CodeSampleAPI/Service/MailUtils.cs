using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace CodeSampleAPI.Service
{
    public class MailUtils
    {
        public static async Task<string> SendGMail(string from, string to, string subject, bool isExist, string idRoom)
        {
            string mailBody = "";

            string mailForUnregisteredAccount = String.Format(@"
            <html><body style='width: 100%;'>
                <center>
                    <table style='
                        width: 500px;
                        height: fit-content;
                        padding: 20px;
                        border-radius: 20px;
                        background: linear-gradient(to bottom right, #c9def4, #f5ccd4 ,#b8a4c9);'>
                        <td style ='text-align: center;' >
                            <p> Bạn đã được mời tham gia một phòng học! </p>
                            <p> Nhấn vào nút bên dưới để tham gia ngay vào lớp học </p>
                        </td>
                        <tr >
                            <td style ='padding: 0 25%; text-align: center;' >
                                <a href ='http://localhost:3000/confirm/{0}&{1}' style ='text-decoration: none;' >
                                    <p style = 'background-color: white; padding: 10px; width: 200px; border-radius: 10px;' > Tham gia </p>
                                </a>
                            </td>
                        </tr>
                        <tr style ='margin-top: 20px;' >
                            <td style ='text-align: center; margin-top: 10px;' >
                                <img src ='https://firebasestorage.googleapis.com/v0/b/first-web-91c0f.appspot.com/o/images%2Flogo_transparent.png?alt=media&token=006ec2dc-dd50-4217-90cb-9ec6f8b8ad15' alt ='logo' width = '120px' />
                            </td>
                        </tr>
                    </table>
                </center>
            </body></html>", EncodeTo64(to), EncodeTo64(idRoom));

            

            String mailForUserAlreadyExist = @"
            <html><body style='width: 100%;'>
                <center>
                    <table style='
                        width: 500px;
                        height: fit-content;
                        padding: 20px;
                        border-radius: 20px;
                        background: linear-gradient(to bottom right, #c9def4, #f5ccd4 ,#b8a4c9);'>
                        <td style ='text-align: center;' >
                            <p> Bạn đã được mời tham gia một phòng học! </p>
                            <p> Nhấn vào nút bên dưới để tham gia ngay vào lớp học </p>
                        </td>
                        <tr >
                            <td style ='padding: 0 25%; text-align: center;' >
                                <a href ='http://localhost:3000' style ='text-decoration: none;' >
                                    <p style = 'background-color: white; padding: 10px; width: 200px; border-radius: 10px;' > Tham gia </p>
                                </a>
                            </td>
                        </tr>
                        <tr style ='margin-top: 20px;' >
                            <td style ='text-align: center; margin-top: 10px;' >
                                <img src ='https://firebasestorage.googleapis.com/v0/b/first-web-91c0f.appspot.com/o/images%2Flogo_transparent.png?alt=media&token=006ec2dc-dd50-4217-90cb-9ec6f8b8ad15' alt ='logo' width = '120px' />
                            </td>
                        </tr>
                    </table>
                </center>
            </body></html>";

            if (isExist == true)
            {
                mailBody = mailForUserAlreadyExist;
            }
            else
            {
                mailBody = mailForUnregisteredAccount;
            }

            MailMessage message = new MailMessage(from, to, subject, mailBody);
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
                return "true";
            }catch(Exception ex)
            {
                return "Gưi mail không thành công \n" + ex;
            }
        }

        public static string EncodeTo64(string toEncode)
        {
            byte[] toEncodeAsBytes = Encoding.ASCII.GetBytes(toEncode);
            return Convert.ToBase64String(toEncodeAsBytes);
        }
    }
}
