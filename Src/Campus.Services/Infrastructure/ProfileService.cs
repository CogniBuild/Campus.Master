using System;
using System.Threading;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Infrastructure.Data.EntityFrameworkCore.Context;
using Campus.Services.Interfaces.DTO.User;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Campus.Services.Infrastructure
{
    public class ProfileService : IProfileService
    {
        private readonly UserManager<User> _userManager;
        private readonly CampusContext _context;

        public ProfileService(UserManager<User> userManager, CampusContext context)
        {
            _userManager = userManager;
            _context = context;
        }
        
        public async Task CreateUserAsync(UserRegistrationDto registrationDto)
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

        public async Task<UserViewDto> GetUserByIdAsync(string id)
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

        public async Task<UserClaimsDto> VerifyUserAsync(UserAuthenticationDto model)
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

        public async Task DeleteUserAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            
            if (user == null)
                throw new ApplicationException("User with this ID doesn't exist");

            _context.Entry(user).State = EntityState.Detached;
            await _userManager.DeleteAsync(user);
        }

        public async Task EditUserAsync(string id, UserEditDto editingDto)
        {
            var user = await _userManager.FindByIdAsync(id);
            
            if (user == null)
                throw new ApplicationException("User with this ID doesn't exist");
            
            user.FullName = editingDto.FullName;
            await _userManager.UpdateAsync(user);
        }
    }
}