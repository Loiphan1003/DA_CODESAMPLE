using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class DeCauHoiGiaiDau
    {
        public DeCauHoiGiaiDau()
        {
            CtDeThiGiaiDaus = new HashSet<CtDeThiGiaiDau>();
        }

        public int IddeCauHoiGiaiDau { get; set; }
        public int TongDiem { get; set; }
        public DateTime NgayLam { get; set; }
        public int IdgiaiDau { get; set; }

        public virtual GiaiDau IdgiaiDauNavigation { get; set; }
        public virtual ICollection<CtDeThiGiaiDau> CtDeThiGiaiDaus { get; set; }
    }
}
