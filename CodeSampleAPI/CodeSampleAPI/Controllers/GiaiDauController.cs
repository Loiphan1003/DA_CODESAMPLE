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
    public class GiaiDauController : ControllerBase
    {
        private readonly IGiaiDauService _giaiDauService;
        private readonly IUriService uriService;
        public GiaiDauController(IGiaiDauService giaiDauService, IUriService uriService)
        {
            this._giaiDauService = giaiDauService;
            this.uriService = uriService;
        }

        [HttpPost("AddGiaiDau")]
        public IActionResult AddGiaiDau([FromBody] GiaiDau_Custom giaiDau_Custom)
        {
            return Ok(_giaiDauService.AddGiaiDau(giaiDau_Custom));
        }

        [HttpGet("getAll")]
        public IActionResult getAll([FromQuery] PaginationFilter filter)
        {
            var route = Request.Path.Value;
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            var totalRecords = _giaiDauService.getSoLuongGiaiDauKhongPhaiHomNay();
            var pagedReponse = PaginationHelper.CreatePagedReponse<GiaiDau>(_giaiDauService.getAll(validFilter), validFilter, totalRecords, uriService, route);
            return Ok(pagedReponse);
        }

        [HttpGet("getListToDay")]
        public IActionResult getListToDay()
        {
            return Ok(_giaiDauService.getListToDay());
        }

        [HttpGet("getAllGiaiDauByIdGiangVien")]
        public IActionResult getAllGiaiDauByIdGiangVien(string id, [FromQuery] PaginationFilter filter)
        {
            var route = Request.Path.Value;
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            var totalRecords = _giaiDauService.getSoLuongGiaiDau(id);
            var pagedReponse = PaginationHelper.CreatePagedReponse<GiaiDau>(_giaiDauService.getAllGiaiDauByIdGiangVien(id, validFilter), validFilter, totalRecords, uriService, route);
            return Ok(pagedReponse);
        }
    }
}
