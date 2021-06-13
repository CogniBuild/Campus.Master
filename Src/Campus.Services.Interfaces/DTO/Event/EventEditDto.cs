using System;

namespace Campus.Services.Interfaces.DTO.Event
{
    public class EventEditDto
    {
        public string Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }

        public DateTime Start { get; set; }
        public DateTime? End { get; set; }

        public string Location { get; set; }
        public bool AllDay { get; set; }
    }
}