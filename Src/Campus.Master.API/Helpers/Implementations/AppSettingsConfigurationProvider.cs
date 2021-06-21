using System;
using Microsoft.Extensions.Configuration;
using ICampusConfigurationProvider = Campus.Domain.Core.Interfaces.IConfigurationProvider;

namespace Campus.Master.API.Helpers.Implementations
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