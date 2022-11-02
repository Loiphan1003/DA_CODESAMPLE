using CodeSampleAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeSampleAPI.Service
{

    public interface ITaiKhoanService
    {
        List<TaiKhoan> getAllTaiKhoan();
        TaiKhoan getOne(string uId);
        bool updateInfo(TaiKhoan taiKhoan);
        bool removeTaiKhoan(string uid);
        TaiKhoan getNameTK(string uid);
    }

    public class TaiKhoanService : ITaiKhoanService
    {

        private readonly CodeSampleContext _codeSampleContext;
        public TaiKhoanService(CodeSampleContext codeSampleContext)
        {
            this._codeSampleContext = codeSampleContext;
        }
        public List<TaiKhoan> getAllTaiKhoan()
        {
            return _codeSampleContext.TaiKhoans.ToList();
        }

        public TaiKhoan getOne(string uId)
        {
            var res = _codeSampleContext.TaiKhoans.FirstOrDefault(u => u.UidTaiKhoan.Equals(uId));
            if(res == null)
            {
                return null;
            }
            return res;
        }

        public bool removeTaiKhoan(string uid)
        {
            try
            {
                var res = _codeSampleContext.TaiKhoans.FirstOrDefault(u => u.UidTaiKhoan.Equals(uid));
                if(res == null)
                {
                    return false;
                }

                _codeSampleContext.TaiKhoans.Remove(res);
                _codeSampleContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool updateInfo(TaiKhoan taiKhoan)
        {
            try
            {
                var user = _codeSampleContext.TaiKhoans.FirstOrDefault(u => u.UidTaiKhoan.Equals(taiKhoan.UidTaiKhoan));
                if(user == null)
                {
                    _codeSampleContext.TaiKhoans.Add(taiKhoan);
                    _codeSampleContext.SaveChanges();
                    return true;
                }

                user.TenHienThi = taiKhoan.TenHienThi;
                user.LinkAvatar = taiKhoan.LinkAvatar;
                user.NgaySinh = taiKhoan.NgaySinh;
                user.HoTen = taiKhoan.HoTen;
                user.GioiTinh = taiKhoan.GioiTinh;
                user.Email = taiKhoan.Email;
                user.GioiTinh = taiKhoan.GioiTinh;

                _codeSampleContext.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public TaiKhoan getNameTK(string uid)
        {
            TaiKhoan taiKhoan = new TaiKhoan();
            taiKhoan = _codeSampleContext.TaiKhoans.FirstOrDefault(p => p.UidTaiKhoan == uid);
            return taiKhoan;
        }
    }
}
