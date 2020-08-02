using System.Collections.Generic;
using System.Threading.Tasks;
using Campus.Services.Interfaces.DTO.Task;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface ITaskService
    {
        Task<TaskModelDto> GetTaskById(int taskId);
        Task EditTaskById(int taskId, TaskContentModelDto taskDto);
        Task DeleteTaskById(int taskId);
    }
}