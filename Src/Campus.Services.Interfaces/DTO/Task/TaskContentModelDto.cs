using System;

namespace Campus.Services.Interfaces.DTO.Task
{
    public class TaskContentModelDto
    {
        public string Description { get; set; }
        public string Priority { get; set; }
        public string Tag { get; set; }
        public DateTime Deadline { get; set; }
    }
}