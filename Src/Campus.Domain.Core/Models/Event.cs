using System;
using System.Collections.Generic;
using Campus.Domain.Core.Templates;

namespace Campus.Domain.Core.Models
{
    public class Event : IStrictUserReference
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }

        public int ClassroomId { get; set; }
        public Classroom Classroom { get; set; }

        public int CreatedById { get; set; }
        public User CreatedByUser { get; set; }
        public DateTime CreatedOn { get; set; }
 
        public int ModifiedById { get; set; }
        public User ModifiedByUser { get; set; }
        public DateTime ModifiedOn { get; set; }

        public ICollection<EventLabel> Labels { get; set; }
    }
}