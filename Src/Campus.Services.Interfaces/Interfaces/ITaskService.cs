using System.Threading.Tasks;
using Campus.Services.Interfaces.DTO.Task;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface ITaskService
    {
        Task<TaskDto> GetTaskById(int taskId);
        Task EditTaskById(int taskId, TaskContentDto taskDto);
        Task DeleteTaskById(int taskId);
    }
}