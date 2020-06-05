using System.Collections.Generic;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;

namespace Campus.Domain.Interfaces.Interfaces
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetProjectsListing(int userId, int offset, int limit);

        Task<Project> GetProjectInformationById(int userId, int projectId);

        Task<int> CreateNewProject(int userId, Project project);

        Task<int> DeleteProject(int userId, int projectId);

        Task<int> EditProject(Project project);

        Task<IEnumerable<UserTask>> GetProjectTasks(int userId, int projectId, int limit, int offset);

        Task<int> AddTaskToProject(UserTask userTask);
    }
}