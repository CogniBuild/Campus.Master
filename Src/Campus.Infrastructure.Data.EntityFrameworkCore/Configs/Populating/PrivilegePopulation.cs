using Campus.Domain.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Configs.Populating
{
    public class PrivilegePopulation : IEntityTypeConfiguration<Privilege>
    {
        public void Configure(EntityTypeBuilder<Privilege> builder)
        {
            builder.HasData(
                new Privilege {
                    Id = 1,
                    Name = "Create Update Delete on events",
                    Alias = "cud-on-events"
                },
                new Privilege
                {
                    Id = 2,
                    Name = "Read events",
                    Alias = "read-events"
                },
                new Privilege
                {
                    Id = 3,
                    Name = "Create Update Delete on custom event types",
                    Alias = "cud-on-custom-events"
                },
                new Privilege
                {
                    Id = 4,
                    Name = "Read custom event types",
                    Alias = "read-custom-events"
                },
                new Privilege
                {
                    Id = 5,
                    Name = "Create Update Delete on custom roles",
                    Alias = "cud-on-custom-roles"
                },
                new Privilege
                {
                    Id = 6,
                    Name = "Read custom roles",
                    Alias = "read-custom-roles"
                },
                new Privilege
                {
                    Id = 7,
                    Name = "Assign roles",
                    Alias = "assign-roles"
                },
                new Privilege
                {
                    Id = 8,
                    Name = "Invite to groups",
                    Alias = "invite-to-groups"
                },
                new Privilege
                {
                    Id = 9,
                    Name = "Subscribe/unsubscribe on changes on the classroom",
                    Alias = "sub-changes"
                },
                new Privilege
                {
                    Id = 10,
                    Name = "Upload files to the classroom",
                    Alias = "upload-files"
                });
        }
    }
}