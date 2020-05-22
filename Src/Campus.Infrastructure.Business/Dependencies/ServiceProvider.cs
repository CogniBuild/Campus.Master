using Campus.Infrastructure.Business.Services;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Campus.Infrastructure.Business.Dependencies
{
    public static class ServiceProvider
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped<IProfileService, ProfileService>();
        }
    }
}