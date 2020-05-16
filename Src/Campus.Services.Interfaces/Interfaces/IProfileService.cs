using System.Threading.Tasks;
using Campus.Infrastructure.Business.DTO;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface IProfileService
    {
        Task CreateAppUserProfileAsync(ProfileRegistrationModelDto registrationDto);
        Task<ProfileViewModelDto> GetAppUserProfileByIdAsync(int id);
        Task<int> DeleteAppUserProfileByIdAsync(int id);
        Task<int> EditAppUserProfileByIdAsync(int id, ProfileEditingModelDto editingDto);
    }
}