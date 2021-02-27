using System;
using Campus.Domain.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Configs.Mapping
{
    public class ParticipantMap : IEntityTypeConfiguration<Participant>
    {
        public void Configure(EntityTypeBuilder<Participant> builder)
        {
            builder.HasKey(p => new {p.UserId, p.ClassroomId});

            builder.HasOne(el => el.User)
                .WithMany(e => e.Participation)
                .HasForeignKey(el => el.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.HasOne(el => el.Classroom)
                .WithMany(l => l.Participants)
                .HasForeignKey(el => el.ClassroomId)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.HasOne(el => el.Role)
                .WithMany(l => l.Participants)
                .HasForeignKey(el => el.RoleId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}