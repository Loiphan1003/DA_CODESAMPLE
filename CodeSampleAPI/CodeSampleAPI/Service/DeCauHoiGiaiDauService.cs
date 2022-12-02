using CodeSampleAPI.Data;
using CodeSampleAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeSampleAPI.Service
{
    public interface IDeCauHoiGiaiDauService
    {
        bool addDeCauHoiGiaiDau(DeCauHoiGiaiDau_Custom deCauHoiGiaiDau);
        List<CauHoi_Custom> getListCauHoiGiaiDau(string uID);
        DeCauHoiGiaiDau_Custom getDeCauHoiGiaiDauByID(int id);
        int getIdDeCauHoiGiaiDauByID(int id);
        GiaiDau getGiauDauByIdDeThi(int id);
        int countSlCau(int id);
    }
    public class DeCauHoiGiaiDauService : IDeCauHoiGiaiDauService
    {
        private readonly CodeSampleContext _codeSampleContext;
        public DeCauHoiGiaiDauService(CodeSampleContext codeSampleContext)
        {
            this._codeSampleContext = codeSampleContext;
        }
        public bool addDeCauHoiGiaiDau(DeCauHoiGiaiDau_Custom deCauHoiGiaiDau)
        {
            DeCauHoiGiaiDau deCauHoiGiaiDau1 = new DeCauHoiGiaiDau()
            {
                NgayTao = deCauHoiGiaiDau.NgayTao,
                TongDiem = deCauHoiGiaiDau.TongDiem,
                IdgiaiDau = deCauHoiGiaiDau.IdgiaiDau,
            };
            try
            {
                _codeSampleContext.DeCauHoiGiaiDaus.Add(deCauHoiGiaiDau1);
                _codeSampleContext.SaveChanges();
                foreach (var item in deCauHoiGiaiDau.listCauHoi)
                {
                    if(item.loaiCauHoi == 1)
                    {
                        // thêm ct đề thi giai dau
                        CtDeThiGiaiDau ctCode = new CtDeThiGiaiDau()
                        {
                            IddeCauHoiGiaiDau = deCauHoiGiaiDau1.IddeCauHoiGiaiDau,
                            IdbaiTapCode = item.id,
                            SttcauHoi = item.stt,
                            Diem = item.diem
                        };
                        _codeSampleContext.CtDeThiGiaiDaus.Add(ctCode);
                    }
                }
                _codeSampleContext.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }
        public List<CauHoi_Custom> getListCauHoiGiaiDau(string uID)
        {
            //Xjqg5vbgVrNMQ8WDGXIWPbtmxzu2
            List<BaiTapCode> baiTapCodes = _codeSampleContext.BaiTapCodes.Where(b => b.UIdNguoiTao.Equals(uID)).ToList();
            List<CauHoi_Custom> cauHois = new List<CauHoi_Custom>();
            foreach (var item in baiTapCodes)
            {
                cauHois.Add(new CauHoi_Custom() { Id = item.Id, TenBai = item.TieuDe, LoaiBai = 1 });
            }
            cauHois.OrderBy(q => q.Id);
            return cauHois;
        }

        public DeCauHoiGiaiDau_Custom getDeCauHoiGiaiDauByID(int id)
        {
            // lấy danh sách câu hỏi đề kiểm tra code
            var lsCode = (from ktCode in _codeSampleContext.CtDeThiGiaiDaus
                          where ktCode.IddeCauHoiGiaiDau == id
                          select new CauHoi()
                          {
                              id = ktCode.IdbaiTapCode,
                              diem = ktCode.Diem,
                              loaiCauHoi = 1,
                              stt = ktCode.SttcauHoi
                          }).ToList();
            // sắp xếp danh sách câu hỏi code lại theo số thứ tự
            var lsUnion = lsCode.OrderBy(p => p.stt).ToList();
            var res = (from deKT in _codeSampleContext.DeCauHoiGiaiDaus
                       where deKT.IddeCauHoiGiaiDau == id
                       select new DeCauHoiGiaiDau_Custom()
                       {
                           TongDiem = deKT.TongDiem,
                           NgayTao = deKT.NgayTao,
                           IdgiaiDau = deKT.IdgiaiDau,
                           listCauHoi = lsUnion
                       }).FirstOrDefault();
            return res;
        }

        public int getIdDeCauHoiGiaiDauByID(int id)
        {
            var res = _codeSampleContext.DeCauHoiGiaiDaus.FirstOrDefault(p => p.IdgiaiDau == id);
            if (res != null)
            {
                if (res.IddeCauHoiGiaiDau != 0)
                {
                    return res.IddeCauHoiGiaiDau;
                }
            }
            return 0;
        }
      
        public GiaiDau getGiauDauByIdDeThi(int id)
        {
            DeCauHoiGiaiDau deCauHoiGiaiDau = new DeCauHoiGiaiDau();
            deCauHoiGiaiDau = _codeSampleContext.DeCauHoiGiaiDaus.FirstOrDefault(p => p.IddeCauHoiGiaiDau == id);
            if(deCauHoiGiaiDau != null)
            {
                GiaiDau giaiDau = new GiaiDau();
                giaiDau = _codeSampleContext.GiaiDaus.FirstOrDefault(p => p.IdgiaiDau == deCauHoiGiaiDau.IdgiaiDau);
                if(giaiDau != null)
                {
                    return giaiDau;
                }
                return null;
            }
            return null;
        }

        public int countSlCau(int id)
        {
            var res = (from CtDe in _codeSampleContext.CtDeThiGiaiDaus
                       where CtDe.IddeCauHoiGiaiDau == id
                       select new CtDeThiGiaiDau()
                       {
                           IddeCauHoiGiaiDau = CtDe.IddeCauHoiGiaiDau,
                           IdbaiTapCode = CtDe.IdbaiTapCode,
                           SttcauHoi = CtDe.SttcauHoi,
                           Diem = CtDe.Diem,
                       }).ToList().Count();
            return res;
        }
    }
}
