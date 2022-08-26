using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace CodeSampleAPI.Data
{
    public partial class CodeSampleContext : DbContext
    {
        public CodeSampleContext()
        {
        }

        public CodeSampleContext(DbContextOptions<CodeSampleContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<BaiLamGiaiDau> BaiLamGiaiDaus { get; set; }
        public virtual DbSet<BaiLamKiemTra> BaiLamKiemTras { get; set; }
        public virtual DbSet<BaiTapCode> BaiTapCodes { get; set; }
        public virtual DbSet<BaiTapTracNghiem> BaiTapTracNghiems { get; set; }
        public virtual DbSet<BtLuyenTap> BtLuyenTaps { get; set; }
        public virtual DbSet<CtBaiLamCode> CtBaiLamCodes { get; set; }
        public virtual DbSet<CtBaiLamGiaiDau> CtBaiLamGiaiDaus { get; set; }
        public virtual DbSet<CtBaiLamTracNghiem> CtBaiLamTracNghiems { get; set; }
        public virtual DbSet<CtDeKiemTraCode> CtDeKiemTraCodes { get; set; }
        public virtual DbSet<CtDeKiemTraTracNghiem> CtDeKiemTraTracNghiems { get; set; }
        public virtual DbSet<CtDeThiGiaiDau> CtDeThiGiaiDaus { get; set; }
        public virtual DbSet<CtLamBaiTapCoThoiGian> CtLamBaiTapCoThoiGians { get; set; }
        public virtual DbSet<CtLuyenTap> CtLuyenTaps { get; set; }
        public virtual DbSet<CtPhongHoc> CtPhongHocs { get; set; }
        public virtual DbSet<CtThamGiaGiaiDau> CtThamGiaGiaiDaus { get; set; }
        public virtual DbSet<DaHoc> DaHocs { get; set; }
        public virtual DbSet<DeCauHoiGiaiDau> DeCauHoiGiaiDaus { get; set; }
        public virtual DbSet<DeKiemTra> DeKiemTras { get; set; }
        public virtual DbSet<GiaiDau> GiaiDaus { get; set; }
        public virtual DbSet<LoaiTaiKhoan> LoaiTaiKhoans { get; set; }
        public virtual DbSet<LyThuyet> LyThuyets { get; set; }
        public virtual DbSet<MonHoc> MonHocs { get; set; }
        public virtual DbSet<PhongHoc> PhongHocs { get; set; }
        public virtual DbSet<TaiKhoan> TaiKhoans { get; set; }
        public virtual DbSet<TestCaseBtcode> TestCaseBtcodes { get; set; }
        public virtual DbSet<TestCaseLuyenTap> TestCaseLuyenTaps { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-PDHA0NQ\\SQLEXPRESS;Database=CodeSample;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admin>(entity =>
            {
                entity.HasKey(e => e.TaiKhoan);

                entity.ToTable("Admin");

                entity.Property(e => e.TaiKhoan).HasMaxLength(50);

                entity.Property(e => e.MatKhau)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<BaiLamGiaiDau>(entity =>
            {
                entity.HasKey(e => e.IdbaiLam);

                entity.ToTable("BaiLamGiaiDau");

                entity.Property(e => e.IdbaiLam).HasColumnName("IDBaiLam");

                entity.Property(e => e.IddeCauHoiGiaiDau).HasColumnName("IDDeCauHoiGiaiDau");

                entity.Property(e => e.NgayLam).HasColumnType("date");

                entity.Property(e => e.UIdnguoiDung)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("uIDNguoiDung");

                entity.HasOne(d => d.IddeCauHoiGiaiDauNavigation)
                    .WithMany(p => p.BaiLamGiaiDaus)
                    .HasForeignKey(d => d.IddeCauHoiGiaiDau)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BaiLamGiaiDau_DeCauHoiGiaiDau");

                entity.HasOne(d => d.UIdnguoiDungNavigation)
                    .WithMany(p => p.BaiLamGiaiDaus)
                    .HasForeignKey(d => d.UIdnguoiDung)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BaiLamGiaiDau_TaiKhoan");
            });

            modelBuilder.Entity<BaiLamKiemTra>(entity =>
            {
                entity.HasKey(e => e.IdbaiLamKiemTra);

                entity.ToTable("BaiLamKiemTra");

                entity.Property(e => e.IdbaiLamKiemTra)
                    .ValueGeneratedNever()
                    .HasColumnName("IDBaiLamKiemTra");

                entity.Property(e => e.IddeKiemTra).HasColumnName("IDDeKiemTra");

                entity.Property(e => e.IdnguoiDung)
                    .HasMaxLength(50)
                    .HasColumnName("IDNguoiDung");

                entity.Property(e => e.NgayLam).HasColumnType("datetime");

                entity.HasOne(d => d.IddeKiemTraNavigation)
                    .WithMany(p => p.BaiLamKiemTras)
                    .HasForeignKey(d => d.IddeKiemTra)
                    .HasConstraintName("FK_BaiLamKiemTra_DeKiemTra");

                entity.HasOne(d => d.IdnguoiDungNavigation)
                    .WithMany(p => p.BaiLamKiemTras)
                    .HasForeignKey(d => d.IdnguoiDung)
                    .HasConstraintName("FK_BaiLamKiemTra_TaiKhoan");
            });

            modelBuilder.Entity<BaiTapCode>(entity =>
            {
                entity.ToTable("BaiTapCode");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.DeBai)
                    .IsRequired()
                    .HasMaxLength(400);

                entity.Property(e => e.DinhDangDauRa).HasMaxLength(100);

                entity.Property(e => e.DinhDangDauVao).HasMaxLength(100);

                entity.Property(e => e.MauDauRa).HasMaxLength(150);

                entity.Property(e => e.MauDauVao).HasMaxLength(150);

                entity.Property(e => e.NgonNgu).HasMaxLength(10);

                entity.Property(e => e.RangBuoc).HasMaxLength(100);

                entity.Property(e => e.TieuDe)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.UIdNguoiTao)
                    .HasMaxLength(50)
                    .HasColumnName("uID_NguoiTao");
            });

            modelBuilder.Entity<BaiTapTracNghiem>(entity =>
            {
                entity.HasKey(e => e.IdbaiTapTracNghiem);

                entity.ToTable("BaiTapTracNghiem");

                entity.Property(e => e.IdbaiTapTracNghiem)
                    .ValueGeneratedNever()
                    .HasColumnName("IDBaiTapTracNghiem");

                entity.Property(e => e.CauHoi)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.CauTraLoi1)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.CauTraLoi2)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.CauTraLoi3)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.CauTraLoi4)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.UidNguoiTao)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("UIdNguoiTao");

                entity.HasOne(d => d.UidNguoiTaoNavigation)
                    .WithMany(p => p.BaiTapTracNghiems)
                    .HasForeignKey(d => d.UidNguoiTao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BaiTapTracNghiem_TaiKhoan");
            });

            modelBuilder.Entity<BtLuyenTap>(entity =>
            {
                entity.ToTable("BT_LuyenTap");

                entity.Property(e => e.DeBai)
                    .IsRequired()
                    .HasMaxLength(400);

                entity.Property(e => e.DinhDangDauRa).HasMaxLength(100);

                entity.Property(e => e.DinhDangDauVao).HasMaxLength(100);

                entity.Property(e => e.MauDauRa).HasMaxLength(150);

                entity.Property(e => e.MauDauVao).HasMaxLength(150);

                entity.Property(e => e.RangBuoc).HasMaxLength(100);

                entity.Property(e => e.Tag).HasMaxLength(20);

                entity.Property(e => e.TieuDe)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.UIdNguoiTao)
                    .HasMaxLength(50)
                    .HasColumnName("uID_NguoiTao");
            });

            modelBuilder.Entity<CtBaiLamCode>(entity =>
            {
                entity.HasKey(e => new { e.IdbaiLam, e.IdbaiTapCode, e.IddeKiemTra });

                entity.ToTable("CT_BaiLamCode");

                entity.Property(e => e.IdbaiLam).HasColumnName("IDBaiLam");

                entity.Property(e => e.IdbaiTapCode).HasColumnName("IDBaiTapCode");

                entity.Property(e => e.IddeKiemTra).HasColumnName("IDDeKiemTra");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasColumnType("text");

                entity.HasOne(d => d.IdbaiLamNavigation)
                    .WithMany(p => p.CtBaiLamCodes)
                    .HasForeignKey(d => d.IdbaiLam)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_BaiLamCode_BaiLamKiemTra");

                entity.HasOne(d => d.IdbaiTapCodeNavigation)
                    .WithMany(p => p.CtBaiLamCodes)
                    .HasForeignKey(d => d.IdbaiTapCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_BaiLamCode_BaiTapCode");
            });

            modelBuilder.Entity<CtBaiLamGiaiDau>(entity =>
            {
                entity.HasKey(e => new { e.IddeCauHoiGiaiDau, e.IdbaiLam, e.IdbaiTapCode });

                entity.ToTable("CT_BaiLamGiaiDau");

                entity.Property(e => e.IddeCauHoiGiaiDau).HasColumnName("IDDeCauHoiGiaiDau");

                entity.Property(e => e.IdbaiLam).HasColumnName("IDBaiLam");

                entity.Property(e => e.IdbaiTapCode).HasColumnName("IDBaiTapCode");

                entity.Property(e => e.Code).HasColumnType("text");

                entity.Property(e => e.SttcauHoi).HasColumnName("STTCauHoi");

                entity.HasOne(d => d.IdbaiLamNavigation)
                    .WithMany(p => p.CtBaiLamGiaiDaus)
                    .HasForeignKey(d => d.IdbaiLam)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_BaiLamGiaiDau_BaiLamGiaiDau");

                entity.HasOne(d => d.IdbaiTapCodeNavigation)
                    .WithMany(p => p.CtBaiLamGiaiDaus)
                    .HasForeignKey(d => d.IdbaiTapCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_BaiLamGiaiDau_BaiTapCode");
            });

            modelBuilder.Entity<CtBaiLamTracNghiem>(entity =>
            {
                entity.HasKey(e => new { e.IdbaiLam, e.IddeKiemTra, e.IdbaiTapTracNghiem });

                entity.ToTable("CT_BaiLamTracNghiem");

                entity.Property(e => e.IdbaiLam).HasColumnName("IDBaiLam");

                entity.Property(e => e.IddeKiemTra).HasColumnName("IDDeKiemTra");

                entity.Property(e => e.IdbaiTapTracNghiem).HasColumnName("IDBaiTapTracNghiem");

                entity.HasOne(d => d.IdbaiLamNavigation)
                    .WithMany(p => p.CtBaiLamTracNghiems)
                    .HasForeignKey(d => d.IdbaiLam)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_BaiLamTracNghiem_BaiLamKiemTra");

                entity.HasOne(d => d.IdbaiTapTracNghiemNavigation)
                    .WithMany(p => p.CtBaiLamTracNghiems)
                    .HasForeignKey(d => d.IdbaiTapTracNghiem)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_BaiLamTracNghiem_BaiTapTracNghiem");
            });

            modelBuilder.Entity<CtDeKiemTraCode>(entity =>
            {
                entity.HasKey(e => new { e.IddeKiemTra, e.IdBaiTapCode });

                entity.ToTable("CT_DeKiemTraCode");

                entity.Property(e => e.IddeKiemTra).HasColumnName("IDDeKiemTra");

                entity.Property(e => e.IdBaiTapCode).HasColumnName("ID_BaiTapCode");

                entity.Property(e => e.SttcauHoi).HasColumnName("STTCauHoi");

                entity.HasOne(d => d.IdBaiTapCodeNavigation)
                    .WithMany(p => p.CtDeKiemTraCodes)
                    .HasForeignKey(d => d.IdBaiTapCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_DeKiemTraCode_BaiTapCode1");

                entity.HasOne(d => d.IddeKiemTraNavigation)
                    .WithMany(p => p.CtDeKiemTraCodes)
                    .HasForeignKey(d => d.IddeKiemTra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_DeKiemTraCode_DeKiemTra");
            });

            modelBuilder.Entity<CtDeKiemTraTracNghiem>(entity =>
            {
                entity.HasKey(e => new { e.IdDeKiemTra, e.IdBaiTapTracNghiem });

                entity.ToTable("CT_DeKiemTraTracNghiem");

                entity.Property(e => e.IdDeKiemTra).HasColumnName("ID_DeKiemTra");

                entity.Property(e => e.IdBaiTapTracNghiem).HasColumnName("ID_BaiTapTracNghiem");

                entity.Property(e => e.SttCauHoi).HasColumnName("STT_CauHoi");

                entity.HasOne(d => d.IdBaiTapTracNghiemNavigation)
                    .WithMany(p => p.CtDeKiemTraTracNghiems)
                    .HasForeignKey(d => d.IdBaiTapTracNghiem)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_DeKiemTraTracNghiem_BaiTapTracNghiem");

                entity.HasOne(d => d.IdDeKiemTraNavigation)
                    .WithMany(p => p.CtDeKiemTraTracNghiems)
                    .HasForeignKey(d => d.IdDeKiemTra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_DeKiemTraTracNghiem_DeKiemTra");
            });

            modelBuilder.Entity<CtDeThiGiaiDau>(entity =>
            {
                entity.HasKey(e => new { e.IddeCauHoiGiaiDau, e.IdbaiTapCode })
                    .HasName("PK_CT_DeThiGiaiDau_1");

                entity.ToTable("CT_DeThiGiaiDau");

                entity.Property(e => e.IddeCauHoiGiaiDau).HasColumnName("IDDeCauHoiGiaiDau");

                entity.Property(e => e.IdbaiTapCode).HasColumnName("IDBaiTapCode");

                entity.Property(e => e.SttcauHoi).HasColumnName("STTCauHoi");

                entity.HasOne(d => d.IdbaiTapCodeNavigation)
                    .WithMany(p => p.CtDeThiGiaiDaus)
                    .HasForeignKey(d => d.IdbaiTapCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_DeThiGiaiDau_BaiTapCode");

                entity.HasOne(d => d.IddeCauHoiGiaiDauNavigation)
                    .WithMany(p => p.CtDeThiGiaiDaus)
                    .HasForeignKey(d => d.IddeCauHoiGiaiDau)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_DeThiGiaiDau_DeCauHoiGiaiDau");
            });

            modelBuilder.Entity<CtLamBaiTapCoThoiGian>(entity =>
            {
                entity.HasKey(e => new { e.UIdnguoiDung, e.IdbaiTap });

                entity.ToTable("CT_LamBaiTapCoThoiGian");

                entity.Property(e => e.UIdnguoiDung)
                    .HasMaxLength(50)
                    .HasColumnName("uIDNguoiDung");

                entity.Property(e => e.IdbaiTap).HasColumnName("IDBaiTap");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasColumnType("text");

                entity.Property(e => e.ThoiGianHoanThanh).HasColumnType("datetime");

                entity.HasOne(d => d.IdbaiTapNavigation)
                    .WithMany(p => p.CtLamBaiTapCoThoiGians)
                    .HasForeignKey(d => d.IdbaiTap)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_LamBaiTapCoThoiGian_BT_LuyenTap");

                entity.HasOne(d => d.UIdnguoiDungNavigation)
                    .WithMany(p => p.CtLamBaiTapCoThoiGians)
                    .HasForeignKey(d => d.UIdnguoiDung)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_LamBaiTapCoThoiGian_TaiKhoan");
            });

            modelBuilder.Entity<CtLuyenTap>(entity =>
            {
                entity.HasKey(e => new { e.UId, e.IdBaiTap });

                entity.ToTable("CT_LuyenTap");

                entity.Property(e => e.UId)
                    .HasMaxLength(50)
                    .HasColumnName("uID");

                entity.Property(e => e.IdBaiTap).HasColumnName("ID_BaiTap");

                entity.Property(e => e.Code).HasColumnType("text");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.HasOne(d => d.IdBaiTapNavigation)
                    .WithMany(p => p.CtLuyenTaps)
                    .HasForeignKey(d => d.IdBaiTap)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_LuyenTap_BT_LuyenTap");

                entity.HasOne(d => d.UIdNavigation)
                    .WithMany(p => p.CtLuyenTaps)
                    .HasForeignKey(d => d.UId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_LuyenTap_TaiKhoan");
            });

            modelBuilder.Entity<CtPhongHoc>(entity =>
            {
                entity.HasKey(e => new { e.UidNguoiDunng, e.Idphong });

                entity.ToTable("CT_PhongHoc");

                entity.Property(e => e.UidNguoiDunng)
                    .HasMaxLength(50)
                    .HasColumnName("UIdNguoiDunng");

                entity.Property(e => e.Idphong)
                    .HasMaxLength(10)
                    .HasColumnName("IDPhong");

                entity.Property(e => e.NgayThamGia).HasColumnType("date");

                entity.HasOne(d => d.IdphongNavigation)
                    .WithMany(p => p.CtPhongHocs)
                    .HasForeignKey(d => d.Idphong)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_PhongHoc_PhongHoc");

                entity.HasOne(d => d.UidNguoiDunngNavigation)
                    .WithMany(p => p.CtPhongHocs)
                    .HasForeignKey(d => d.UidNguoiDunng)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_PhongHoc_TaiKhoan");
            });

            modelBuilder.Entity<CtThamGiaGiaiDau>(entity =>
            {
                entity.HasKey(e => new { e.IdgiaiDau, e.UIdnguoiDung });

                entity.ToTable("CT_ThamGiaGiaiDau");

                entity.Property(e => e.IdgiaiDau).HasColumnName("IDGiaiDau");

                entity.Property(e => e.UIdnguoiDung)
                    .HasMaxLength(50)
                    .HasColumnName("uIDNguoiDung");

                entity.Property(e => e.NgayThamGia).HasColumnType("date");

                entity.HasOne(d => d.IdgiaiDauNavigation)
                    .WithMany(p => p.CtThamGiaGiaiDaus)
                    .HasForeignKey(d => d.IdgiaiDau)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_ThamGiaGiaiDau_GiaiDau");

                entity.HasOne(d => d.UIdnguoiDungNavigation)
                    .WithMany(p => p.CtThamGiaGiaiDaus)
                    .HasForeignKey(d => d.UIdnguoiDung)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CT_ThamGiaGiaiDau_TaiKhoan");
            });

            modelBuilder.Entity<DaHoc>(entity =>
            {
                entity.HasKey(e => new { e.IdLyThuyet, e.UIdNguoiDung });

                entity.ToTable("DaHoc");

                entity.Property(e => e.IdLyThuyet).HasColumnName("ID_LyThuyet");

                entity.Property(e => e.UIdNguoiDung)
                    .HasMaxLength(50)
                    .HasColumnName("uID_NguoiDung");

                entity.HasOne(d => d.IdLyThuyetNavigation)
                    .WithMany(p => p.DaHocs)
                    .HasForeignKey(d => d.IdLyThuyet)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DaHoc_LyThuyet");

                entity.HasOne(d => d.UIdNguoiDungNavigation)
                    .WithMany(p => p.DaHocs)
                    .HasForeignKey(d => d.UIdNguoiDung)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DaHoc_TaiKhoan");
            });

            modelBuilder.Entity<DeCauHoiGiaiDau>(entity =>
            {
                entity.HasKey(e => e.IddeCauHoiGiaiDau);

                entity.ToTable("DeCauHoiGiaiDau");

                entity.Property(e => e.IddeCauHoiGiaiDau)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("IDDeCauHoiGiaiDau");

                entity.Property(e => e.IdgiaiDau).HasColumnName("IDGiaiDau");

                entity.Property(e => e.NgayTao).HasColumnType("date");

                entity.HasOne(d => d.IddeCauHoiGiaiDauNavigation)
                    .WithOne(p => p.DeCauHoiGiaiDau)
                    .HasForeignKey<DeCauHoiGiaiDau>(d => d.IddeCauHoiGiaiDau)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DeCauHoiGiaiDau_GiaiDau");
            });

            modelBuilder.Entity<DeKiemTra>(entity =>
            {
                entity.HasKey(e => e.IddeKiemTra);

                entity.ToTable("DeKiemTra");

                entity.Property(e => e.IddeKiemTra)
                    .ValueGeneratedNever()
                    .HasColumnName("IDDeKiemTra");

                entity.Property(e => e.Idphong)
                    .HasMaxLength(10)
                    .HasColumnName("IDPhong");

                entity.Property(e => e.MoTa).HasColumnType("text");

                entity.Property(e => e.NgayHetHan).HasColumnType("datetime");

                entity.Property(e => e.NgayTao).HasColumnType("datetime");

                entity.Property(e => e.TrangThai).HasMaxLength(20);

                entity.HasOne(d => d.IdphongNavigation)
                    .WithMany(p => p.DeKiemTras)
                    .HasForeignKey(d => d.Idphong)
                    .HasConstraintName("FK_DeKiemTra_PhongHoc");
            });

            modelBuilder.Entity<GiaiDau>(entity =>
            {
                entity.HasKey(e => e.IdgiaiDau);

                entity.ToTable("GiaiDau");

                entity.Property(e => e.IdgiaiDau).HasColumnName("IDGiaiDau");

                entity.Property(e => e.MoTa)
                    .IsRequired()
                    .HasColumnType("text");

                entity.Property(e => e.Tag)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.TenGiaiDau)
                    .IsRequired()
                    .HasColumnType("text");

                entity.Property(e => e.ThoiGianBatDau).HasColumnType("datetime");

                entity.Property(e => e.ThoiGianKetThuc).HasColumnType("datetime");
            });

            modelBuilder.Entity<LoaiTaiKhoan>(entity =>
            {
                entity.ToTable("LoaiTaiKhoan");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.MoTa)
                    .HasMaxLength(10)
                    .IsFixedLength(true);

                entity.Property(e => e.TenLoaiTaiKhoan)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<LyThuyet>(entity =>
            {
                entity.ToTable("LyThuyet");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.IdMonHoc).HasColumnName("ID_MonHoc");

                entity.Property(e => e.NoiDung)
                    .IsRequired()
                    .HasColumnType("ntext");

                entity.Property(e => e.TieuDe)
                    .IsRequired()
                    .HasMaxLength(400);

                entity.HasOne(d => d.IdMonHocNavigation)
                    .WithMany(p => p.LyThuyets)
                    .HasForeignKey(d => d.IdMonHoc)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LyThuyet_MonHoc");
            });

            modelBuilder.Entity<MonHoc>(entity =>
            {
                entity.ToTable("MonHoc");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.HinhAnh).HasMaxLength(50);

                entity.Property(e => e.MoTa)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.TenMonHoc)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<PhongHoc>(entity =>
            {
                entity.HasKey(e => e.Idphong);

                entity.ToTable("PhongHoc");

                entity.Property(e => e.Idphong)
                    .HasMaxLength(10)
                    .HasColumnName("IDPhong");

                entity.Property(e => e.IdchuPhong)
                    .HasMaxLength(50)
                    .HasColumnName("IDChuPhong");

                entity.Property(e => e.TenPhong).HasMaxLength(50);

                entity.HasOne(d => d.IdchuPhongNavigation)
                    .WithMany(p => p.PhongHocs)
                    .HasForeignKey(d => d.IdchuPhong)
                    .HasConstraintName("FK_PhongHoc_TaiKhoan");
            });

            modelBuilder.Entity<TaiKhoan>(entity =>
            {
                entity.HasKey(e => e.UidTaiKhoan);

                entity.ToTable("TaiKhoan");

                entity.Property(e => e.UidTaiKhoan)
                    .HasMaxLength(50)
                    .HasColumnName("UIdTaiKhoan");

                entity.Property(e => e.Email)
                    .HasMaxLength(40)
                    .IsFixedLength(true);

                entity.Property(e => e.GioiTinh).HasMaxLength(5);

                entity.Property(e => e.HoTen).HasMaxLength(50);

                entity.Property(e => e.IdloaiTaiKhoan).HasColumnName("IDLoaiTaiKhoan");

                entity.Property(e => e.LinkAvatar).HasColumnType("text");

                entity.Property(e => e.NgaySinh).HasColumnType("date");

                entity.Property(e => e.TenHienThi).HasMaxLength(50);

                entity.Property(e => e.Truong).HasMaxLength(50);

                entity.HasOne(d => d.IdloaiTaiKhoanNavigation)
                    .WithMany(p => p.TaiKhoans)
                    .HasForeignKey(d => d.IdloaiTaiKhoan)
                    .HasConstraintName("FK_TaiKhoan_LoaiTaiKhoan");
            });

            modelBuilder.Entity<TestCaseBtcode>(entity =>
            {
                entity.ToTable("TestCase_BTCode");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.IdBaiTap).HasColumnName("ID_BaiTap");

                entity.Property(e => e.Input)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("input");

                entity.Property(e => e.Output)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("output");

                entity.HasOne(d => d.IdBaiTapNavigation)
                    .WithMany(p => p.TestCaseBtcodes)
                    .HasForeignKey(d => d.IdBaiTap)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TestCase_BTCode_BaiTapCode");
            });

            modelBuilder.Entity<TestCaseLuyenTap>(entity =>
            {
                entity.ToTable("TestCase_LuyenTap");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.IdBtluyenTap).HasColumnName("ID_BTLuyenTap");

                entity.Property(e => e.Input)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("input");

                entity.Property(e => e.Output)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("output");

                entity.HasOne(d => d.IdBtluyenTapNavigation)
                    .WithMany(p => p.TestCaseLuyenTaps)
                    .HasForeignKey(d => d.IdBtluyenTap)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TestCase_LuyenTap_BT_LuyenTap1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
