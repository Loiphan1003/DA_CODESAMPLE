using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class CtBaiLamTracNghiem
    {
        public int IdbaiLam { get; set; }
        public int IddeKiemTra { get; set; }
        public int IdbaiTapTracNghiem { get; set; }
        public int DapAn { get; set; }
        public double DiemDatDuoc { get; set; }

        public virtual BaiLamKiemTra IdbaiLamNavigation { get; set; }
        public virtual BaiTapTracNghiem IdbaiTapTracNghiemNavigation { get; set; }
    }
}
