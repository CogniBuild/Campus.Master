using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Campus.Domain.Core.Models
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public DateTime CreatedOn { get; set; }

        public ICollection<Role> Roles { get; set; }
        public ICollection<Event> Events { get; set; }
        public ICollection<Label> Labels { get; set; }
        public ICollection<Classroom> Classrooms { get; set; }
        public ICollection<Participant> Participants { get; set; }
    }
}