using System.Threading.Tasks;
using Campus.Domain.Core.Models;

namespace Campus.Domain.Interfaces.Interfaces
{
    public interface ITaskRepository
    { 
        Task<UserTask> GetTaskById(int taskId);
        Task DeleteTask(int taskId);
        Task EditTask(UserTask task);
    }
}