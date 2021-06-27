namespace Campus.Domain.Core.Interfaces
{
    public interface IConfigurationProviderFactory
    {
        IConfigurationProvider CreateProvider();
    }
}