using System;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Domain.Interfaces.Interfaces;
using Campus.Infrastructure.Business.DTO;
using Campus.Services.Interfaces.Interfaces;

namespace Campus.Infrastructure.Business.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAppUserRepository _appUserRepository;

        public ProfileService(IUnitOfWork unitOfWork, IAppUserRepository appUserRepository)
        {
            _unitOfWork = unitOfWork;
            _appUserRepository = appUserRepository;
        }

        public async Task CreateAppUserProfile(ProfileRegistrationModelDto registrationDto)
        {
            _unitOfWork.Begin();

            try
            {
               await _appUserRepository.CreateAppUserAsync(new AppUser
                {
                    Name = registrationDto.FirstName,
                    Surname = registrationDto.LastName,
                    Email = registrationDto.Email,
                    Login = registrationDto.Login,
                    PasswordHash = registrationDto.Password,
                    RegistrationDate = DateTime.Now.ToString("d"),
                });

                _unitOfWork.Commit();
            }
            catch (Exception)
            {
                _unitOfWork.Rollback();
                throw;
            }
        }
    }
}