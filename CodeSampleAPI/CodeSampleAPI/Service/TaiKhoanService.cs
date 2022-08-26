using CodeSampleAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeSampleAPI.Service
{

    public interface ITaiKhoanService
    {
        List<TaiKhoan> getAllTaiKhoan();
    }

    public class TaiKhoanService : ITaiKhoanService
    {

        private readonly CodeSampleContext _codeSampleContext;
        public TaiKhoanService(CodeSampleContext codeSampleContext)
        {
            this._codeSampleContext = codeSampleContext;
        }
        public List<TaiKhoan> getAllTaiKhoan()
        {
            return _codeSampleContext.TaiKhoans.ToList();
        }
    }
}
