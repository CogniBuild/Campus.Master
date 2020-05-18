using System.Data;
using Campus.Domain.Interfaces.Interfaces;

namespace Campus.Infrastructure.Data.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(IDbConnection connection)
        {
            connection.Open();
            _connection = connection;
        }

        private IDbConnection _connection;
        private IDbTransaction _transaction;

        public IDbConnection Connection => _connection;

        public IDbTransaction Transaction => _transaction;

        public void Begin()
        {
            _transaction = _connection.BeginTransaction();
        }

        public void Commit()
        {
            _transaction.Commit();
            Dispose();
        }

        public void Rollback()
        {
            _transaction.Rollback();
            Dispose();
        }

        public void Dispose()
        {
            if (_transaction != null)
            {
                _transaction.Dispose();
                _connection.Close();
            }
            _transaction = null;
        }
    }
}