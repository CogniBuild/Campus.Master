using Microsoft.Extensions.DependencyInjection;

namespace Campus.Master.IntegrationTests.Utils
{
    public static class ServiceLocator
    {
        public static T Get<T>(ServiceProvider provider) =>
            (T) provider.GetService(typeof(T));
    }
}