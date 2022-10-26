﻿using System;
using System.Collections.Generic;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class BaiTapCode
    {
        public BaiTapCode()
        {
            CtDeKiemTraCodes = new HashSet<CtDeKiemTraCode>();
            CtDeThiGiaiDaus = new HashSet<CtDeThiGiaiDau>();
            TestCaseBtcodes = new HashSet<TestCaseBtcode>();
        }

        public int Id { get; set; }
        public string TieuDe { get; set; }
        public string DeBai { get; set; }
        public string UIdNguoiTao { get; set; }
        public string NgonNgu { get; set; }
        public string RangBuoc { get; set; }
        public string DinhDangDauVao { get; set; }
        public string DinhDangDauRa { get; set; }
        public string MauDauVao { get; set; }
        public string MauDauRa { get; set; }
        public byte? CongKhai { get; set; }
        public int? DoKho { get; set; }

        public virtual ICollection<CtDeKiemTraCode> CtDeKiemTraCodes { get; set; }
        public virtual ICollection<CtDeThiGiaiDau> CtDeThiGiaiDaus { get; set; }
        public virtual ICollection<TestCaseBtcode> TestCaseBtcodes { get; set; }
    }
}
