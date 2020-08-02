using Campus.Domain.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Configs.Mapping
{
    public class StatusMaps : IEntityTypeConfiguration<Status>
    {
        public void Configure(EntityTypeBuilder<Status> builder)
        {
            builder.Property(status => status.Id)
                .ValueGeneratedOnAdd();

            builder.Property(status => status.Name)
                .IsRequired().HasMaxLength(50);
        }
    }
}
