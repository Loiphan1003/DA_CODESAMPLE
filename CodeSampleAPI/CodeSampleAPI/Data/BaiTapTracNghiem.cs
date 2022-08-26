using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class BaiTapTracNghiem
    {
        public BaiTapTracNghiem()
        {
            CtBaiLamTracNghiems = new HashSet<CtBaiLamTracNghiem>();
            CtDeKiemTraTracNghiems = new HashSet<CtDeKiemTraTracNghiem>();
        }

        public int IdbaiTapTracNghiem { get; set; }
        public string CauHoi { get; set; }
        public string CauTraLoi1 { get; set; }
        public string CauTraLoi2 { get; set; }
        public string CauTraLoi3 { get; set; }
        public string CauTraLoi4 { get; set; }
        public int DapAn { get; set; }
        public string UidNguoiTao { get; set; }

        public virtual TaiKhoan UidNguoiTaoNavigation { get; set; }
        public virtual ICollection<CtBaiLamTracNghiem> CtBaiLamTracNghiems { get; set; }
        public virtual ICollection<CtDeKiemTraTracNghiem> CtDeKiemTraTracNghiems { get; set; }
    }
}
