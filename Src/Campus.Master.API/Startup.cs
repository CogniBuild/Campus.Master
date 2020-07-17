using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Reflection;
using Campus.Infrastructure.Data.Dependencies;
using Campus.Infrastructure.Business.Dependencies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.IdentityModel.Tokens;
using Campus.Master.API.Filters;
using Campus.Master.API.Helpers.Contracts;
using Campus.Master.API.Helpers.Implementations;

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
        
        public void ConfigureServices(IServiceCollection services, IWebHostEnvironment env)
        {
            var inDevelopment = env.IsDevelopment();
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
                        Name = "Authorization",
                        Type = SecuritySchemeType.ApiKey,
                        Scheme = "Bearer"
                    });
                
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        }, 
                        new List<string>()
                    },
                });

                c.IncludeXmlComments(xmlDocPath);
            });
            
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(bearer => {
                    bearer.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                        GetConfigurationValue(
                            "Security:EncryptionSecret",
                            inDevelopment,
                            Convert.ToString)
                        )),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddSqlServerStorage(GetConfigurationValue(
                "ConnectionStrings:Default",
                inDevelopment,
                Convert.ToString));
            services.AddServices();
            services.AddTransient<ITokenBuilder>(builder => 
                new JwtTokenBuilder(GetConfigurationValue(
                    "Security:EncryptionSecret",
                    inDevelopment,
                    Convert.ToString)));
            services.AddScoped(limiter => 
                new QueryItemsLimiter(GetConfigurationValue(
                    "Security:EncryptionSecret",
                    inDevelopment,
                    Convert.ToInt32)));
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
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
            
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.Run(async (context) =>
            {
                context.Response.ContentType = "text/html";
                await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));
            });
        }

        private T GetConfigurationValue<T>(string key, bool inDevelopment, Func<string, T> formatter)
        {
            var appSettingsConfiguration = Configuration.GetSection(key).Value;
            return inDevelopment ? 
                formatter(appSettingsConfiguration) :
                formatter(Environment.GetEnvironmentVariable(appSettingsConfiguration));
        }
    }
}