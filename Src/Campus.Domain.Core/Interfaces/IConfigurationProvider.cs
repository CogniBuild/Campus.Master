using System;

namespace Campus.Domain.Core.Interfaces
{
    public interface IConfigurationProvider
    {
        T GetConfigurationValue<T>(string key, Func<string, T> formatter);
    }
}