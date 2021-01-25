using System;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Domain.Interfaces.Interfaces;
using Campus.Services.Interfaces.DTO.Profile;
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

        public async Task CreateProfileAsync(ProfileRegistrationDto registrationDto)
        {
            if (registrationDto.Password != registrationDto.ConfirmPassword)
                throw new ApplicationException("Passwords don't match.");
            
            var appUser = await _appUserRepository.GetAppUserByEmailAsync(registrationDto.Email);
            
            if (appUser != null)
                throw new ApplicationException("User already exists.");

            var (hash, salt) = _authenticationService.GenerateSecrets(registrationDto.Password);
            
            try
            {
                await _appUserRepository.CreateAppUserAsync(new AppUser
                {
                    Name = registrationDto.FirstName,
                    Surname = registrationDto.LastName,
                    Email = registrationDto.Email,
                    PasswordHash = hash,
                    PasswordSalt = salt,
                    RegistrationDate = DateTime.Now,
                    Gender = registrationDto.Gender
                });

                await _unitOfWork.CommitAsync();
            }
            catch (Exception)
            {
                throw new ApplicationException("Failed to create new user.");
            }
        }

        public async Task<ProfileViewDto> GetAppUserProfileByIdAsync(int id)
        {
            var appUser = await _appUserRepository.GetAppUserByIdAsync(id);
            
            if (appUser == null)
                throw new ApplicationException("User with this ID doesn't exist.");
            
            return new ProfileViewDto
            {
                Email = appUser.Email,
                FirstName = appUser.Name,
                LastName = appUser.Surname
            };
        }

        public async Task<ProfileClaimsDto> VerifyAppUserProfile(ProfileAuthenticationDto model)
        {
            var appUser = await _appUserRepository.GetAppUserByEmailAsync(model.Email);
            
            if (appUser == null)
                throw new ApplicationException("Wrong email or password.");

            if (!_authenticationService.VerifyPassword(model.Password, appUser.PasswordHash, appUser.PasswordSalt))
                throw new ApplicationException("Wrong email or password.");
            
            return new ProfileClaimsDto
            {
                ProfileId = appUser.Id,
                RoleId = appUser.RoleId
            };
        }

        public async Task DeleteAppUserProfileByIdAsync(int id)
        {
            await _appUserRepository.DeleteAppUserByIdAsync(id);
            await _unitOfWork.CommitAsync();
        }

        public async Task EditAppUserProfileByIdAsync(int id, ProfileEditingDto editingDto)
        {
            await _appUserRepository.UpdateAppUserAsync(new AppUser()
            {
                Id = id,
                Name = editingDto.FirstName,
                Surname = editingDto.LastName
            });

            await _unitOfWork.CommitAsync();
        }
    }
}