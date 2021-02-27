using Campus.Domain.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Configs.Mapping
{
    public class RolePrivilegeMap : IEntityTypeConfiguration<RolePrivilege>
    {
        public void Configure(EntityTypeBuilder<RolePrivilege> builder)
        {
            builder.HasKey(el => new {el.RoleId, el.PrivilegeId});

            builder.HasOne(el => el.Role)
                .WithMany(e => e.Privileges)
                .HasForeignKey(el => el.RoleId)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.HasOne(el => el.Privilege)
                .WithMany(l => l.Roles)
                .HasForeignKey(el => el.PrivilegeId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}