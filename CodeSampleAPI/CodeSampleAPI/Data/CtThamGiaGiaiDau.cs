using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class CtThamGiaGiaiDau
    {
        public int IdgiaiDau { get; set; }
        public string UIdnguoiDung { get; set; }
        public DateTime NgayThamGia { get; set; }
        public int XepHang { get; set; }

        public virtual GiaiDau IdgiaiDauNavigation { get; set; }
        public virtual TaiKhoan UIdnguoiDungNavigation { get; set; }
    }
}
