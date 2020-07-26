using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Domain.Interfaces.Interfaces;
using Dapper;

namespace Campus.Infrastructure.Data.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly IDbConnection _connection;

        public ProjectRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<Project>> GetProjectsListing(int userId, int offset, int limit)
        {
            using var transaction = _connection.BeginTransaction();
            const string sql = @"SELECT * FROM Project WHERE UserId = @userId
                                 ORDER BY Id OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY";

            return await _connection.QueryAsync<Project>(sql, new {userId, limit, offset}, transaction);
        }

        public async Task<Project> GetProjectInformationById(int projectId)
        {
            using var transaction = _connection.BeginTransaction();
            const string sql = @"SELECT * FROM Project WHERE Id = @projectId";

            return await _connection.QuerySingleAsync<Project>(sql, new {projectId}, transaction);
        }

        public async Task CreateNewProject(int userId, Project project)
        {
            using var transaction = _connection.BeginTransaction();
            const string sql =
                @"INSERT INTO Project (Name, Color, UserId, StatusId) VALUES (@Name, @Color, @userId, @StatusId);
                  SELECT CAST(SCOPE_IDENTITY() as int)";

            await _connection.ExecuteAsync(sql, new {project.Name, project.Color, userId, project.StatusId}, 
                transaction);
        }

        public async Task DeleteProject(int userId, int projectId)
        {
            using var transaction = _connection.BeginTransaction();
            const string sql = @"DELETE FROM Project WHERE Id = @projectId AND UserId = @userId";

            await _connection.ExecuteAsync(sql, new {userId, projectId}, transaction);
        }

        public async Task EditProject(Project project)
        {
            using var transaction = _connection.BeginTransaction();
            const string sql = @"UPDATE Project 
                                 SET Name = @Name,
                                 Color = @Color,
                                 StatusId = @StatusId  
                                 WHERE Id = @Id AND UserId = @UserId";

            await _connection.ExecuteAsync(sql, project, transaction);
        }

        public async Task<IEnumerable<UserTask>> GetProjectTasks(int userId, int projectId, int limit, int offset)
        {
            using var transaction = _connection.BeginTransaction();
            const string sql = @"SELECT *
                                 FROM UserTask UT
                                          JOIN Project P on UT.ProjectId = P.Id
                                 WHERE UT.ProjectId = @projectId AND P.UserId = @userId 
                                 ORDER BY UT.Id OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY";

            return await _connection.QueryAsync<UserTask>(sql, new {userId, projectId, limit, offset},
                transaction);
        }

        public async Task AddTaskToProject(UserTask userTask)
        {
            using var transaction = _connection.BeginTransaction();
            const string sql =
                @"INSERT INTO UserTask (Description, Priority, ProjectTag, Deadline, ProjectId)
                  VALUES (@Description, @Priority, @ProjectTag, @Deadline, @ProjectId)";

            await _connection.ExecuteAsync(sql, userTask, transaction);
        }
    }
}