using System;
using Microsoft.Extensions.Configuration;
using CampusProvider = Campus.Master.API.Helpers.Contracts.IConfigurationProvider;

namespace Campus.Master.API.Helpers.Implementations
{
    public class EnvironmentConfigurationProvider : CampusProvider
    {        
        private IConfiguration Configuration { get; }
        
        public EnvironmentConfigurationProvider(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        
        public T GetConfigurationValue<T>(string key, Func<string, T> formatter)
        {
            var appSettingsConfiguration = Configuration.GetSection(key).Value;
            return formatter(Environment.GetEnvironmentVariable(appSettingsConfiguration));
        }
    }
}