using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class GiaiDau
    {
        public GiaiDau()
        {
            CtThamGiaGiaiDaus = new HashSet<CtThamGiaGiaiDau>();
            DeCauHoiGiaiDaus = new HashSet<DeCauHoiGiaiDau>();
        }

        public int IdgiaiDau { get; set; }
        public string TenGiaiDau { get; set; }
        public string MoTa { get; set; }
        public int SoNguoiThamGia { get; set; }
        public string Tag { get; set; }
        public DateTime ThoiGianBatDau { get; set; }
        public DateTime ThoiGianKetThuc { get; set; }

        public virtual ICollection<CtThamGiaGiaiDau> CtThamGiaGiaiDaus { get; set; }
        public virtual ICollection<DeCauHoiGiaiDau> DeCauHoiGiaiDaus { get; set; }
    }
}
