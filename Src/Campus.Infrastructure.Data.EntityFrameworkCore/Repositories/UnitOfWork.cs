using System.Threading.Tasks;
using Campus.Domain.Interfaces.Interfaces;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        public void Dispose()
        {
            throw new System.NotImplementedException();
        }

        public async Task CommitAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task RollbackAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}