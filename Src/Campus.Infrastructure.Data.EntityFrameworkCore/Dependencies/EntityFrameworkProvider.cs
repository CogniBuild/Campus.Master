using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

using Campus.Domain.Interfaces.Interfaces;
using Campus.Infrastructure.Data.EntityFrameworkCore.Context;
using Campus.Infrastructure.Data.EntityFrameworkCore.Repositories;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Dependencies
{
    public static class EntityFrameworkProvider
    {
        public static void AddSqlServerStorage(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<CampusContext>(options => options.UseSqlServer(connectionString));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IAppUserRepository, AppUserRepository>();
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<ITaskRepository, TaskRepository>();
        }
    }
}