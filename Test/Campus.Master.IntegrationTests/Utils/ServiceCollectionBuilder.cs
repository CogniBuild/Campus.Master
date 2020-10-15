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

namespace Campus.Master.IntegrationTests.Utils
{
    public static class ServiceCollectionBuilder
    {
        public static ServiceCollection BuildCollection()
        {
            var serviceCollection = new ServiceCollection();

            serviceCollection.AddScoped<IUnitOfWork, UnitOfWork>();
            serviceCollection.AddScoped<IAppUserRepository, AppUserRepository>();
            serviceCollection.AddScoped<IProjectRepository, ProjectRepository>();
            serviceCollection.AddScoped<ITaskRepository, TaskRepository>();

            serviceCollection.AddScoped<IAuthenticationService, AuthenticationService>();
            serviceCollection.AddScoped<IProfileService, ProfileService>();
            serviceCollection.AddScoped<IProjectService, ProjectService>();
            serviceCollection.AddScoped<ITaskService, TaskService>();

            serviceCollection.AddTransient<ITokenBuilder>(builder => new JwtTokenBuilder("test encryption key"));

            return serviceCollection;
        }
    }
}