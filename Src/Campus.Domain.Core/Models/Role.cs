using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Campus.Domain.Core.Models
{
    public class Role : IdentityRole
    {
        public bool IsDefault { get; set; }

        public int? ClassroomId { get; set; }
        public Classroom Classroom { get; set; }

        public ICollection<Participant> Participants { get; set; }
        public ICollection<RolePrivilege> Privileges { get; set; }
    }
}