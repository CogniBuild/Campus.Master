using Campus.Domain.Core.Models;
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
        }
    }
}