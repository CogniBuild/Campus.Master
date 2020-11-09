using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Campus.Domain.Core.Models;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Configs.Mapping
{
    public class UserMaps : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder.Property(u => u.Id)
                .ValueGeneratedOnAdd();

            builder.Property(u => u.Name)
                .IsRequired().HasMaxLength(80);

            builder.Property(u => u.Surname)
                .HasMaxLength(80);

            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(u => u.PasswordHash)
                .IsRequired();

            builder.Property(u => u.PasswordSalt)
                .IsRequired();

            builder.Property(u => u.RegistrationDate)
                .IsRequired();

            builder.Property(u => u.Gender)
                .HasConversion<string>();

            builder.HasOne(u => u.Role)
                .WithMany(r => r.AppUsers)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}