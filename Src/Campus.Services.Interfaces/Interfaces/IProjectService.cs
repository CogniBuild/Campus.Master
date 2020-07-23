using System.Collections.Generic;
using System.Threading.Tasks;
using Campus.Services.Interfaces.DTO.Project;
using Campus.Services.Interfaces.DTO.Task;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectModelDto>> GetSavedProjects(int userId, int offset, int limit);
        Task CreateProject(int userId, ProjectContentModelDto projectDto);
        Task<ProjectModelDto> GetProjectById(int userId, int projectId);
        Task EditProject(int userId,int id, ProjectContentModelDto projectContent);
        Task<IEnumerable<TaskModelDto>> GetProjectTasks(int userId, int id, int limit, int offset);
        Task AddTaskToProject(int id, TaskContentModelDto model);
        Task DeleteProject(int userId, int projectId);
    }
}