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

        public async Task CreateAppUserAsync(AppUser appUser)
        {
            appUser.RoleId = _context.Roles.FirstOrDefault(r => r.Name == "Student")?.Id ?? 1;
            await _context.Users.AddAsync(appUser);
        }

        public async Task<AppUser> GetAppUserByIdAsync(int id)
        {
            return await _context.Users.Where(u => u.Id == id)
                                .FirstOrDefaultAsync();
        }

        public async Task<AppUser> GetAppUserByEmailAsync(string email)
        {
            return await _context.Users.Where(u => u.Email == email)
                                .FirstOrDefaultAsync();
        }

        public async Task DeleteAppUserByIdAsync(int id)
        {
            var user = await GetAppUserByIdAsync(id);

            if (user != null)
                _context.Users.Remove(user);
        }

        public async Task UpdateAppUserAsync(AppUser appUser)
        {
            await Task.Run(() => _context.Users.Update(appUser));
        }
    }
}