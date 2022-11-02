using CodeSampleAPI.Data;
using CodeSampleAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeSampleAPI.Service
{
    public interface IBaiLamGiaiDauService
    {
        bool add(BaiLamKiemTraCustom bailamkiemtra);
    }
    public class BaiLamGiaiDauService : IBaiLamGiaiDauService
    {
        private readonly CodeSampleContext _codeSampleContext;
        public BaiLamGiaiDauService(CodeSampleContext codeSampleContext)
        {
            this._codeSampleContext = codeSampleContext;
        }

        public bool add(BaiLamKiemTraCustom baiLamKiemTraCustom)
        {
            List<CauTraLoi> lsCauTraLoi = baiLamKiemTraCustom.lsCauTraLoi;
            try
            {
                BaiLamGiaiDau baiLamKiemTra = new BaiLamGiaiDau()
                {
                    DiemTong = baiLamKiemTraCustom.tongDiem,
                    IddeCauHoiGiaiDau = baiLamKiemTraCustom.idDeKiemTra,
                    NgayLam = DateTime.Now,
                    UIdnguoiDung = baiLamKiemTraCustom.uId
                };
                _codeSampleContext.BaiLamGiaiDaus.Add(baiLamKiemTra);
                _codeSampleContext.SaveChanges();

                foreach (var cauTraLoi in lsCauTraLoi)
                {
                    if(cauTraLoi.loaiCauHoi == 1)
                    {
                        CtBaiLamGiaiDau ctBaiLamGiaiDau = new CtBaiLamGiaiDau()
                        {
                            IdbaiLam = baiLamKiemTra.IdbaiLam,
                            IdbaiTapCode = cauTraLoi.id,
                            IddeCauHoiGiaiDau = baiLamKiemTraCustom.idDeKiemTra,
                            Diem = cauTraLoi.diem,
                            Code = cauTraLoi.dapAn
                        };
                        _codeSampleContext.CtBaiLamGiaiDaus.Add(ctBaiLamGiaiDau);
                    }
                }
                _codeSampleContext.SaveChanges();
            }
            catch (Exception e)
            {
                string error = e.ToString();
                return false;
            }

            return true;
        }
    }
}
