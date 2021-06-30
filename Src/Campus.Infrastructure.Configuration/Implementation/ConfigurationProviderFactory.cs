using Campus.Services.Interfaces.Interfaces.Configuration;
using Microsoft.Extensions.Configuration;
using ICampusConfigurationProvider = Campus.Services.Interfaces.Interfaces.Configuration.IConfigurationProvider;

namespace Campus.Infrastructure.Configuration.Implementation
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