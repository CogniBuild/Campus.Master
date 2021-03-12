using System;

namespace Campus.Services.Interfaces.DTO.User
{
    public class UserViewDto
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        
        public DateTime CreatedOn { get; set; }
    }
}
