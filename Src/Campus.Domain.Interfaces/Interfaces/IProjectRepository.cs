using System.Collections.Generic;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;

namespace Campus.Domain.Interfaces.Interfaces
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetProjectsListing(int userId, int offset, int limit);

        Task<Project> GetProjectInformationById(int userId, int projectId);

        Task CreateNewProject(int userId, Project project);

        Task DeleteProject(int userId, int projectId);

        Task EditProject(Project project);

        Task<IEnumerable<UserTask>> GetProjectTasks(int userId, int projectId, int limit, int offset);

        Task AddTaskToProject(UserTask userTask);
    }
}