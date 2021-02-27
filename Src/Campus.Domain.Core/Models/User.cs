using System;
using Microsoft.AspNetCore.Identity;

namespace Campus.Domain.Core.Models
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}