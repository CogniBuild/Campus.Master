using System;

namespace Campus.Master.API.Helpers.Contracts
{
    public interface IConfigurationProvider
    {
        T GetConfigurationValue<T>(string key, Func<string, T> formatter);
    }
}