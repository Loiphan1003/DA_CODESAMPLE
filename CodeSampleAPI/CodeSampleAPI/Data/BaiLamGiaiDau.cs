using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class BaiLamGiaiDau
    {
        public BaiLamGiaiDau()
        {
            CtBaiLamGiaiDaus = new HashSet<CtBaiLamGiaiDau>();
        }

        public int IdbaiLam { get; set; }
        public DateTime NgayLam { get; set; }
        public int DiemTong { get; set; }
        public int IddeCauHoiGiaiDau { get; set; }
        public string UIdnguoiDung { get; set; }

        public virtual NguoiDung UIdnguoiDungNavigation { get; set; }
        public virtual ICollection<CtBaiLamGiaiDau> CtBaiLamGiaiDaus { get; set; }
    }
}
