using CodeSampleAPI.Data;
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

        [HttpGet("getOne")]
        public IActionResult getOne(String uId)
        {
            return Ok(_taikhoanService.getOne(uId));
        }

        [HttpPost("updateInfo")]
        public IActionResult updateInfo(TaiKhoan taiKhoan )
        {
            return Ok(_taikhoanService.updateInfo(taiKhoan));
        }

        [HttpGet("getNameTK")]
        public IActionResult getNameTK(string uid)
        {
            return Ok(_taikhoanService.getNameTK(uid));
        }
        [HttpPost("TaoTaiKhoan")]
        public IActionResult taoTaoKhoan(TaiKhoan taikhoan)
        {
            return Ok(_taikhoanService.addTaiKhoan(taikhoan));
        }
    }
}
