using System;
using System.Collections.Generic;

namespace Campus.Domain.Core.Models
{
    public class AppUser
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }

        public byte[] PasswordHash { get; set; }
        
        public byte[] PasswordSalt { get; set; }
        
        public DateTime RegistrationDate { get; set; }

        public int RoleId { get; set; }

        public Role Role { get; set; }

        public ICollection<Project> Projects { get; set; }
    }
}