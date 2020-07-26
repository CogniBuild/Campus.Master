using System.Collections.Generic;

namespace Campus.Domain.Core.Models
{
    public class Role
    {
        public int Id { get; set; }
        
        public string Name { get; set; }

        public ICollection<AppUser> AppUsers { get; set; }
    }
}