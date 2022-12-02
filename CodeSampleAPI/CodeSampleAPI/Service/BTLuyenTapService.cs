using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeSampleAPI.Data;
using CodeSampleAPI.Model;

namespace CodeSampleAPI.Service
{
    public interface IBTLuyenTapService
    {
        List<BTLuyenTap_getAll> getAll(Filter.PaginationFilter validFilter);

        List<BtLuyenTap> getAllByAdmin();

        BtLuyenTap getOne(int id);


        BTLuyenTap_getAll getOneOnList(int id);
        int getSoLuongBaiLuyenTap();
        bool add(BaiTapLuyenTap_Custom btLuyenTap_Cus);
        bool DeleteBTLT(int id);
        bool submitBT(string uId, int idBT, bool trangthai, string tinhTrang, string ngonNgu, string code);
        bool EditBTLT(int id, int doKho, string tieuDe, string deBai, string rangBuoc, string dinhDangDauVao, string dinhDangDauRa, string mauDauVao, string mauDauRa, string tag);
        List<BTLuyenTapOverViewcs> getBaiTapDaLam(string uId);
        List<BTLuyenTapOverViewcs> getLichSuLamBaiTap(string uId, int id);

        List<BtLuyenTap> getAllOver();
        List<CtLuyenTap> getTest(string uId);
    }
    public class BTLuyenTapService:IBTLuyenTapService
    {
        private readonly CodeSampleContext _codeSampleContext;
        public BTLuyenTapService(CodeSampleContext codeSampleContext)
        {
            this._codeSampleContext = codeSampleContext;
        }

        public bool add(BaiTapLuyenTap_Custom btLuyenTap_Cus)
        {
            BtLuyenTap baiLuyenTap = new BtLuyenTap()
            {
                DeBai = btLuyenTap_Cus.DeBai,
                TieuDe = btLuyenTap_Cus.TieuDe,
                UIdNguoiTao = btLuyenTap_Cus.UIdNguoiTao,
                RangBuoc = btLuyenTap_Cus.RangBuoc,
                DinhDangDauRa = btLuyenTap_Cus.DinhDangDauRa,
                DinhDangDauVao = btLuyenTap_Cus.DinhDangDauVao,
                MauDauRa = btLuyenTap_Cus.MauDauRa,
                MauDauVao = btLuyenTap_Cus.MauDauVao,
                Tag = btLuyenTap_Cus.Tag,
                DoKho = btLuyenTap_Cus.DoKho,
                SoNguoiLam = 0,
                SoNguoiThanhCong = 0
            };
            List<TestCase_Custom> testCases = btLuyenTap_Cus.testCases;
            try
            {
                _codeSampleContext.BtLuyenTaps.Add(baiLuyenTap);
                foreach (var testCase in testCases)
                {
                    TestCaseLuyenTap t = new TestCaseLuyenTap() { IdBtluyenTap = baiLuyenTap.Id, Input = testCase.Input, Output = testCase.Output };
                    _codeSampleContext.TestCaseLuyenTaps.Add(t);
                }
                _codeSampleContext.SaveChanges();
            }
            catch (System.Exception)
            {
                return false;
            }
            return true;
        }

