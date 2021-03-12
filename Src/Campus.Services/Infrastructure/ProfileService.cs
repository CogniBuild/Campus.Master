using System;
using System.Threading;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Services.Interfaces.DTO.User;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Campus.Services.Infrastructure
{
    public class ProfileService : IProfileService
    {
        private readonly UserManager<User> _userManager;

        public ProfileService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        
        public async Task CreateUserAsync(UserRegistrationDto registrationDto, CancellationToken token)
        {
            if (registrationDto.Password != registrationDto.ConfirmPassword)
                throw new ApplicationException("Passwords don't match");

            var userWithSameEmail = await _userManager.FindByEmailAsync(registrationDto.Email);
            var userWithSameUserName = await _userManager.FindByEmailAsync(registrationDto.UserName);
            
            if (userWithSameEmail != null || userWithSameUserName != null)
                throw new ApplicationException("User already exists");
            
            var registrationResult = await _userManager.CreateAsync(new User
            {
                Email = registrationDto.Email,
                UserName = registrationDto.UserName,
                FullName = registrationDto.FullName,
                CreatedOn = DateTime.Now,
            }, registrationDto.Password);
            
            if (!registrationResult.Succeeded)
                throw new ApplicationException("Failed to create new user");
        }

        public async Task<UserViewDto> GetUserByIdAsync(string id, CancellationToken token)
        {
            var user = await _userManager.FindByIdAsync(id);
            
            if (user == null)
                throw new ApplicationException("User with this ID doesn't exist");

            return new UserViewDto
            {
                Email = user.Email,
                UserName = user.UserName,
                CreatedOn = user.CreatedOn,
                FullName = user.FullName
            };
        }

        public async Task<UserClaimsDto> VerifyUserAsync(UserAuthenticationDto model, CancellationToken token)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
                throw new ApplicationException("Wrong email or password");

            if (!await _userManager.CheckPasswordAsync(user, model.Password))
                throw new ApplicationException("Wrong email or password");

            return new UserClaimsDto
            {
                ProfileId = user.Id
            };
        }

        public async Task DeleteUserAsync(string id, CancellationToken token)
        {
            await _userManager.DeleteAsync(new User {Id = id});
        }

        public async Task EditUserAsync(string id, UserEditDto editingDto, CancellationToken token)
        {
            var user = await _userManager.FindByIdAsync(id);
            
            if (user == null)
                throw new ApplicationException("User with this ID doesn't exist");
            
            user.FullName = editingDto.FullName;
            await _userManager.UpdateAsync(user);
        }
    }
}