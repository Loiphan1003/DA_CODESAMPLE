using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class CtDeThiGiaiDau
    {
        public CtDeThiGiaiDau()
        {
            CtBaiLamGiaiDaus = new HashSet<CtBaiLamGiaiDau>();
        }

        public int IddeCauHoiGiaiDau { get; set; }
        public int IdbaiTapCode { get; set; }
        public int SttcauHoi { get; set; }
        public double Diem { get; set; }

        public virtual BaiTapCode IdbaiTapCodeNavigation { get; set; }
        public virtual DeCauHoiGiaiDau IddeCauHoiGiaiDauNavigation { get; set; }
        public virtual ICollection<CtBaiLamGiaiDau> CtBaiLamGiaiDaus { get; set; }
    }
}
