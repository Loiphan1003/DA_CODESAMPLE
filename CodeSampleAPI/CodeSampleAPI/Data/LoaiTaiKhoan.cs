using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class LoaiTaiKhoan
    {
        public LoaiTaiKhoan()
        {
            TaiKhoans = new HashSet<TaiKhoan>();
        }

        public int Id { get; set; }
        public string TenLoaiTaiKhoan { get; set; }
        public string MoTa { get; set; }

        public virtual ICollection<TaiKhoan> TaiKhoans { get; set; }
    }
}
