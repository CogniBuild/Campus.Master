using Campus.Services.Core;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Campus.Services.Dependencies
{
    public static class ServiceExtensions
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped<IClassroomService, ClassroomService>();
        }
    }
}