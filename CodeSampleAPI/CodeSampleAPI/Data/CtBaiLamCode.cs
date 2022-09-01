using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class CtBaiLamCode
    {
        public int IdbaiLam { get; set; }
        public int IdbaiTapCode { get; set; }
        public int IddeKiemTra { get; set; }
        public string Code { get; set; }
        public double DiemDatDuoc { get; set; }

        public virtual CtDeKiemTraCode Id { get; set; }
        public virtual BaiLamKiemTra IdbaiLamNavigation { get; set; }
    }
}
