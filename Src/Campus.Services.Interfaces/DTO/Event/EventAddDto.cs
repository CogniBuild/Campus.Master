using System;

namespace Campus.Services.Interfaces.DTO.Event
{
    public class EventAddDto
    {
        public string Title { get; set; }

        public DateTime Start { get; set; }
        public DateTime? End { get; set; }
    }
}