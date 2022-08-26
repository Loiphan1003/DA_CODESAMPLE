using CodeSampleAPI.Data;
using CodeSampleAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeSampleAPI.Service
{
    public interface IPhongHocService
    {
        List<PhongHocCustom> getListPhongHocByUidUser(string uID);

        bool createPhongHoc(PhongHoc phongHoc);

        bool addUserToPhongPhong(string uID, string idPhongHoc);

        PhongHoc getOneByID(string id);

        List<PhongHocCustom> getListPhongHocByUidGiangVien(string uID);

        List<ThanhVien> getListThanhVienByIdPhong(string IdPhong);

        bool removeMembers(string[] members);

        Task<String> addListMembers(string[] members, string roomId);

    }
    public class PhongHocService : IPhongHocService
    {
        private readonly CodeSampleContext _codeSampleContext;
        public PhongHocService(CodeSampleContext codeSampleContext)
        {
            this._codeSampleContext = codeSampleContext;
        }

        public List<PhongHocCustom> getListPhongHocByUidUser(string uID)
        {
            var res = (from ctph in _codeSampleContext.CtPhongHocs
                       where ctph.UidNguoiDunng.Equals(uID)
                       select new PhongHocCustom()
                       {
                           id = ctph.Idphong,
                           tenPhong = ctph.IdphongNavigation.TenPhong,
                           soLuongThanhVien = ctph.IdphongNavigation.SoThanhVien,
                           linkAvatar = ctph.IdphongNavigation.IdchuPhongNavigation.LinkAvatar,
                           tenHienThi = ctph.IdphongNavigation.IdchuPhongNavigation.TenHienThi
                       }).ToList();

            return res;
        }

        public bool addUserToPhongPhong(string uID, string idPhongHoc)
        {
            // kiểm tra phòng học có tồn tại không
            PhongHoc phongHoc = _codeSampleContext.PhongHocs.FirstOrDefault(p => p.Idphong == idPhongHoc);
            if (phongHoc == null)
                return false;
            //tồn tại rồi thì không thêm nữa
            CtPhongHoc ctPH = _codeSampleContext.CtPhongHocs.FirstOrDefault(p => p.Idphong == idPhongHoc && p.UidNguoiDunng.Equals(uID));
            if (ctPH != null)
                return false;
            // tiến hành thêm chi tiêt phòng học
            try
            {
                DateTime Datenow = DateTime.Now;

                CtPhongHoc ctPhongHoc = new CtPhongHoc() { Idphong = idPhongHoc, UidNguoiDunng = uID, NgayThamGia = Datenow };
                _codeSampleContext.CtPhongHocs.Add(ctPhongHoc);
                _codeSampleContext.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        public PhongHoc getOneByID(string id)
        {
            return _codeSampleContext.PhongHocs.FirstOrDefault(p => p.Idphong.Equals(id));
        }

        public List<PhongHocCustom> getListPhongHocByUidGiangVien(string uID)
        {
            var res = (from ph in _codeSampleContext.PhongHocs join user in _codeSampleContext.TaiKhoans on
                       ph.IdchuPhong equals user.UidTaiKhoan
                       select new PhongHocCustom()
                       {
                           id = ph.Idphong,
                           linkAvatar = user.LinkAvatar,
                           tenHienThi = user.TenHienThi,
                           soLuongThanhVien = ph.SoThanhVien,
                           tenPhong = ph.TenPhong

                       }).ToList();
            return res;
        }

        public bool createPhongHoc(PhongHoc phongHoc)
        {
            try
            {
                PhongHoc phong = new PhongHoc();
                phong.Idphong = phongHoc.Idphong;
                phong.TenPhong = phongHoc.TenPhong;
                phong.IdchuPhong = phongHoc.IdchuPhong;
                _codeSampleContext.PhongHocs.Add(phong);
                _codeSampleContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public List<ThanhVien> getListThanhVienByIdPhong(string IdPhong)
        {
            var res = (from phong in _codeSampleContext.CtPhongHocs
                       where phong.Idphong.Equals(IdPhong)
                       select new ThanhVien()
                       {
                           TenHienThi = phong.UidNguoiDunngNavigation.TenHienThi,
                           HoTen = phong.UidNguoiDunngNavigation.HoTen,
                           Email = phong.UidNguoiDunngNavigation.Email
                       }).ToList();

            return res;
        }

        public bool removeMembers(string[] members)
        {
            try
            {
                foreach (string member in members)
                {
                    var nguoiDung = _codeSampleContext.TaiKhoans.FirstOrDefault(u => u.Email.Equals(member));
                    if (nguoiDung != null)
                    {
                        var mb = _codeSampleContext.CtPhongHocs.FirstOrDefault(p => p.UidNguoiDunng.Equals(nguoiDung.UidTaiKhoan));
                        _codeSampleContext.CtPhongHocs.Remove(mb);
                        _codeSampleContext.SaveChanges();
                    }
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<string> addListMembers(string[] members, string roomId)
        {

            foreach (string i in members)
            {
                DateTime Datenow = DateTime.Now;

                var user = _codeSampleContext.TaiKhoans.FirstOrDefault(u => u.Email.Equals(i));
                PhongHoc room = _codeSampleContext.PhongHocs.FirstOrDefault(p => p.Idphong.Equals(roomId));
                bool accountAlreadyExist = false;
                if (user != null && room != null)
                {
                    CtPhongHoc phong = new CtPhongHoc()
                    {
                        UidNguoiDunng = user.UidTaiKhoan,
                        Idphong = roomId,
                        NgayThamGia = Datenow
                    };
                    _codeSampleContext.CtPhongHocs.Add(phong);
                    _codeSampleContext.SaveChanges();
                    accountAlreadyExist = true;
                }
                await MailUtils.SendGMail("phanvuloi001@gmail.com", i, "Thông báo tham gia phòng học", accountAlreadyExist, roomId);
            }
            return "true";
        }
    }
}
