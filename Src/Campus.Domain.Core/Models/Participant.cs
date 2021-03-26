namespace Campus.Domain.Core.Models
{
    public class Participant
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public int ClassroomId { get; set; }
        public Classroom Classroom { get; set; }
        
        public string RoleId { get; set; }
        public Role Role { get; set; }
    }
}