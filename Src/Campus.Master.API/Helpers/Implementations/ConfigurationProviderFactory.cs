using Campus.Domain.Core.Interfaces;
using Microsoft.Extensions.Configuration;
using ICampusConfigurationProvider = Campus.Domain.Core.Interfaces.IConfigurationProvider;

namespace Campus.Master.API.Helpers.Implementations
{
    public class ConfigurationProviderFactory : IConfigurationProviderFactory
    {
        private IConfiguration Configuration { get; }
        private bool InDevelopmentMode { get; }
        
        public ConfigurationProviderFactory(IConfiguration configuration, bool inDevelopmentMode)
        {
            Configuration = configuration;
            InDevelopmentMode = inDevelopmentMode;
        }
        
        public ICampusConfigurationProvider CreateProvider()
        {
            if (InDevelopmentMode)
                return new AppSettingsConfigurationProvider(Configuration);
            else
                return new EnvironmentConfigurationProvider(Configuration);
        }
    }
}