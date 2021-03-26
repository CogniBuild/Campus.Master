using System.Threading;
using System.Threading.Tasks;
using Campus.Services.Interfaces.DTO.User;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface IProfileService
    {
        Task CreateUserAsync(UserRegistrationDto registrationDto);
        Task<UserViewDto> GetUserByIdAsync(string id);
        Task<UserClaimsDto> VerifyUserAsync(UserAuthenticationDto model);
        Task DeleteUserAsync(string id);
        Task EditUserAsync(string id, UserEditDto editingDto);
    }
}