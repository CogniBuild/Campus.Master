using System.Threading.Tasks;
using Campus.Domain.Core.Models;

namespace Campus.Domain.Interfaces.Interfaces
{
    public interface IAppUserRepository
    {
        Task CreateAppUserAsync(AppUser appUser);
        Task<AppUser> GetAppUserByIdAsync(int id);
        Task<AppUser> GetAppUserByLoginAsync(string login);
        Task DeleteAppUserByIdAsync(int id);
        Task UpdateAppUserAsync(AppUser appUser);
    }
}