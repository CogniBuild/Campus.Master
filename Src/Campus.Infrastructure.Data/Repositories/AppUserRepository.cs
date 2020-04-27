using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Dapper;
using GamersParadise.Domain.Interfaces.Interfaces;

namespace Campus.Infrastructure.Data.Repositories
{
    public class AppUserRepository : IAppUserRepository
    {
        IDbConnection db;

        public AppUserRepository(string connectionString)
        {
            this.db = new SqlConnection(connectionString);
        }

        public async Task<int> CreateAppUserAsync(AppUser appUser)
        {
            const string sql =
                "INSERT INTO AppUser (Name, Surname, Email, Login, PasswordHash, RegistrationDate, RoleId)"
                + "VALUES (@Name, @Surname, @Email, @Login, @PasswordHash, @RegistrationDate, @RoleId)"
                + "SELECT(CAST(SCOPE_IDENTITY() AS INT))";

            var ids = await db.QueryAsync<int>(sql, appUser);
            return ids.SingleOrDefault();
        }

        public async Task<AppUser> GetAppUserByIdAsync(int id)
        {
            const string sql = "SELECT * FROM AppUser WHERE Id = @Id";

            var appUser = await db.QueryAsync<AppUser>(sql, id);
            return appUser.SingleOrDefault();
        }

        public async Task<int> DeleteAppUserByIdAsync(int id)
        {
            const string sql = "DELETE FROM AppUser WHERE Id = @Id";

            return await db.ExecuteAsync(sql, new {id});
        }

        public async Task<int> UpdateAppUserAsync(AppUser appUser)
        {
            const string sql =
                "UPDATE AppUser " +
                "SET Name             = @Name," +
                "    Surname          = @Surname," +
                "    Email            = @Email," +
                "    Login            = @Login," +
                "    PasswordHash     = @PasswordHash," +
                "    RegistrationDate = @RegistrationDate," +
                "    RoleId           = @RoleId " +
                "WHERE Id = @Id";

            return await db.ExecuteAsync(sql, appUser);
        }
    }
}