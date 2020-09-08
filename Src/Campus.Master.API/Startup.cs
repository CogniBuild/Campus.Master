using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Reflection;
using Campus.Infrastructure.Business.Dependencies;
using Campus.Infrastructure.Data.EntityFrameworkCore.Dependencies;
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
using Campus.Master.API.Logging.File;
using Campus.Master.API.Validators.Profile;
using Campus.Services.Interfaces.DTO.Profile;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.Extensions.Logging;
using ICampusConfigurationProvider = Campus.Master.API.Helpers.Contracts.IConfigurationProvider;

namespace Campus.Master.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            SettingsProvider = new ConfigurationProviderFactory(
                    Configuration,
                    Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
                .CreateProvider();
        }

        private IConfiguration Configuration { get; }

        private ICampusConfigurationProvider SettingsProvider { get; }

        private const string ApiTitle = "Campus.Master Development mode API";
        private const string ApiVersion = "v1.2";
        
        public void ConfigureServices(IServiceCollection services)
        {
            string xmlDocFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            string xmlDocPath = Path.Combine(AppContext.BaseDirectory, xmlDocFile);
            
            services.AddControllers(options =>
            {
                options.Filters.Add<GlobalExceptionFilterAttribute>();
            }).AddFluentValidation();
            
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
                            SettingsProvider.GetConfigurationValue("Security:EncryptionSecret", Convert.ToString)
                        )),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            var connectionProviderName =
                SettingsProvider.GetConfigurationValue("ConnectionStrings:Provider", Convert.ToString);
            var connectionString = SettingsProvider.GetConfigurationValue("ConnectionStrings:Default", Convert.ToString);

            switch (connectionProviderName)
            {
                case "POSTGRES":
                    services.AddPostgreSqlStorage(connectionString);
                    break;
                case "SQLSERVER":
                    services.AddSqlServerStorage(connectionString);
                    break;
            }

            services.AddServices();
            
            services.AddTransient<ITokenBuilder>(builder => 
                new JwtTokenBuilder(
                    SettingsProvider.GetConfigurationValue("Security:EncryptionSecret", Convert.ToString)
                )
            );
            
            services.AddScoped(limiter =>
                new QueryItemsLimiter(
                    SettingsProvider.GetConfigurationValue("Endpoints:QueryLimiter", Convert.ToInt32)
                )
            );

            services.AddTransient<IValidator<ProfileRegistrationDto>, ProfileRegistrationValidator>();
            services.AddTransient<IValidator<ProfileAuthenticationDto>, ProfileAuthenticationValidator>();
            services.AddTransient<IValidator<ProfileEditingDto>, ProfileEditingValidator>();
        }
        
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint(
                        SettingsProvider.GetConfigurationValue("Swagger:StaticRoute", Convert.ToString), 
                        ApiTitle
                    );
                });
                logger.AddFile(SettingsProvider.GetConfigurationValue("Logging:FilePath", Convert.ToString));
            }
            else
            {
                app.UseHttpsRedirection();
            }

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.Run(async (context) =>
            {
                context.Response.ContentType = "text/html";
                await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));
            });
        }
    }
}