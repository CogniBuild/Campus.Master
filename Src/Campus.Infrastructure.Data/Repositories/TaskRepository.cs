using System.Linq;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Domain.Interfaces.Interfaces;
using Dapper;

namespace Campus.Infrastructure.Data.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public TaskRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<UserTask> GetTaskById(int userId, int taskId)
        {
            const string sql = @"SELECT * FROM UserTask AS UT JOIN Project P on UT.ProjectId = P.Id
                                 WHERE P.UserId = @userId AND UT.Id = @taskId";

            var tasks = await _unitOfWork.Connection.QueryAsync<UserTask>(sql, new {userId, taskId},
                _unitOfWork.Transaction);

            return tasks.SingleOrDefault();
        }

        public async Task<int> DeleteTask(int taskId)
        {
            const string sql = @"DELETE FROM UserTask WHERE Id = @taskId";

            var affectedRows = await _unitOfWork.Connection.ExecuteAsync(sql, new {taskId},
                _unitOfWork.Transaction);

            return affectedRows;
        }

        public async Task<int> EditTask(UserTask task)
        {
            const string sql = @"UPDATE UserTask 
                                 SET Description = @Description,
                                 Priority = @Priority,
                                 ProjectTag = @ProjectTag,
                                 Deadline = @Deadline
                                 WHERE Id = @Id";

            var affectedRows = await _unitOfWork.Connection.ExecuteAsync(sql, task, _unitOfWork.Transaction);

            return affectedRows;
        }
    }
}