using System;
using System.IO;
using System.Linq;
using System.Reflection;
using Campus.Infrastructure.Data.Dependencies;
using Campus.Infrastructure.Business.Dependencies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace Campus.Master.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private const string ApiTitle = "Campus.Master Development mode API";
        private const string ApiVersion = "v1.2";
        
        public void ConfigureServices(IServiceCollection services)
        {
            string xmlDocFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            string xmlDocPath = Path.Combine(AppContext.BaseDirectory, xmlDocFile);

            services.AddControllers();
            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc(ApiVersion, new OpenApiInfo {Title = ApiTitle, Version = ApiVersion});

                c.AddSecurityDefinition("Bearer",
                    new OpenApiSecurityScheme
                    {
                        In = ParameterLocation.Header,
                        Description = "Please enter into field the word 'Bearer' following by space and JWT",
                        Name = "Authorization", Type = SecuritySchemeType.ApiKey
                    });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {new OpenApiSecurityScheme {Name = "Bearer"}, Enumerable.Empty<string>().ToList()},
                });

                c.IncludeXmlComments(xmlDocPath);
            });

            services.AddSqlStorage(Configuration["ConnectionStrings:Default"]);
            services.AddServices();
        }
        
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors(builder =>
                    builder.WithOrigins(Configuration["DevUI:ProxyUrl"]).AllowAnyHeader().AllowAnyMethod());
                app.UseSwagger();
                app.UseSwaggerUI(c => { c.SwaggerEndpoint(Configuration["Swagger:StaticRoute"], ApiTitle); });
            }
            else
            {
                app.UseHttpsRedirection();
            }

            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}