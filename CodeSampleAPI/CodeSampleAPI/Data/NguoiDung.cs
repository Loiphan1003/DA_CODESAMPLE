using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class NguoiDung
    {
        public NguoiDung()
        {
            BaiLamGiaiDaus = new HashSet<BaiLamGiaiDau>();
            BaiLamKiemTras = new HashSet<BaiLamKiemTra>();
            CtLamBaiTapCoThoiGians = new HashSet<CtLamBaiTapCoThoiGian>();
            CtLuyenTaps = new HashSet<CtLuyenTap>();
            CtPhongHocs = new HashSet<CtPhongHoc>();
            CtThamGiaGiaiDaus = new HashSet<CtThamGiaGiaiDau>();
            DaHocs = new HashSet<DaHoc>();
        }

        public string UId { get; set; }
        public string HoTen { get; set; }
        public string Email { get; set; }
        public DateTime NamSinh { get; set; }
        public string Truong { get; set; }
        public string TenHienThi { get; set; }
        public string LinkAvatar { get; set; }

        public virtual ICollection<BaiLamGiaiDau> BaiLamGiaiDaus { get; set; }
        public virtual ICollection<BaiLamKiemTra> BaiLamKiemTras { get; set; }
        public virtual ICollection<CtLamBaiTapCoThoiGian> CtLamBaiTapCoThoiGians { get; set; }
        public virtual ICollection<CtLuyenTap> CtLuyenTaps { get; set; }
        public virtual ICollection<CtPhongHoc> CtPhongHocs { get; set; }
        public virtual ICollection<CtThamGiaGiaiDau> CtThamGiaGiaiDaus { get; set; }
        public virtual ICollection<DaHoc> DaHocs { get; set; }
    }
}
