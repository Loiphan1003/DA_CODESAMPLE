using CodeSampleAPI.Data;
using CodeSampleAPI.Filter;
using CodeSampleAPI.Helpers;
using CodeSampleAPI.Model;
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
    public class MonHocController : ControllerBase
    {
        private readonly IMonHocService _monHocService;
        private readonly IUriService uriService;

        public MonHocController(IMonHocService monHocService, IUriService uriService)
        {
            this._monHocService = monHocService;
            this.uriService = uriService;
        }

        [HttpGet("getOne")]
        public IActionResult getMonHocByID(int id)
        {
            return Ok(_monHocService.getMonHocByID(id));
        }

        [HttpGet("getAll")]
        public IActionResult getAllMonHoc([FromQuery] PaginationFilter filter)
        {
            var route = Request.Path.Value;
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            var totalRecords = _monHocService.getSoLuongMonHoc();
            var pagedReponse = PaginationHelper.CreatePagedReponse<MonHoc>(_monHocService.getAllMonHoc(validFilter), validFilter, totalRecords, uriService, route);
            return Ok(pagedReponse);
        }
        [HttpPost("AddMonHoc")]
        public IActionResult AddMonHoc([FromBody] MonHoc_Custom mh)
        {
            return Ok(_monHocService.AddMonHoc(mh));
        }
        [HttpPut("EditMonHoc")]
        public IActionResult EditMonHoc([FromBody] MonHoc_Custom mh)
        {
            return Ok(_monHocService.EditMonHoc(mh));
        }
        [HttpDelete("DeleteMonHoc")]
        public IActionResult DeleteMonHoc(int id)
        {
            return Ok(_monHocService.DeleteMonHoc(id));
        }

    }
}
