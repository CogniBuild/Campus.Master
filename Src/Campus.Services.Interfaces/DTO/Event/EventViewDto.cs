using System;

namespace Campus.Services.Interfaces.DTO.Event
{
    public class EventViewDto
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public DateTime Start { get; set; }
        public DateTime? End { get; set; }
    }
}
