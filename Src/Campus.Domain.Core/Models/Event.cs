using System;
using System.Collections.Generic;

namespace Campus.Domain.Core.Models
{
    public class Event
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }

        public int ClassroomId { get; set; }
        public Classroom Classroom { get; set; }

        public ICollection<EventLabel> Labels { get; set; }
    }
}