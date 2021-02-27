using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Campus.Domain.Core.Models
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public DateTime CreatedOn { get; set; }

        public ICollection<Role> RolesCreated { get; set; }
        public ICollection<Role> RolesModified { get; set; }

        public ICollection<Event> EventsCreated { get; set; }
        public ICollection<Event> EventsModified { get; set; }

        public ICollection<Label> LabelsCreated { get; set; }
        public ICollection<Label> LabelsModified { get; set; }

        public ICollection<Classroom> ClassroomsCreated { get; set; }
        public ICollection<Classroom> ClassroomsModified { get; set; }

        public ICollection<Participant> Participation { get; set; }
    }
}