using Campus.Master.API.Helpers.Contracts;
using Microsoft.Extensions.Configuration;
using IConfigurationProvider = Campus.Master.API.Helpers.Contracts.IConfigurationProvider;

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
        
        public IConfigurationProvider CreateProvider()
        {
            if (InDevelopmentMode)
                return new AppSettingsConfigurationProvider(Configuration);
            else
                return new EnvironmentConfigurationProvider(Configuration);
        }
    }
}