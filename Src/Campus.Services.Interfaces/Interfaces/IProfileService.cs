using System.Threading.Tasks;
using Campus.Infrastructure.Business.DTO;
using Campus.Services.Interfaces.DTO;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface IProfileService
    {
        Task CreateAppUserProfileAsync(ProfileRegistrationModelDto registrationDto);
        Task<ProfileViewModelDto> GetAppUserProfileByIdAsync(int id);
        Task DeleteAppUserProfileByIdAsync(int id);
        Task EditAppUserProfileByIdAsync(int id, ProfileEditingModelDto editingDto);
    }
}