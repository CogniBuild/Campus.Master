using Campus.Domain.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Configs.Mapping
{
    public class RoleMaps : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.Property(r => r.Id)
                .ValueGeneratedOnAdd();

            builder.Property(role => role.Name)
                .IsRequired().HasMaxLength(50);

            builder.HasMany(r => r.AppUsers)
                .WithOne()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}