using CodeSampleAPI.Data;
using CodeSampleAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeSampleAPI.Service
{
    public interface IGiaiDauService
    {
        bool AddGiaiDau(GiaiDau_Custom giaiDau_Custom);
        List<GiaiDau> getAll(Filter.PaginationFilter validFilter);
        List<GiaiDau> getListToDay();
        int getSoLuongGiaiDauKhongPhaiHomNay();
        List<GiaiDau> getAllGiaiDauByIdGiangVien(string id, Filter.PaginationFilter validFilter);
        int getSoLuongGiaiDau(string id);
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

        public bool AddGiaiDau(GiaiDau_Custom giaiDau_Custom)
        {
            GiaiDau giaiDau = new GiaiDau();
            giaiDau.TenGiaiDau = giaiDau_Custom.TenGiaiDau;
            giaiDau.MoTa = giaiDau_Custom.MoTa;
            giaiDau.Tag = giaiDau_Custom.Tag;
            giaiDau.UidTaiKhoan = giaiDau_Custom.UidTaiKhoan;
            giaiDau.ThoiGianBatDau = giaiDau_Custom.ThoiGianBatDau;
            giaiDau.ThoiGianKetThuc = giaiDau_Custom.ThoiGianKetThuc;
            giaiDau.LinkImgGiaiDau = giaiDau_Custom.LinkImgGiaiDau;
            _codeSampleContext.GiaiDaus.Add(giaiDau);
            _codeSampleContext.SaveChanges();
            return true;
        }

        public List<GiaiDau> getAllGiaiDauByIdGiangVien(string id, Filter.PaginationFilter validFilter)
        {
            var res = (from gd in _codeSampleContext.GiaiDaus
                       where gd.UidTaiKhoan == id
                       select new GiaiDau()
                       {
                           IdgiaiDau = gd.IdgiaiDau,
                           TenGiaiDau = gd.TenGiaiDau,
                           MoTa = gd.MoTa,
                           SoNguoiThamGia = gd.SoNguoiThamGia,
                           Tag = gd.Tag,
                           ThoiGianBatDau = gd.ThoiGianBatDau,
                           ThoiGianKetThuc = gd.ThoiGianKetThuc,
                           LinkImgGifTop1 = gd.LinkImgGifTop1,
                           MoTaGifTop1 = gd.MoTaGifTop1,
                           LinkImgGifTop2 = gd.LinkImgGifTop2,
                           MoTaGifTop2 = gd.MoTaGifTop2,
                           LinkImgGifTop3 = gd.MoTaGifTop3,
                           MoTaGifTop3 = gd.MoTaGifTop3,
                           UidTaiKhoan = gd.UidTaiKhoan,
                           LinkImgGiaiDau = gd.LinkImgGiaiDau,
                       }).Skip((validFilter.PageNumber - 1) * validFilter.PageSize).Take(validFilter.PageSize).ToList();
            return res;
        }

        public int getSoLuongGiaiDau(string id)
        {
            var res = (from gd in _codeSampleContext.GiaiDaus
                       where gd.UidTaiKhoan == id
                       select new GiaiDau()
                       {
                           IdgiaiDau = gd.IdgiaiDau,
                           TenGiaiDau = gd.TenGiaiDau,
                           MoTa = gd.MoTa,
                           SoNguoiThamGia = gd.SoNguoiThamGia,
                           Tag = gd.Tag,
                           ThoiGianBatDau = gd.ThoiGianBatDau,
                           ThoiGianKetThuc = gd.ThoiGianKetThuc,
                           LinkImgGifTop1 = gd.LinkImgGifTop1,
                           MoTaGifTop1 = gd.MoTaGifTop1,
                           LinkImgGifTop2 = gd.LinkImgGifTop2,
                           MoTaGifTop2 = gd.MoTaGifTop2,
                           LinkImgGifTop3 = gd.MoTaGifTop3,
                           MoTaGifTop3 = gd.MoTaGifTop3,
                           UidTaiKhoan = gd.UidTaiKhoan,
                           LinkImgGiaiDau = gd.LinkImgGiaiDau,
                       }).Count();
            return res;
        }
    }
}
