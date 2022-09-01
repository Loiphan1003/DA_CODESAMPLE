using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class CtBaiLamGiaiDau
    {
        public int IddeCauHoiGiaiDau { get; set; }
        public int IdbaiLam { get; set; }
        public int IdbaiTapCode { get; set; }
        public int? SttcauHoi { get; set; }
        public double? Diem { get; set; }
        public string Code { get; set; }

        public virtual CtDeThiGiaiDau Id { get; set; }
        public virtual BaiLamGiaiDau IdbaiLamNavigation { get; set; }
    }
}
