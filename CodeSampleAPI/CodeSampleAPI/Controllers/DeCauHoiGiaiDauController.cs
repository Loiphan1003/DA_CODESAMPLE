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
    public class DeCauHoiGiaiDauController : ControllerBase
    {
        private readonly IDeCauHoiGiaiDauService _deCauHoiGiaiDauService;
        public DeCauHoiGiaiDauController(IDeCauHoiGiaiDauService deCauHoiGiaiDauService)
        {
            this._deCauHoiGiaiDauService = deCauHoiGiaiDauService;
        }

        [HttpPost]
        public IActionResult addDeCauHoiGiaiDau([FromBody] DeCauHoiGiaiDau_Custom deCauHoiGiaiDau_Custom)
        {
            return Ok(_deCauHoiGiaiDauService.addDeCauHoiGiaiDau(deCauHoiGiaiDau_Custom));
        }

        [HttpGet("getListCauHoiGiaiDau")]
        public IActionResult getListCauHoiGiaiDau(string uID)
        {
            return Ok(_deCauHoiGiaiDauService.getListCauHoiGiaiDau(uID));
        }

        [HttpGet("getDeCauHoiGiaiDauByID")]
        public IActionResult getDeCauHoiGiaiDauByID(int id)
        {
            return Ok(_deCauHoiGiaiDauService.getDeCauHoiGiaiDauByID(id));
        }

        [HttpGet("getIdDeCauHoiGiaiDauByID")]
        public IActionResult getIdDeCauHoiGiaiDauByID(int id)
        {
            return Ok(_deCauHoiGiaiDauService.getIdDeCauHoiGiaiDauByID(id));
        }

        [HttpGet("getGiauDauByIdDeThi")]
        public IActionResult getGiauDauByIdDeThi(int id)
        {
            return Ok(_deCauHoiGiaiDauService.getGiauDauByIdDeThi(id));
        }

        [HttpGet("countSlCau")]
        public IActionResult countSlCau(int id)
        {
            return Ok(_deCauHoiGiaiDauService.countSlCau(id));
        }
    }
}
