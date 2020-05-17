using System.Data;
using System.Data.SqlClient;
using Campus.Domain.Interfaces.Interfaces;
using Campus.Infrastructure.Business.Services;
using Campus.Infrastructure.Data.Repositories;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Campus.Infrastructure.Data.Dependencies
{
    public static class ServicesExtensions
    {
        public static void AddDataProvides(this IServiceCollection services,
            string connectionString)
        {
            services.AddScoped<IDbConnection>(c => new SqlConnection(connectionString));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IAppUserRepository, AppUserRepository>();
        }

        public static void AddBusinessProviders(this IServiceCollection services)
        {
            services.AddScoped<IProfileService, ProfileService>();
        }
    }
}