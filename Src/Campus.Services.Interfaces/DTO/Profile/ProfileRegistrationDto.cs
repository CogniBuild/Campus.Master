using Campus.Domain.Core.Models;

namespace Campus.Services.Interfaces.DTO.Profile
{
    public class ProfileRegistrationDto
    {
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Gender Gender { get; set; }
    }
}