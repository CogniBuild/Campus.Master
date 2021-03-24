using System;
using Campus.Domain.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Configs.Mapping
{
    public class RoleMap : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(100);
            
            builder.Property(p => p.IsDefault)
                .IsRequired();
            
            builder.HasOne(e => e.Classroom)
                .WithMany(cl => cl.Roles)
                .HasForeignKey(e => e.ClassroomId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}