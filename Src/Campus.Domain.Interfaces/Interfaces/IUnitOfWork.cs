using System.Threading.Tasks;

namespace GamersParadise.Domain.Interfaces.Interfaces
{
    public interface IUnitOfWork
    {
        Task CommitAsync();
    }
}