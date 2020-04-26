using System;

namespace Campus.Domain.Core.Models
{
    public class Task
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public string Priority { get; set; }

        public string ProjectTag { get; set; }

        public DateTime Deadline { get; set; }

        public int ProjectId { get; set; }
    }
}