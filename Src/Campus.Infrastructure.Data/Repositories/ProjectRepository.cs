using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Domain.Interfaces.Interfaces;
using Dapper;

namespace Campus.Infrastructure.Data.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProjectRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Project>> GetProjectsListing(int userId, int offset, int limit)
        {
            const string sql = @"SELECT * FROM Project WHERE UserId = @userId
                                 ORDER BY Id OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY";

            return await _unitOfWork.Connection.QueryAsync<Project>(sql, new {userId, limit, offset},
                _unitOfWork.Transaction);
        }

        public async Task<Project> GetProjectInformationById(int userId, int projectId)
        {
            const string sql = @"SELECT * FROM Project WHERE UserId = @userId AND Id = @projectId";

            var projects = await _unitOfWork.Connection.QueryAsync<Project>(sql, new {projectId, userId},
                _unitOfWork.Transaction);

            return projects.SingleOrDefault();
        }

        public async Task<int> CreateNewProject(int userId, Project project)
        {
            const string sql =
                @"INSERT INTO Project (Name, Color, UserId, StatusId) VALUES (@Name, @Color, @userId, @StatusId);
                  SELECT CAST(SCOPE_IDENTITY() as int)";

            var newProjectId = await _unitOfWork.Connection.ExecuteAsync(sql,
                new {project.Name, project.Color, userId, project.StatusId},
                _unitOfWork.Transaction);

            return newProjectId;
        }

        public async Task<int> DeleteProject(int userId, int projectId)
        {
            const string sql = @"DELETE FROM Project WHERE Id = @projectId AND UserId = @userId";

            var affectedRows = await _unitOfWork.Connection.ExecuteAsync(sql, new {userId, projectId},
                _unitOfWork.Transaction);

            return affectedRows;
        }

        public async Task<int> EditProject(Project project)
        {
            const string sql = @"UPDATE Project 
                                 SET Name = @Name,
                                 Color = @Color,
                                 StatusId = @Status  
                                 WHERE Id = @Id AND UserId = @UserId";

            var affectedRows = await _unitOfWork.Connection.ExecuteAsync(sql, project, _unitOfWork.Transaction);

            return affectedRows;
        }

        public async Task<IEnumerable<UserTask>> GetProjectTasks(int userId, int projectId, int limit, int offset)
        {
            const string sql = @"SELECT *
                                 FROM UserTask UT
                                          JOIN Project P on UT.ProjectId = P.Id
                                 WHERE UT.ProjectId = @projectId AND P.UserId = @userId 
                                 ORDER BY UT.Id OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY";

            return await _unitOfWork.Connection.QueryAsync<UserTask>(sql, new {userId, projectId, limit, offset},
                _unitOfWork.Transaction);
        }

        public async Task<int> AddTaskToProject(UserTask userTask)
        {
            const string sql =
                @"INSERT INTO UserTask (Description, Priority, ProjectTag, Deadline, ProjectId)
                  VALUES (@Description, @Priority, @ProjectTag, @Deadline, @ProjectId)";

            var affectedRows = await _unitOfWork.Connection.ExecuteAsync(sql, userTask,
                _unitOfWork.Transaction);

            return affectedRows;
        }
    }
}