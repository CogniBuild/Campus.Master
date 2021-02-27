using System;
using System.Collections.Generic;
using Campus.Domain.Core.Templates;

namespace Campus.Domain.Core.Models
{
    public class Classroom : IUserReference
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string Institution { get; set; }
        public string Location { get; set; }
        public bool IsOnline { get; set; }

        public string CreatedById { get; set; }
        public User CreatedByUser { get; set; }
        public DateTime CreatedOn { get; set; }

        public string ModifiedById { get; set; }
        public User ModifiedByUser { get; set; }
        public DateTime ModifiedOn { get; set; }

        public ICollection<Role> Roles { get; set; }
        public ICollection<Event> Events { get; set; }
        public ICollection<Label> Labels { get; set; }
        public ICollection<Participant> Participants { get; set; }
    }
}