using System;
using Campus.Services.Implementation.Core;
using Campus.Services.Implementation.Infrastructure;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace Campus.Services.Implementation.Dependencies
{
    public static class ServiceExtensions
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped<IClassroomService, ClassroomService>();
            services.AddScoped<IProfileService, ProfileService>();
            services.AddScoped<IEventService, EventService>();
            services.AddScoped<IFakeDetectorService, FakeDetectorService>();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 8;

                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;

                options.User.RequireUniqueEmail = true;
            });
        }
    }
}