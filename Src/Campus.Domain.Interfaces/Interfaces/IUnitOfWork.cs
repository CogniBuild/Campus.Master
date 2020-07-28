using System;
using System.Threading.Tasks;

namespace Campus.Domain.Interfaces.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        Task CommitAsync();
    }
}