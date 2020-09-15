using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

using Campus.Domain.Interfaces.Interfaces;
using Campus.Infrastructure.Data.EntityFrameworkCore.Context;
using Campus.Infrastructure.Data.EntityFrameworkCore.Repositories;
using Campus.Infrastructure.Business.Services;
using Campus.Services.Interfaces.Interfaces;

using Campus.Master.API.Helpers.Contracts;
using Campus.Master.API.Helpers.Implementations;

namespace Campus.Master.IntegrationTests
{
    public class BaseTest : IAsyncDisposable
    {
        protected ServiceProvider Provider { get; }

        protected BaseTest()
        {
            var serviceCollection = new ServiceCollection();

            serviceCollection.AddDbContext<CampusContext>(
                options => options.UseInMemoryDatabase(databaseName: "CampusDb"));

            serviceCollection.AddScoped<IUnitOfWork, UnitOfWork>();
            serviceCollection.AddScoped<IAppUserRepository, AppUserRepository>();
            serviceCollection.AddScoped<IProjectRepository, ProjectRepository>();
            serviceCollection.AddScoped<ITaskRepository, TaskRepository>();

            serviceCollection.AddScoped<IAuthenticationService, AuthenticationService>();
            serviceCollection.AddScoped<IProfileService, ProfileService>();
            serviceCollection.AddScoped<IProjectService, ProjectService>();
            serviceCollection.AddScoped<ITaskService, TaskService>();

            serviceCollection.AddTransient<ITokenBuilder>(builder => new JwtTokenBuilder("test encryption key"));

            Provider = serviceCollection.BuildServiceProvider();
        }

        public async ValueTask DisposeAsync()
        {
            await OnDestroyAsync();
            await Provider.DisposeAsync();
        }

        protected virtual async Task OnDestroyAsync() =>
            await Task.CompletedTask;
    }
}
