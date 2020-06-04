using System.Threading.Tasks;
using Campus.Domain.Core.Models;

namespace Campus.Domain.Interfaces.Interfaces
{
    public interface ITaskRepository
    { 
        Task<UserTask> GetTaskById(int userId, int taskId);
        Task<int> DeleteTask(int taskId);
        Task<int> EditTask(UserTask task);
    }
}