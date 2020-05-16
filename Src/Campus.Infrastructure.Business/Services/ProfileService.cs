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

        public async Task CreateAppUserProfileAsync(ProfileRegistrationModelDto registrationDto)
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

        public async Task<ProfileViewModelDto> GetAppUserProfileByIdAsync(int id)
        {
            _unitOfWork.Begin();

            try
            {
                var appUser = await _appUserRepository.GetAppUserByIdAsync(id);

                _unitOfWork.Commit();

                return new ProfileViewModelDto
                {
                    Login = appUser.Login,
                    Email = appUser.Email,
                    FirstName = appUser.Name,
                    LastName = appUser.Surname
                };
            }
            catch (Exception)
            {
                _unitOfWork.Rollback();
                throw;
            }
        }

        public async Task<int> DeleteAppUserProfileByIdAsync(int id)
        {
            return await _appUserRepository.DeleteAppUserByIdAsync(id);
        }

        public async Task<int> EditAppUserProfileByIdAsync(int id, ProfileEditingModelDto editingDto)
        {
            return await _appUserRepository.UpdateAppUserAsync(new AppUser()
            {
                Id = id,
                Name = editingDto.FirstName,
                Surname = editingDto.LastName
            });
        }
    }
}