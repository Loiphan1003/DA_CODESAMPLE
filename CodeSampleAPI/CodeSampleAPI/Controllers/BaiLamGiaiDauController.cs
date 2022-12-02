using CodeSampleAPI.Model;
using CodeSampleAPI.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeSampleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaiLamGiaiDauController : ControllerBase
    {
        private readonly IBaiLamGiaiDauService _baiLamGiaiDauService;
        public BaiLamGiaiDauController(IBaiLamGiaiDauService baiLamGiaiDauService)
        {
            this._baiLamGiaiDauService = baiLamGiaiDauService;
        }

        [HttpPost]
        public IActionResult addBaiLamGiaiDau(BaiLamKiemTraCustom baiLamKiemTraCustom)
        {
            return Ok(_baiLamGiaiDauService.add(baiLamKiemTraCustom));
        }

        [HttpGet("getAll")]
        public IActionResult getAll(int id)
        {
            return Ok(_baiLamGiaiDauService.getAll(id));
        }

        [HttpGet("getThongKe")]
        public IActionResult getThongKe(string uid)
        {
            return Ok(_baiLamGiaiDauService.getThongKe(uid));
        }
    }
}
