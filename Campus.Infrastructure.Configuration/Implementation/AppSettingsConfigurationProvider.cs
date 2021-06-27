using System;
using Microsoft.Extensions.Configuration;
using ICampusConfigurationProvider = Campus.Services.Interfaces.Interfaces.Configuration.IConfigurationProvider;

namespace Campus.Infrastructure.Configuration.Implementation
{
    public class AppSettingsConfigurationProvider : ICampusConfigurationProvider
    {
        private IConfiguration Configuration { get; }
        
        public AppSettingsConfigurationProvider(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        
        public T GetConfigurationValue<T>(string key, Func<string, T> formatter)
        {
            var appSettingsConfiguration = Configuration.GetSection(key).Value;
            return formatter(appSettingsConfiguration);
        }
    }
}