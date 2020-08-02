using System.Collections.Generic;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;

namespace Campus.Domain.Interfaces.Interfaces
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetProjectsListing(int userId, int offset, int limit);

        Task<Project> GetProjectById(int projectId);

        Task CreateNewProject(Project project);

        Task DeleteProject(int projectId);

        Task EditProject(Project project);

        Task<IEnumerable<UserTask>> GetProjectTasks(int projectId, int limit, int offset);

        Task AddTaskToProject(UserTask userTask);
    }
}