using System.Data;
using System.Data.SqlClient;
using Campus.Domain.Interfaces.Interfaces;
using Campus.Infrastructure.Data.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Campus.Infrastructure.Data.Dependencies
{
    public static class StorageProvider
    {
        public static void AddSqlStorage(this IServiceCollection services, string connectionString)
        {
            services.AddScoped<IDbConnection>(provider => new SqlConnection(connectionString));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IAppUserRepository, AppUserRepository>();
        }
    }
}