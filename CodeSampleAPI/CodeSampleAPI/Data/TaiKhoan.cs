using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class TaiKhoan
    {
        public TaiKhoan()
        {
            BaiLamGiaiDaus = new HashSet<BaiLamGiaiDau>();
            BaiLamKiemTras = new HashSet<BaiLamKiemTra>();
            BaiTapTracNghiems = new HashSet<BaiTapTracNghiem>();
            CtLamBaiTapCoThoiGians = new HashSet<CtLamBaiTapCoThoiGian>();
            CtLuyenTaps = new HashSet<CtLuyenTap>();
            CtPhongHocs = new HashSet<CtPhongHoc>();
            CtThamGiaGiaiDaus = new HashSet<CtThamGiaGiaiDau>();
            DaHocs = new HashSet<DaHoc>();
            PhongHocs = new HashSet<PhongHoc>();
        }

        public string UidTaiKhoan { get; set; }
        public string HoTen { get; set; }
        public string Email { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string Truong { get; set; }
        public string TenHienThi { get; set; }
        public string LinkAvatar { get; set; }
        public string GioiTinh { get; set; }
        public int? IdloaiTaiKhoan { get; set; }

        public virtual LoaiTaiKhoan IdloaiTaiKhoanNavigation { get; set; }
        public virtual ICollection<BaiLamGiaiDau> BaiLamGiaiDaus { get; set; }
        public virtual ICollection<BaiLamKiemTra> BaiLamKiemTras { get; set; }
        public virtual ICollection<BaiTapTracNghiem> BaiTapTracNghiems { get; set; }
        public virtual ICollection<CtLamBaiTapCoThoiGian> CtLamBaiTapCoThoiGians { get; set; }
        public virtual ICollection<CtLuyenTap> CtLuyenTaps { get; set; }
        public virtual ICollection<CtPhongHoc> CtPhongHocs { get; set; }
        public virtual ICollection<CtThamGiaGiaiDau> CtThamGiaGiaiDaus { get; set; }
        public virtual ICollection<DaHoc> DaHocs { get; set; }
        public virtual ICollection<PhongHoc> PhongHocs { get; set; }
    }
}
