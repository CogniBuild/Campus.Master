using System.Threading;
using System.Threading.Tasks;
using Campus.Services.Interfaces.DTO.User;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface IProfileService
    {
        Task CreateUserAsync(UserRegistrationDto registrationDto, CancellationToken token);
        Task<UserViewDto> GetUserByIdAsync(string id, CancellationToken token);
        Task<UserClaimsDto> VerifyUserAsync(UserAuthenticationDto model, CancellationToken token);
        Task DeleteUserAsync(string id, CancellationToken token);
        Task EditUserAsync(string id, UserEditDto editingDto, CancellationToken token);
    }
}