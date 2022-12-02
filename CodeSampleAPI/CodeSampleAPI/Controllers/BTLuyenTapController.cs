using CodeSampleAPI.Data;
using CodeSampleAPI.Filter;
using CodeSampleAPI.Helpers;
using CodeSampleAPI.Model;
using CodeSampleAPI.Service;
using CodeSampleAPI.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeSampleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BTLuyenTapController : ControllerBase
    {
        private readonly IBTLuyenTapService _btLuyenTapService;
        private readonly IUriService uriService;
        public BTLuyenTapController(IBTLuyenTapService btLuyenTapService, IUriService uriService)
        {
            this._btLuyenTapService = btLuyenTapService;
            this.uriService = uriService;
        }

        [HttpGet("getOne")]
        public IActionResult getOne(int id)
        {
            return Ok(_btLuyenTapService.getOne(id));
        }

        ////[Authorize]
        [HttpGet("getAll")]
        public IActionResult getAll([FromQuery] PaginationFilter filter)
        {
            var route = Request.Path.Value;
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            var totalRecords = _btLuyenTapService.getSoLuongBaiLuyenTap();
            var pagedReponse = PaginationHelper.CreatePagedReponse<BTLuyenTap_getAll>(_btLuyenTapService.getAll(validFilter), validFilter, totalRecords, uriService, route);
            return Ok(pagedReponse);
        }

        [HttpGet("getAllByAdmin")]
        public IActionResult getAllByAdmin()
        {
            return Ok(_btLuyenTapService.getAllByAdmin());
        }

        [HttpGet("getOneOnList")]
        public IActionResult getOneOnList(int id)
        {
            return Ok(new Response<BTLuyenTap_getAll>(_btLuyenTapService.getOneOnList(id)));
        }

        [HttpPost("add")]
        public IActionResult add([FromBody] BaiTapLuyenTap_Custom bt)
        {
            return Ok(_btLuyenTapService.add(bt));
        }
        [HttpDelete("DeleteBTLT")]
        public IActionResult DeleteBTLT(int id)
        {
            return Ok(_btLuyenTapService.DeleteBTLT(id));
        }

        [HttpPut("EditBTLT")]
        public IActionResult EditBTLT(int id, int doKho, string tieuDe, string deBai, string rangBuoc, string dinhDangDauVao, string dinhDangDauRa, string mauDauVao, string mauDauRa, string tag)
        {
            return Ok(_btLuyenTapService.EditBTLT(id, doKho, tieuDe, deBai, rangBuoc, dinhDangDauVao, dinhDangDauRa, mauDauVao, mauDauRa, tag));
        }
        [HttpGet("countAll")]
        public IActionResult countAll()
        {
            return Ok(_btLuyenTapService.getSoLuongBaiLuyenTap());
        }

        [HttpPost("SubmitBTCode")]
        public IActionResult submitBT(CtLuyenTap ctLuyenTap)
        {
            return Ok(_btLuyenTapService.submitBT(ctLuyenTap.UId, ctLuyenTap.IdBaiTap, (bool)ctLuyenTap.TrangThai, ctLuyenTap.TinhTrang, ctLuyenTap.NgonNgu, ctLuyenTap.Code));
        }

        [HttpGet("getBaiTapDaLam")]
        public IActionResult getBaiTapDaLam(string uId)
        {
            return Ok(_btLuyenTapService.getBaiTapDaLam(uId));
        }
        [HttpGet("getAllOverView")]
        public IActionResult getAllOver()
        {
            return Ok(_btLuyenTapService.getAllOver());
        }
        [HttpGet("getTest")]
        public IActionResult getTest(string uid)
        {
            return Ok(_btLuyenTapService.getTest(uid));
        }
        [HttpGet("getLichSuLamBai")]
        public IActionResult getLichSuLamBai(string uid, int id)
        {
            return Ok(_btLuyenTapService.getLichSuLamBaiTap(uid, id));
        }
    }
}
