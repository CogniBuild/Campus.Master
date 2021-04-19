#nullable enable
using System;

namespace Campus.Services.Interfaces.DTO.Event
{
    public class EventViewDto
    {
        public string Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }

        public string Start { get; set; }
        public string? End { get; set; }

        public string Location { get; set; }
        public bool AllDay { get; set; }
    }
}
