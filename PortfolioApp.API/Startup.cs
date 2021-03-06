using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PortfolioApp.API.Data;
using PortfolioApp.API.Helpers;
using Newtonsoft;

namespace PortfolioApp.API
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
            services.AddDbContext<DataContext>(x=> x.UseSqlite(Configuration.GetConnectionString("DefaultConnectionSqlite")));
            
            services.AddControllers().AddNewtonsoftJson(options =>
                       options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            services.AddSwaggerGen(c =>
            {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "PortfolioApp.API", Version = "v1" });
            });

            //--> Permet d'utliser le policie pour géréer l'accée à notre service web
            services.AddCors();

            //--> Configurer CloudinarySettings
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));

            //--> Ajouter serverice AutoMapper
            services.AddAutoMapper();

            //--> Ajouter TrialData
            services.AddTransient<TrialData>();


            //--> Ajouter "IAuthRepository" et "AuthRepository" dans fichier "strtup.cs"
            services.AddScoped<IAuthRepository,AuthRepository>();

             //--> Ajouter "IPortfolioRepository" et "PortfolioRepository" dans fichier "strtup.cs"
            services.AddScoped<IPortfolioRepository,PortfolioRepository>();

            services.AddScoped<IProjectRepository,ProjectRepository>();


            //--> Ajouter Authentification 
             services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
             .AddJwtBearer(Options =>{
                 Options.TokenValidationParameters = new TokenValidationParameters{
                     ValidateIssuerSigningKey = true,
                     IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Secret").Value)),
                     ValidateIssuer = false,
                     ValidateAudience = false
                 };
             });
          
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, TrialData trialData )
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "PortfolioApp.API v1"));
            }
            else
            {
              app.UseExceptionHandler(BuilderExtensions =>
              {
                  BuilderExtensions.Run(async context =>{
                    context.Response.StatusCode =(int)HttpStatusCode.InternalServerError;
                    var error = context.Features.Get<IExceptionHandlerFeature>();
                    if (error != null)
                    {
                        context.Response.AddApplicationError(error.Error.Message);
                        await context.Response.WriteAsync(error.Error.Message);
                    }
                  });
                  
              });
            }

            // //--> Ajouter UserTrialData
           // trialData.TrialUsers();
            // //--> Ajouter ProjectTrialData
           // trialData.TrialProjects();
            // //--> Ajouter SkillTrialData
          //  trialData.TrialSkills();


            //--> Permet d'avoir autorisation pour tous les site d'accédé a notre service web 
            app.UseCors(x=> x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
