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
            
            builder.HasOne(cl => cl.CreatedByUser)
                .WithMany(u => u.RolesCreated)
                .HasForeignKey(cl => cl.CreatedById)
                .OnDelete(DeleteBehavior.SetNull);
            
            builder.HasOne(cl => cl.ModifiedByUser)
                .WithMany(u => u.RolesModified)
                .HasForeignKey(cl => cl.ModifiedById)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Property(p => p.CreatedOn)
                .HasConversion(
                    cl => cl.ToString("o"),
                    cl => Convert.ToDateTime(cl));
            
            builder.Property(p => p.ModifiedOn)
                .HasConversion(
                    cl => cl.ToString("o"),
                    cl => Convert.ToDateTime(cl));
            
            builder.HasOne(e => e.Classroom)
                .WithMany(cl => cl.Roles)
                .HasForeignKey(e => e.ClassroomId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}