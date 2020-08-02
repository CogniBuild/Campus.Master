using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Domain.Interfaces.Interfaces;
using Campus.Infrastructure.Data.EntityFrameworkCore.Context;
using Microsoft.EntityFrameworkCore;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly CampusContext _context;

        public ProjectRepository(CampusContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Project>> GetProjectsListing(int userId, int offset, int limit)
        {
            return await _context.Projects.Where(p => p.UserId == userId)
                .Skip(offset).Take(limit).ToListAsync();
        }

        public async Task<Project> GetProjectById(int projectId)
        {
            return await _context.Projects
                .FirstOrDefaultAsync(project => project.Id == projectId);
        }

        public async Task CreateNewProject(Project project)
        {
            await _context.Projects.AddAsync(project);
        }

        public async Task DeleteProject(int projectId)
        {
            var project = await GetProjectById(projectId);

            if (project != null)
                _context.Projects.Remove(project);
        }

        public async Task EditProject(Project project)
        {
            await Task.Run(() => _context.Projects.Update(project));
        }

        public async Task<IEnumerable<UserTask>> GetProjectTasks(int projectId, int limit, int offset)
        {
            return await _context.Tasks.Where(t => t.ProjectId == projectId)
                .Skip(offset).Take(limit).ToListAsync();
        }

        public async Task AddTaskToProject(UserTask userTask)
        {
            await _context.Tasks.AddAsync(userTask);
        }
    }
}
