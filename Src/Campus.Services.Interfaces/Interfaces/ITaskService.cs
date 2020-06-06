using System.Collections.Generic;
using System.Threading.Tasks;
using Campus.Services.Interfaces.DTO.Task;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface ITaskService
    {
        Task<TaskModelDto> GetTaskById(int userId, int taskId);
        Task<int> EditTaskById(int taskId, TaskContentModelDto taskDto);
        Task<int> DeleteTaskById(int taskId);
    }
}