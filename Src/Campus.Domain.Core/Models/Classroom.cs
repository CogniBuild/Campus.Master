using System;
using System.Collections.Generic;

namespace Campus.Domain.Core.Models
{
    public class Classroom
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string Institution { get; set; }
        public string Location { get; set; }
        public bool IsOnline { get; set; }

        public ICollection<Role> Roles { get; set; }
        public ICollection<Event> Events { get; set; }
        public ICollection<Label> Labels { get; set; }
        public ICollection<Participant> Participants { get; set; }
    }
}