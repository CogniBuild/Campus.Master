using Campus.Domain.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Configs.Mapping
{
    public class LabelMap : IEntityTypeConfiguration<Label>
    {
        public void Configure(EntityTypeBuilder<Label> builder)
        {
            builder.Property(p => p.Id)
                .ValueGeneratedOnAdd();

            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(100);
            
            builder.Property(p => p.ColorHex)
                .IsRequired()
                .HasMaxLength(6);
            
            builder.Property(p => p.IsDefault)
                .IsRequired();

            builder.HasOne(e => e.Classroom)
                .WithMany(cl => cl.Labels)
                .HasForeignKey(e => e.ClassroomId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}