using System;

namespace Campus.Services.Interfaces.DTO.Task
{
    public class TaskModelDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Priority { get; set; }
        public string Tag { get; set; }
        public DateTime Deadline { get; set; }
    }
}