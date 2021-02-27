namespace Campus.Domain.Core.Models
{
    public class Participant
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int ClassroomId { get; set; }
        public Classroom Classroom { get; set; }
        
        public int RoleId { get; set; }
        public Role Role { get; set; }
    }
}