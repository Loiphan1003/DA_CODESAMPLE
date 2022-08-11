using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeSampleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        [HttpPost("SendGmail")]
        public async Task<IActionResult> sendGmailAsync()
        {
            string[] userGmails = { "phanvuloi001@gmail.com", "phanvuloi.it@gmail.com", "phanvuloi1003@gmail.com" };

            foreach(string mail in userGmails)
            {
                await Service.MailUtils.SendGMail("phanvuloi001@gmail.com", mail , "Test sendMail", "Đây là test vui lòng không trả lời");
            }

            return Ok();
        }
    }
}
