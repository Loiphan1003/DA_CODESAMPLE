using CodeSampleAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeSampleAPI.Service
{
    public interface IGiaiDauService
    {
        List<GiaiDau> getAll(Filter.PaginationFilter validFilter);
        List<GiaiDau> getListToDay();
        int getSoLuongGiaiDauKhongPhaiHomNay();
    }

    public class GiaiDauService : IGiaiDauService
    {

        private readonly CodeSampleContext _codeSampleContext;
        public GiaiDauService(CodeSampleContext codeSampleContext)
        {
            this._codeSampleContext = codeSampleContext;
        }

        public List<GiaiDau> getAll(Filter.PaginationFilter validFilter)
        {
            DateTime date = DateTime.Today;
            return _codeSampleContext.GiaiDaus.Where(g => g.ThoiGianBatDau != date).Skip((validFilter.PageNumber - 1) * validFilter.PageSize).Take(validFilter.PageSize).ToList();
        }

        public List<GiaiDau> getListToDay()
        {
            DateTime date = DateTime.Now;
            return _codeSampleContext.GiaiDaus.Where(g => g.ThoiGianBatDau >= date).OrderBy(t => t.ThoiGianBatDau).ToList();
        }

        public int getSoLuongGiaiDauKhongPhaiHomNay()
        {
            DateTime date = DateTime.Today;
            return _codeSampleContext.GiaiDaus.Where(g => g.ThoiGianBatDau != date).Count();
        }
    }
}
