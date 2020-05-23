using System;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Domain.Interfaces.Interfaces;
using Campus.Infrastructure.Business.DTO;
using Campus.Services.Interfaces.DTO;
using Campus.Services.Interfaces.Interfaces;

namespace Campus.Infrastructure.Business.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAppUserRepository _appUserRepository;
        private readonly IAuthenticationService _authenticationService;

        public ProfileService(IUnitOfWork unitOfWork, 
                              IAppUserRepository appUserRepository,
                              IAuthenticationService authenticationService)
        {
            _unitOfWork = unitOfWork;
            _appUserRepository = appUserRepository;
            _authenticationService = authenticationService;
        }

        public async Task CreateAppUserProfileAsync(ProfileRegistrationModelDto registrationDto)
        {
            _unitOfWork.Begin();

            try
            {
                var (hash, salt) = _authenticationService.GenerateSecrets(registrationDto.Password);
                
                await _appUserRepository.CreateAppUserAsync(new AppUser
                {
                    Name = registrationDto.FirstName,
                    Surname = registrationDto.LastName,
                    Email = registrationDto.Email,
                    Login = registrationDto.Login,
                    PasswordHash = hash,
                    PasswordSalt = salt,
                    RegistrationDate = DateTime.Now.ToString("d"),
                });

                _unitOfWork.Commit();
            }
            catch (Exception)
            {
                _unitOfWork.Rollback();
                throw new ApplicationException("User already exists in database!");
            }
        }

        public async Task<ProfileViewModelDto> GetAppUserProfileByIdAsync(int id)
        {
            var appUser = await _appUserRepository.GetAppUserByIdAsync(id);
            
            if (appUser == null)
                throw new ApplicationException("User with this ID doesn't exist");
            
            return new ProfileViewModelDto
            {
                Login = appUser.Login,
                Email = appUser.Email,
                FirstName = appUser.Name,
                LastName = appUser.Surname
            };
        }

        public async Task<ProfileClaimsDto> VerifyAppUserProfile(ProfileAuthenticationDto model)
        {
            var appUser = await _appUserRepository.GetAppUserByLoginAsync(model.Login);
            
            if (appUser == null)
                throw new ApplicationException("User with this login doesn't exist");

            if (!_authenticationService.VerifyPassword(model.Password, appUser.PasswordHash, appUser.PasswordSalt))
                throw new ApplicationException("Failed to verify password!");
            
            return new ProfileClaimsDto
            {
                ProfileId = appUser.Id,
                RoleId = appUser.RoleId
            };
        }

        public async Task DeleteAppUserProfileByIdAsync(int id)
        {
            _unitOfWork.Begin();

            try
            {
                await _appUserRepository.DeleteAppUserByIdAsync(id);

                _unitOfWork.Commit();
            }
            catch (Exception)
            {
                _unitOfWork.Rollback();
                throw;
            }
        }

        public async Task EditAppUserProfileByIdAsync(int id, ProfileEditingModelDto editingDto)
        {
            _unitOfWork.Begin();

            try
            {
                await _appUserRepository.UpdateAppUserAsync(new AppUser()
                {
                    Id = id,
                    Name = editingDto.FirstName,
                    Surname = editingDto.LastName
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