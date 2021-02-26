using Microsoft.Extensions.DependencyInjection;

using Campus.Infrastructure.Business.Services;
using Campus.Services.Interfaces.Interfaces;

using Campus.Master.API.Helpers.Contracts;
using Campus.Master.API.Helpers.Implementations;

namespace Campus.Master.IntegrationTests.Utils
{
    public static class ServiceCollectionBuilder
    {
        public static ServiceCollection BuildCollection()
        {
            var serviceCollection = new ServiceCollection();

            serviceCollection.AddScoped<IAuthenticationService, AuthenticationService>();
            serviceCollection.AddScoped<IProfileService, ProfileService>();
            serviceCollection.AddScoped<IProjectService, ProjectService>();
            serviceCollection.AddScoped<ITaskService, TaskService>();

            serviceCollection.AddTransient<ITokenBuilder>(builder => new JwtTokenBuilder("test encryption key"));

            return serviceCollection;
        }
    }
}