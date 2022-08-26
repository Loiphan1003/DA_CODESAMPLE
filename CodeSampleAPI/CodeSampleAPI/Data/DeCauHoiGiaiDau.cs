using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class DeCauHoiGiaiDau
    {
        public DeCauHoiGiaiDau()
        {
            BaiLamGiaiDaus = new HashSet<BaiLamGiaiDau>();
            CtDeThiGiaiDaus = new HashSet<CtDeThiGiaiDau>();
        }

        public int IddeCauHoiGiaiDau { get; set; }
        public int TongDiem { get; set; }
        public DateTime NgayTao { get; set; }
        public int IdgiaiDau { get; set; }

        public virtual GiaiDau IddeCauHoiGiaiDauNavigation { get; set; }
        public virtual ICollection<BaiLamGiaiDau> BaiLamGiaiDaus { get; set; }
        public virtual ICollection<CtDeThiGiaiDau> CtDeThiGiaiDaus { get; set; }
    }
}
