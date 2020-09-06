using System;
using Microsoft.Extensions.Configuration;
using CampusProvider = Campus.Master.API.Helpers.Contracts.IConfigurationProvider;

namespace Campus.Master.API.Helpers.Implementations
{
    public class AppSettingsConfigurationProvider : CampusProvider
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