using Campus.Infrastructure.Business.DTO;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface IProfileService
    {
        void CreateAppUserProfile(ProfileRegistrationModelDto registrationDTO);
    }
}