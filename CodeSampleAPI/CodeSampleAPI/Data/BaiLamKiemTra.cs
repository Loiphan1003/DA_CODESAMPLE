using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class BaiLamKiemTra
    {
        public BaiLamKiemTra()
        {
            CtBaiLamCodes = new HashSet<CtBaiLamCode>();
            CtBaiLamTracNghiems = new HashSet<CtBaiLamTracNghiem>();
        }

        public int IdbaiLamKiemTra { get; set; }
        public double? TongDiem { get; set; }
        public DateTime? NgayLam { get; set; }
        public string IdnguoiDung { get; set; }
        public int? IddeKiemTra { get; set; }

        public virtual DeKiemTra IddeKiemTraNavigation { get; set; }
        public virtual TaiKhoan IdnguoiDungNavigation { get; set; }
        public virtual ICollection<CtBaiLamCode> CtBaiLamCodes { get; set; }
        public virtual ICollection<CtBaiLamTracNghiem> CtBaiLamTracNghiems { get; set; }
    }
}
