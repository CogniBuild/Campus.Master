using Campus.Domain.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Configs.Mapping
{
    public class UserTaskMaps : IEntityTypeConfiguration<UserTask>
    {
        public void Configure(EntityTypeBuilder<UserTask> builder)
        {
            builder.Property(ut => ut.Id)
                .ValueGeneratedOnAdd();

            builder.Property(ut => ut.Description)
                .IsRequired();
            
            builder.Property(ut => ut.Priority)
                .IsRequired().HasMaxLength(30);

            builder.Property(ut => ut.ProjectTag)
                .IsRequired().HasMaxLength(100);

            builder.Property(ut => ut.Deadline)
                .HasColumnType("datetime");

            builder.HasOne(ut => ut.Project)
                .WithMany(p => p.Tasks)
                .HasForeignKey(ut => ut.ProjectId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
