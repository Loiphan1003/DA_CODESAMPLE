using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeSampleAPI.Model
{
    public class DeCauHoiGiaiDau_Custom
    {
        public int TongDiem { get; set; }
        public DateTime NgayTao { get; set; }
        public int IdgiaiDau { get; set; }
        public List<CauHoi> listCauHoi { get; set; }
    }
}
