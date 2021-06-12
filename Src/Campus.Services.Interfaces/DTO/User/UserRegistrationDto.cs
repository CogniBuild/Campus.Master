namespace Campus.Services.Interfaces.DTO.User
{
    public class UserRegistrationDto
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string PreferredLocale { get; set; }
        
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
