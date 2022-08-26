using CodeSampleAPI.Service;
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
    public class TaiKhoanController : ControllerBase
    {
        private readonly ITaiKhoanService _taikhoanService;
        public TaiKhoanController(ITaiKhoanService taikhoanService)
        {
            this._taikhoanService = taikhoanService;
        }
        [HttpGet("getAllTaiKhoan")]
        public IActionResult getAllTaiKhoan()
        {
            return Ok(_taikhoanService.getAllTaiKhoan());
        }
    }
}
