using System;

namespace Campus.Services.Interfaces.DTO.Classroom
{
    public class ClassroomPreviewDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Institution { get; set; }
        
        public string CreatorName { get; set; }
        public DateTime CreatedOn { get; set; }
        
        public string EditorName { get; set; }
        public DateTime EditedOn { get; set; }
    }
}