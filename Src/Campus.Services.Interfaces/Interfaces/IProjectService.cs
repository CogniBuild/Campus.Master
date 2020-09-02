using System.Collections.Generic;
using System.Threading.Tasks;
using Campus.Services.Interfaces.DTO.Project;
using Campus.Services.Interfaces.DTO.Task;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetSavedProjects(int userId, int offset, int limit);
        Task CreateProject(int userId, ProjectContentDto projectDto);
        Task<ProjectDto> GetProjectById(int projectId);
        Task EditProject(int id, ProjectContentDto projectContent);
        Task<IEnumerable<TaskDto>> GetProjectTasks(int id, int limit, int offset);
        Task AddTaskToProject(int id, TaskContentDto model);
        Task DeleteProject(int projectId);
    }
}