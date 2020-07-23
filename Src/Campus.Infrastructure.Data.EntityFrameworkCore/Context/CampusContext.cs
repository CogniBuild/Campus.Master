using Microsoft.EntityFrameworkCore;

using Campus.Domain.Core.Models;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Context
{
    public class CampusContext : DbContext
    {
        public DbSet<AppUser> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<UserTask> Tasks { get; set; }

        public CampusContext(DbContextOptions<CampusContext> options)
            : base(options) {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}