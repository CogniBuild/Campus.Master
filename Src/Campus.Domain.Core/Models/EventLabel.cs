namespace Campus.Domain.Core.Models
{
    public class EventLabel
    {
        public int LabelId { get; set; }
        public Label Label { get; set; }
        
        public int EventId { get; set; }
        public Event Event { get; set; }
    }
}