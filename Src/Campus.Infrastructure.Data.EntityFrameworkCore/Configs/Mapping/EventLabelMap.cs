using System;
using Campus.Domain.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Configs.Mapping
{
    public class EventLabelMap : IEntityTypeConfiguration<EventLabel>
    {
        public void Configure(EntityTypeBuilder<EventLabel> builder)
        {
            builder.HasKey(el => new {el.EventId, el.LabelId});

            builder.HasOne(el => el.Event)
                .WithMany(e => e.Labels)
                .HasForeignKey(el => el.EventId)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.HasOne(el => el.Label)
                .WithMany(l => l.Events)
                .HasForeignKey(el => el.LabelId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}