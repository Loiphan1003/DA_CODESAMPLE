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
        List<BaiLamGiaiDau> getAll(int id);
        List<BaiLamGiaiDau> getThongKe(string uid);
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

        public List<BaiLamGiaiDau> getAll(int id)
        {
            BaiLamGiaiDau test = new BaiLamGiaiDau();
            test = _codeSampleContext.BaiLamGiaiDaus.FirstOrDefault(p => p.IddeCauHoiGiaiDau == id);
            if(test != null)
            {
                var res = (from bl in _codeSampleContext.BaiLamGiaiDaus
                           where bl.IddeCauHoiGiaiDau == id
                           select new BaiLamGiaiDau()
                           {
                               IdbaiLam = bl.IdbaiLam,
                               NgayLam = bl.NgayLam,
                               DiemTong = bl.DiemTong,
                               IddeCauHoiGiaiDau = bl.IddeCauHoiGiaiDau,
                               UIdnguoiDung = bl.UIdnguoiDung,
                           }).ToList();
                List<BaiLamGiaiDau> listNew = new List<BaiLamGiaiDau>();
                var flag = res[res.Count - 1];
                listNew.Add(res[res.Count - 1]);
                for (int i = res.Count - 1; i > 0; i--)
                {
                    if (res[i].UIdnguoiDung != flag.UIdnguoiDung)
                    {
                        flag = res[i];
                        listNew.Add(flag);
                    }
                }
                return listNew;
            }
            return null;
        }

        public List<BaiLamGiaiDau> getThongKe(string uid)
        {
            var res = (from bl in _codeSampleContext.BaiLamGiaiDaus
                       where bl.UIdnguoiDung == uid
                       select new BaiLamGiaiDau()
                       {
                           IdbaiLam = bl.IdbaiLam,
                           NgayLam = bl.NgayLam,
                           DiemTong = bl.DiemTong,
                           IddeCauHoiGiaiDau = bl.IddeCauHoiGiaiDau,
                           UIdnguoiDung = bl.UIdnguoiDung,
                       }).ToList();
            if(res != null)
            {
                List<BaiLamGiaiDau> listNew = new List<BaiLamGiaiDau>();
                var flag = res[0];
                listNew.Add(res[0]);
                for (int i = 1; i < res.Count; i++)
                {
                    // dùng phần tử đầu để kiểm tra các phần tử sau, nếu như 
                    if (res[i].IddeCauHoiGiaiDau != flag.IddeCauHoiGiaiDau)
                    {
                        flag = res[i];
                        listNew.Add(flag);
                    }
                }
                return listNew;
            }
            return null;
        }
    }
}
