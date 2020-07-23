using System.Data;
using System.Threading.Tasks;
using Campus.Domain.Interfaces.Interfaces;

namespace Campus.Infrastructure.Data.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDbConnection _connection;
        
        public UnitOfWork(IDbConnection connection)
        {
            _connection = connection;
        }

        public void Dispose()
        {
            _connection.Close();
        }

        public async Task CommitAsync() => await Task.CompletedTask;

        public async Task RollbackAsync() => await Task.CompletedTask;
    }
}