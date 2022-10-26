using CodeSampleAPI.Authentication;
using CodeSampleAPI.Data;
using CodeSampleAPI.Service;
using FirebaseAdmin;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeSampleAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();

           // services.AddSingleton(FirebaseApp.Create());

            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                //  .AddScheme<AuthenticationSchemeOptions, FireBaseAuthenticationHandler>(JwtBearerDefaults.AuthenticationScheme, (o) => { });

           services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
           .AddJwtBearer(options =>
        {
            options.Authority = "https://securetoken.google.com/first-web-91c0f";
           options.TokenValidationParameters = new TokenValidationParameters
           {
                ValidateIssuer = true,
                ValidIssuer = "https://securetoken.google.com/first-web-91c0f",
                ValidateAudience = true,
                ValidAudience = "first-web-91c0f",
                ValidateLifetime = true
            };
        });

            services.AddHttpContextAccessor();
            services.AddSingleton<IUriService>(o =>
            {
                var accessor = o.GetRequiredService<IHttpContextAccessor>();
                var request = accessor.HttpContext.Request;
                var uri = string.Concat(request.Scheme, "://", request.Host.ToUriComponent());
                return new UriService(uri);
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "CodeSampleAPI", Version = "v1" });
            });
            services.AddDbContext<CodeSampleContext>();
            services.AddTransient<IRunCodeService, RunCodeService>();
            services.AddTransient<ITestCaseBTService, TestCaseBTService>();
            services.AddTransient<ITestCaseLuyenTapService, TestCaseLuyenTapService>();
            services.AddTransient<IMonHocService, MonHocService>();
            services.AddTransient<IBaiTapCodeService, BaiTapCodeService>();
            services.AddTransient<IBTLuyenTapService, BTLuyenTapService>();
            services.AddTransient<ILyThuyetService, LyThuyetService>();
            services.AddTransient<IBaiTapTracNghiemService, BaiTapTracNghiemService>();
            services.AddTransient<IPhongHocService, PhongHocService>();
            services.AddTransient<IDeKiemTraService, DeKiemTraService>();
            services.AddTransient<IBaiLamKiemTraService, BaiLamKiemTraService>();
            services.AddTransient<INguoiDungService, NguoiDungService>();
            services.AddTransient<IGiangVienService, GiangVienService>();
            services.AddTransient<IAdminService, AdminService>();
            services.AddTransient<ITaiKhoanService, TaiKhoanService>();
            services.AddTransient<IGiaiDauService, GiaiDauService>();


            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CodeSampleAPI v1"));
            }

            app.UseCors( builder =>
            {
                builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
