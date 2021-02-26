using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Campus.Infrastructure.Data.EntityFrameworkCore.Context;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Dependencies
{
    public static class EntityFrameworkProvider
    {
        public static void AddSqlServerStorage(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<CampusContext>(options => options.UseSqlServer(connectionString));
        }

        public static void AddPostgreSqlStorage(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<CampusContext>(options => options.UseNpgsql(connectionString));
        }
    }
}