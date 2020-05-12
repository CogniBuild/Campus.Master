using System.Threading.Tasks;
using Campus.Infrastructure.Business.DTO;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface IProfileService
    {
        Task CreateAppUserProfile(ProfileRegistrationModelDto registrationDTO);
    }
}