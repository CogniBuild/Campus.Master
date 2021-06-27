using System;

namespace Campus.Services.Interfaces.Interfaces.Configuration
{
    public interface IConfigurationProvider
    {
        T GetConfigurationValue<T>(string key, Func<string, T> formatter);
    }
}