using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class DaHoc
    {
        public int IdLyThuyet { get; set; }
        public string UIdNguoiDung { get; set; }

        public virtual LyThuyet IdLyThuyetNavigation { get; set; }
        public virtual TaiKhoan UIdNguoiDungNavigation { get; set; }
    }
}