        public bool DeleteBTLT(int id)
        {
            BtLuyenTap bt = new BtLuyenTap();
            TestCaseLuyenTap ts = new TestCaseLuyenTap();
            bt = _codeSampleContext.BtLuyenTaps.FirstOrDefault(p => p.Id == id);
            ts = _codeSampleContext.TestCaseLuyenTaps.FirstOrDefault(p => p.IdBtluyenTap == id);
            if (bt != null)
            {
                _codeSampleContext.BtLuyenTaps.Remove(bt);
                _codeSampleContext.TestCaseLuyenTaps.Remove(ts);
                _codeSampleContext.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool EditBTLT(int id, int doKho, string tieuDe, string deBai, string rangBuoc, string dinhDangDauVao, string dinhDangDauRa, string mauDauVao, string mauDauRa, string tag)
        {
            BtLuyenTap bt = new BtLuyenTap();
            bt = _codeSampleContext.BtLuyenTaps.FirstOrDefault(p => p.Id == id);
            if (bt != null)
            {
                bt.DoKho = doKho;
                bt.TieuDe = tieuDe;
                bt.DeBai = deBai;
                bt.RangBuoc = rangBuoc;
                bt.DinhDangDauVao = dinhDangDauVao;
                bt.DinhDangDauRa = dinhDangDauRa;
                bt.MauDauVao = mauDauVao;
                bt.MauDauRa = mauDauRa;
                bt.Tag = tag;
                _codeSampleContext.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<BTLuyenTap_getAll> getAll(Filter.PaginationFilter validFilter)
        {
            var res = (from bt in _codeSampleContext.BtLuyenTaps join user in _codeSampleContext.TaiKhoans on
                       bt.UIdNguoiTao equals user.UidTaiKhoan
                       select new BTLuyenTap_getAll()
                       {
                           Id = bt.Id,
                           DoKho = bt.DoKho,
                           LinkAvatar = user.LinkAvatar,
                           SoNguoiLam = bt.SoNguoiLam,
                           SoNguoiThanhCong = bt.SoNguoiThanhCong,
                           Tag = bt.Tag,
                           TenHienThi = user.TenHienThi,
                           TieuDe = bt.TieuDe,
                           ThoiGian = bt.ThoiGian,
                       }).Skip((validFilter.PageNumber - 1) * validFilter.PageSize).Take(validFilter.PageSize).ToList();
            return  res;
        }

        public List<BtLuyenTap> getAllByAdmin()
        {
            return _codeSampleContext.BtLuyenTaps.ToList();
        }

        public List<BtLuyenTap> getAllOver()
        {
            return _codeSampleContext.BtLuyenTaps.ToList();
        }

        public List<BTLuyenTapOverViewcs> getBaiTapDaLam(string uId)
        {
            List<CtLuyenTap> listCtLuyenTap = _codeSampleContext.CtLuyenTaps.Where(i => i.UId.Equals(uId)).ToList();
            List<BTLuyenTapOverViewcs> btLuyenTaps = new List<BTLuyenTapOverViewcs>();
            foreach (var i in listCtLuyenTap)
            {
                BTLuyenTapOverViewcs btLuyenTap = (from bt in _codeSampleContext.BtLuyenTaps
                                                   where bt.Id == i.IdBaiTap
                                                   select new BTLuyenTapOverViewcs()
                                                   {
                                                       Id = bt.Id,
                                                       TenBai = bt.TieuDe,
                                                       NgayLam = i.Date,
                                                       DoKho = bt.DoKho,
                                                       TrangThai = i.TrangThai,
                                                       NgonNgu = i.NgonNgu,
                                                   }).FirstOrDefault();

                if (btLuyenTap != null)
                {
                    btLuyenTaps.Add(btLuyenTap);
                }
            }
            return btLuyenTaps;
        }

        public List<BTLuyenTapOverViewcs> getLichSuLamBaiTap(string uId, int id)
        {
            List<CtLuyenTap> listCtLuyenTap = _codeSampleContext.CtLuyenTaps.Where(i => i.UId.Equals(uId) && i.IdBaiTap == id ).ToList();
            List<BTLuyenTapOverViewcs> btLuyenTaps = new List<BTLuyenTapOverViewcs>();
            foreach (var i in listCtLuyenTap)
            {
                BTLuyenTapOverViewcs btLuyenTap = (from bt in _codeSampleContext.BtLuyenTaps
                                                   where bt.Id == i.IdBaiTap
                                                   select new BTLuyenTapOverViewcs()
                                                   {
                                                       Id = bt.Id,
                                                       TenBai = bt.TieuDe,
                                                       NgayLam = i.Date,
                                                       DoKho = bt.DoKho,
                                                       TrangThai = i.TrangThai,
                                                       NgonNgu = i.NgonNgu,
                                                   }).FirstOrDefault();

                if (btLuyenTap != null)
                {
                    btLuyenTaps.Add(btLuyenTap);
                }
            }
            return btLuyenTaps;
        }

        public BtLuyenTap getOne(int id)
        {
            return _codeSampleContext.BtLuyenTaps.FirstOrDefault(p => p.Id == id);
        }

        public BTLuyenTap_getAll getOneOnList(int id)
        {
            var res = (from bt in _codeSampleContext.BtLuyenTaps
                       join user in _codeSampleContext.TaiKhoans on
                        bt.UIdNguoiTao equals user.UidTaiKhoan
                       select new BTLuyenTap_getAll()
                       {
                           Id = bt.Id,
                           DoKho = bt.DoKho,
                           LinkAvatar = user.LinkAvatar,
                           SoNguoiLam = bt.SoNguoiLam,
                           SoNguoiThanhCong = bt.SoNguoiThanhCong,
                           Tag = bt.Tag,
                           TenHienThi = user.TenHienThi,
                           TieuDe = bt.TieuDe
                       }).FirstOrDefault();
            return res;
        }

        public int getSoLuongBaiLuyenTap()
        {
            int count = (from bt in _codeSampleContext.BtLuyenTaps
                         join user in _codeSampleContext.TaiKhoans on
                            bt.UIdNguoiTao equals user.UidTaiKhoan
                         select new BTLuyenTap_getAll()
                         {
                             Id = bt.Id,
                             DoKho = bt.DoKho,
                             LinkAvatar = user.LinkAvatar,
                             SoNguoiLam = bt.SoNguoiLam,
                             SoNguoiThanhCong = bt.SoNguoiThanhCong,
                             Tag = bt.Tag,
                             TenHienThi = user.TenHienThi,
                             TieuDe = bt.TieuDe
                         }).Count();
            return count;
        }

        public List<CtLuyenTap> getTest(string uId)
        {
            return _codeSampleContext.CtLuyenTaps.Where(i => i.UId == uId).ToList();
        }

        public bool submitBT(string uId, int idBT, bool trangthai, string tinhTrang, string ngonNgu, string code)
        {
            try
            {
                
                DateTime dateTime = DateTime.Now;

                CtLuyenTap ctLuyenTap = new CtLuyenTap();
                ctLuyenTap.UId = uId;
                ctLuyenTap.IdBaiTap = idBT;
                ctLuyenTap.TrangThai = trangthai;
                ctLuyenTap.TinhTrang = tinhTrang;
                ctLuyenTap.NgonNgu = ngonNgu;
                ctLuyenTap.Code = code;
                ctLuyenTap.Date = dateTime;

                _codeSampleContext.CtLuyenTaps.Add(ctLuyenTap);
                _codeSampleContext.SaveChanges();
                

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
