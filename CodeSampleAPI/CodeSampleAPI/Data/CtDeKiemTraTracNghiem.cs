using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class CtDeKiemTraTracNghiem
    {
        public int IdDeKiemTra { get; set; }
        public int IdBaiTapTracNghiem { get; set; }
        public int? SttCauHoi { get; set; }
        public double? Diem { get; set; }

        public virtual BaiTapTracNghiem IdBaiTapTracNghiemNavigation { get; set; }
        public virtual DeKiemTra IdDeKiemTraNavigation { get; set; }
    }
}
