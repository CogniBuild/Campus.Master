namespace Campus.Master.API.Helpers.Contracts
{
    public interface IConfigurationProviderFactory
    {
        IConfigurationProvider CreateProvider();
    }
}