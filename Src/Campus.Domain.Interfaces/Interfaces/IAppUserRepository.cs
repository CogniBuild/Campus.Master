using System.Threading.Tasks;
using Campus.Domain.Core.Models;

namespace Campus.Domain.Interfaces.Interfaces
{
    public interface IAppUserRepository
    {
        Task<int> CreateAppUserAsync(AppUser appUser);
        Task<AppUser> GetAppUserByIdAsync(int id);
        Task<AppUser> GetAppUserByLoginAsync(string login);
        Task<int> DeleteAppUserByIdAsync(int id);
        Task<int> UpdateAppUserAsync(AppUser appUser);
    }
}