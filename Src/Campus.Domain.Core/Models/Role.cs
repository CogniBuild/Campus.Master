using Campus.Domain.Core.Templates;

namespace Campus.Domain.Core.Models
{
    public class Role : NullableUserReference
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        public bool IsDefault { get; set; }
        
        public int ClassroomId { get; set; }
    }
}