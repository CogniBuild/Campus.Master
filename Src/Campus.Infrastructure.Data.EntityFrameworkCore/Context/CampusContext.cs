using Campus.Domain.Core.Models;
using Campus.Infrastructure.Data.EntityFrameworkCore.Configs.Mapping;
using Campus.Infrastructure.Data.EntityFrameworkCore.Configs.Populating;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Context
{
    public class CampusContext : IdentityDbContext<User>
    {
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Label> Labels { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<Privilege> Privileges { get; set; }

        public CampusContext(DbContextOptions<CampusContext> options)
            : base(options) {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ClassroomMap());
            modelBuilder.ApplyConfiguration(new EventLabelMap());
            modelBuilder.ApplyConfiguration(new EventMap());
            modelBuilder.ApplyConfiguration(new LabelMap());
            modelBuilder.ApplyConfiguration(new ParticipantMap());
            modelBuilder.ApplyConfiguration(new PrivilegeMap());
            modelBuilder.ApplyConfiguration(new RoleMap());
            modelBuilder.ApplyConfiguration(new RolePrivilegeMap());
            modelBuilder.ApplyConfiguration(new UserMap());
            
            modelBuilder.ApplyConfiguration(new PrivilegePopulation());
        }
    }
}