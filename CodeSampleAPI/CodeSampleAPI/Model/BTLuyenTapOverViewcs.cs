using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeSampleAPI.Model
{
    public class BTLuyenTapOverViewcs
    {
        public int Id { get; set; }
        public string TenBai { get; set; }
        public bool? TrangThai { get; set; }
        public int DoKho { get; set; }
        public string NgonNgu { get; set; }
        public DateTime? NgayLam { get; set; }

    }
}
