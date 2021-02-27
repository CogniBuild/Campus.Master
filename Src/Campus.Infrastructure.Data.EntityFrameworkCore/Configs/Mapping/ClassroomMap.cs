using System;
using Campus.Domain.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Configs.Mapping
{
    public class ClassroomMap : IEntityTypeConfiguration<Classroom>
    {
        public void Configure(EntityTypeBuilder<Classroom> builder)
        {
            builder.Property(p => p.Id)
                .ValueGeneratedOnAdd();

            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(p => p.Description)
                .HasMaxLength(5000);
            
            builder.Property(p => p.Institution)
                .HasMaxLength(250);
            
            builder.Property(p => p.Location)
                .IsRequired()
                .HasMaxLength(2048);

            builder.Property(p => p.IsOnline)
                .IsRequired();
            
            builder.Property(p => p.CreatedById)
                .IsRequired();
            
            builder.Property(p => p.ModifiedById)
                .IsRequired();

            builder.HasOne(cl => cl.CreatedByUser)
                .WithMany(u => u.ClassroomsCreated)
                .HasForeignKey(cl => cl.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);
            
            builder.HasOne(cl => cl.ModifiedByUser)
                .WithMany(u => u.ClassroomsModified)
                .HasForeignKey(cl => cl.ModifiedById)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(p => p.CreatedOn)
                .HasConversion(
                    cl => cl.ToString("o"),
                    cl => Convert.ToDateTime(cl));
            
            builder.Property(p => p.ModifiedOn)
                .HasConversion(
                    cl => cl.ToString("o"),
                    cl => Convert.ToDateTime(cl));
        }
    }
}