using System;
using System.Globalization;
using Campus.Domain.Core.Models;
using Campus.Infrastructure.Business.DTO;
using Campus.Services.Interfaces.Interfaces;
using GamersParadise.Domain.Interfaces.Interfaces;

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

        public void CreateAppUserProfile(ProfileRegistrationModelDto registrationDTO)
        {
            _unitOfWork.Begin();
            
            _appUserRepository.CreateAppUserAsync(new AppUser
            {
                Name = registrationDTO.FirstName,
                Surname = registrationDTO.LastName,
                Email = registrationDTO.Email,
                Login = registrationDTO.Login,
                PasswordHash = registrationDTO.Password,
                RegistrationDate = DateTime.Now.ToString(CultureInfo.InvariantCulture),
            });
            
            _unitOfWork.Commit();
        }
    }
}