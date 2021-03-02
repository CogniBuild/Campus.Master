using System;

namespace Campus.Services.Interfaces.DTO.Classroom
{
    public class ClassroomViewDto
    {
        public string Name { get; set; }
        public string Institution { get; set; }
        public string Location { get; set; }
        public bool IsOnline { get; set; }
        
        public string CreatorName { get; set; }
        public DateTime CreatedOn { get; set; }
        
        public string EditorName { get; set; }
        public DateTime EditedOn { get; set; }
    }
}