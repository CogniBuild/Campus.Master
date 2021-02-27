namespace Campus.Domain.Core.Models
{
    public class RolePrivilege
    {
        public int RoleId { get; set; }
        public Role Role { get; set; }
        
        public int PrivilegeId { get; set; }
        public Privilege Privilege { get; set; }
    }
}