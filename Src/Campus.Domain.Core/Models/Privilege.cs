using System.Collections.Generic;

namespace Campus.Domain.Core.Models
{
    public class Privilege
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Alias { get; set; }
        
        public ICollection<RolePrivilege> Privileges { get; set; }
    }
}