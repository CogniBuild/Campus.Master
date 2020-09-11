using System.Threading.Tasks;
using Campus.Services.Interfaces.DTO.Profile;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface IProfileService
    {
        Task CreateProfileAsync(ProfileRegistrationDto registrationDto);
        Task<ProfileViewDto> GetAppUserProfileByIdAsync(int id);
        Task<ProfileClaimsDto> VerifyAppUserProfile(ProfileAuthenticationDto model);
        Task DeleteAppUserProfileByIdAsync(int id);
        Task EditAppUserProfileByIdAsync(int id, ProfileEditingDto editingDto);
    }
}