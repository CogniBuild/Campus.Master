namespace Campus.Domain.Core.Models
{
    public class Project
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Color { get; set; }
        
        public bool StatusId { get; set; }

        public int UserId { get; set; }
    }
}