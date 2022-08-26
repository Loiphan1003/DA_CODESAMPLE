using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class CtLuyenTap
    {
        public string UId { get; set; }
        public int IdBaiTap { get; set; }
        public bool? TrangThai { get; set; }
        public string Code { get; set; }
        public DateTime? Date { get; set; }

        public virtual BtLuyenTap IdBaiTapNavigation { get; set; }
        public virtual TaiKhoan UIdNavigation { get; set; }
    }
}
