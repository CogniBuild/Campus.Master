using Campus.Domain.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Configs.Mapping
{
    public class ProjectMaps : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.Property(p => p.Id)
                .ValueGeneratedOnAdd();

            builder.Property(p => p.Name)
                .IsRequired().HasMaxLength(100);

            builder.Property(p => p.Color)
                .HasMaxLength(30);

            builder.HasOne(p => p.Status)
                .WithMany(s => s.Projects)
                .HasForeignKey(p => p.StatusId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(p => p.User)
                .WithMany(u => u.Projects)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
