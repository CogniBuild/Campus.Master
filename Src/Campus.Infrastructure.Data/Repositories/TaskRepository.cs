using System.Data;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Domain.Interfaces.Interfaces;
using Dapper;

namespace Campus.Infrastructure.Data.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly IDbConnection _connection;

        public TaskRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<UserTask> GetTaskById(int taskId)
        {
            using var transaction = _connection.BeginTransaction();
            const string sql = @"SELECT * FROM UserTask WHERE Id = @taskId";
            
            return await _connection.QuerySingleAsync<UserTask>(sql, new {taskId}, transaction);
        }

        public async Task DeleteTask(int taskId)
        {
            using var transaction = _connection.BeginTransaction();
            const string sql = @"DELETE FROM UserTask WHERE Id = @taskId";

            await _connection.ExecuteAsync(sql, new {taskId}, transaction);
        }

        public async Task EditTask(UserTask task)
        {
            using var transaction = _connection.BeginTransaction();
            const string sql = @"UPDATE UserTask 
                                 SET Description = @Description,
                                 Priority = @Priority,
                                 ProjectTag = @ProjectTag,
                                 Deadline = @Deadline
                                 WHERE Id = @Id";

            await _connection.ExecuteAsync(sql, task, transaction);
        }
    }
}