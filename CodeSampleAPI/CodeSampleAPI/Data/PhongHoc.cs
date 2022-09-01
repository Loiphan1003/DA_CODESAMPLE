using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class PhongHoc
    {
        public PhongHoc()
        {
            CtPhongHocs = new HashSet<CtPhongHoc>();
        }

        public string Idphong { get; set; }
        public string TenPhong { get; set; }
        public string IdchuPhong { get; set; }
        public int? SoThanhVien { get; set; }

        public virtual TaiKhoan IdchuPhongNavigation { get; set; }
        public virtual ICollection<CtPhongHoc> CtPhongHocs { get; set; }
    }
}
