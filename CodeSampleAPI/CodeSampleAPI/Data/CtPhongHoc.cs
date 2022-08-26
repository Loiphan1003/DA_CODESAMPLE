using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class CtPhongHoc
    {
        public string UidNguoiDunng { get; set; }
        public string Idphong { get; set; }
        public DateTime NgayThamGia { get; set; }

        public virtual PhongHoc IdphongNavigation { get; set; }
        public virtual TaiKhoan UidNguoiDunngNavigation { get; set; }
    }
}
