using System;
using Campus.Domain.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Configs.Mapping
{
    public class UserMap : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(p => p.UserName)
                .IsRequired()
                .HasMaxLength(250);
            
            builder.Property(p => p.NormalizedUserName)
                .IsRequired()
                .HasMaxLength(250);
            
            builder.Property(p => p.FullName)
                .IsRequired()
                .HasMaxLength(250);
            
            builder.Property(p => p.Email)
                .IsRequired()
                .HasMaxLength(320);
            
            builder.Property(p => p.NormalizedEmail)
                .IsRequired()
                .HasMaxLength(320);
            
            builder.Property(p => p.CreatedOn)
                .HasConversion(
                    cl => cl.ToString("o"),
                    cl => Convert.ToDateTime(cl));

            builder.Property(p => p.PreferredLocale)
                .HasConversion(
                    locale => locale.ToString(),
                    locale => (Locale)Enum.Parse(typeof(Locale), locale));
        }
    }
}
