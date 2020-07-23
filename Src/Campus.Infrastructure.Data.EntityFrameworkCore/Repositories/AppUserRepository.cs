using System.Linq;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Domain.Interfaces.Interfaces;
using Campus.Infrastructure.Data.EntityFrameworkCore.Context;
using Microsoft.EntityFrameworkCore;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Repositories
{
    public class AppUserRepository : IAppUserRepository
    {
        private readonly CampusContext _context;
        
        public AppUserRepository(CampusContext context)
        {
            _context = context;
        }
        
        public async Task<int> CreateAppUserAsync(AppUser appUser)
        {
            await _context.Users.AddRangeAsync(appUser);
            return 1;
        }

        public async Task<AppUser> GetAppUserByIdAsync(int id)
        {
            return await _context.Users.Where(u => u.Id == id)
                                .FirstOrDefaultAsync();
        }

        public async Task<AppUser> GetAppUserByLoginAsync(string login)
        {
            return await _context.Users.Where(u => u.Login == login)
                                .FirstOrDefaultAsync();
        }

        public async Task<int> DeleteAppUserByIdAsync(int id)
        {
            var user = await GetAppUserByIdAsync(id);
            _context.Users.Remove(user);
            return 1;
        }

        public async Task<int> UpdateAppUserAsync(AppUser appUser)
        {
            await Task.Run(() => _context.Users.Update(appUser));
            return 1;
        }
    }
}