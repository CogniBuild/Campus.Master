using System.Data;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Domain.Interfaces.Interfaces;
using Dapper;

namespace Campus.Infrastructure.Data.Repositories
{
    public class AppUserRepository : IAppUserRepository
    {
        private readonly IDbConnection _connection;

        public AppUserRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task CreateAppUserAsync(AppUser appUser)
        {
            using var transaction = _connection.BeginTransaction();
            const string sql = @"INSERT INTO AppUser 
                                 (Name, Surname, Email, Email, 
                                 PasswordHash, PasswordSalt, RegistrationDate, RoleId) 
                                 VALUES (@Name, @Surname, @Email, @Email, 
                                 @PasswordHash, @PasswordSalt, @RegistrationDate, 2)";

            await _connection.ExecuteAsync(sql, appUser, transaction);
        }

        public async Task<AppUser> GetAppUserByIdAsync(int id)
        {
            using var transaction = _connection.BeginTransaction();
            const string sql = "SELECT * FROM AppUser WHERE Id = @Id";

            return await _connection.QuerySingleAsync<AppUser>(sql, new {Id = id});
        }

        public async Task<AppUser> GetAppUserByEmailAsync(string email)
        {
            using var transaction = _connection.BeginTransaction();
            const string sql = "SELECT * FROM AppUser WHERE Email = @Email";

            return await _connection.QuerySingleAsync<AppUser>(sql, new {Login = email});
        }

        public async Task DeleteAppUserByIdAsync(int id)
        {
            using var transaction = _connection.BeginTransaction();
            const string sql = "DELETE FROM AppUser WHERE Id = @Id";

            await _connection.ExecuteAsync(sql, new {id}, transaction);
        }

        public async Task UpdateAppUserAsync(AppUser appUser)
        {
            using var transaction = _connection.BeginTransaction();
            const string sql = @"UPDATE AppUser 
                                 SET Name = @Name,
                                 Surname = @Surname 
                                 WHERE Id = @Id";

            await _connection.ExecuteAsync(sql, appUser, transaction);
        }
    }
}