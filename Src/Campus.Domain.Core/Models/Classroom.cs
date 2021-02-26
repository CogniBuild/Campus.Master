using Campus.Domain.Core.Templates;

namespace Campus.Domain.Core.Models
{
    public class Classroom : StrictUserReference
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string Institution { get; set; }
        public string Location { get; set; }
        public bool IsOnline { get; set; }
    }
}