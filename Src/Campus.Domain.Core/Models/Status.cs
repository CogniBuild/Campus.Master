using System.Collections.Generic;

namespace Campus.Domain.Core.Models
{
    public class Status
    {
        public int Id { get; set; }
        
        public string Name { get; set; }

        public ICollection<Project> Projects { get; set; }
    }
}