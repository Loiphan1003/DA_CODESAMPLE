using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class CtLamBaiTapCoThoiGian
    {
        public string UIdnguoiDung { get; set; }
        public int IdbaiTap { get; set; }
        public bool TrangThai { get; set; }
        public string Code { get; set; }
        public DateTime ThoiGianHoanThanh { get; set; }

        public virtual BtLuyenTap IdbaiTapNavigation { get; set; }
        public virtual TaiKhoan UIdnguoiDungNavigation { get; set; }
    }
}
