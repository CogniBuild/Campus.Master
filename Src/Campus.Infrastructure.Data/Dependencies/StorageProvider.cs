using System.Data;
using System.Data.SqlClient;
using Campus.Domain.Interfaces.Interfaces;
using Campus.Infrastructure.Data.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

namespace Campus.Infrastructure.Data.Dependencies
{
    public static class StorageProvider
    {
        public static void AddSqlServerStorage(this IServiceCollection services, string connectionString)
        {
            services.AddScoped<IDbConnection>(provider => new SqlConnection(connectionString));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IAppUserRepository, AppUserRepository>();
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<ITaskRepository, TaskRepository>();
        }

        public static void AddPostgreSqlStorage(this IServiceCollection services, string connectionString)
        {
            services.AddScoped<IDbConnection>(provider => new NpgsqlConnection(connectionString));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IAppUserRepository, AppUserRepository>();
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<ITaskRepository, TaskRepository>();
        }
    }
}