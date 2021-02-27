using System;
using Campus.Domain.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Configs.Mapping
{
    public class EventMap : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder.Property(p => p.Id)
                .ValueGeneratedOnAdd();
            
            builder.Property(p => p.Title)
                .IsRequired()
                .HasMaxLength(250);
            
            builder.Property(p => p.Description)
                .IsRequired()
                .HasMaxLength(2000);

            builder.HasOne(cl => cl.CreatedByUser)
                .WithMany(u => u.EventsCreated)
                .HasForeignKey(cl => cl.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);
            
            builder.HasOne(cl => cl.ModifiedByUser)
                .WithMany(u => u.EventsModified)
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

            builder.HasOne(e => e.Classroom)
                .WithMany(cl => cl.Events)
                .HasForeignKey(e => e.ClassroomId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}