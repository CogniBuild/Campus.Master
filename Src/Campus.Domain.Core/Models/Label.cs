using System.Collections.Generic;

namespace Campus.Domain.Core.Models
{
    public class Label
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        public string ColorHex { get; set; }
        public bool IsDefault { get; set; }

        public int? ClassroomId { get; set; }
        public Classroom Classroom { get; set; }

        public ICollection<EventLabel> Events { get; set; }
    }
}