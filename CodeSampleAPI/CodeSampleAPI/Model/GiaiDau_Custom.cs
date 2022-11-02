using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeSampleAPI.Model
{
    public class GiaiDau_Custom
    {
        public string TenGiaiDau { get; set; }
        public string MoTa { get; set; }
        public string Tag { get; set; }
        public string UidTaiKhoan { get; set; }
        public DateTime ThoiGianBatDau { get; set; }
        public DateTime ThoiGianKetThuc { get; set; }
        public string LinkImgGiaiDau { get; set; }
    }
}
