using System;
using System.Threading.Tasks;
using Campus.Domain.Interfaces.Interfaces;
using Campus.Infrastructure.Data.EntityFrameworkCore.Context;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Repositories
{
    public sealed class UnitOfWork : IUnitOfWork
    {
        private readonly CampusContext _context;
        
        public UnitOfWork(CampusContext context)
        {
            _context = context;
        }
        
        private bool _disposed;

        private void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task RollbackAsync() => await Task.CompletedTask;
    }
}