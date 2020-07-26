using System;

namespace Campus.Master.API.Models.Task
{
    public class TaskContentModel
    {
        public string Description { get; set; }
        public string Priority { get; set; }
        public string Tag { get; set; }
        public DateTime Deadline { get; set; }
    }
}