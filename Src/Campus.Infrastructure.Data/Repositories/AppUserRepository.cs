using System.Linq;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Domain.Interfaces.Interfaces;
using Dapper;

namespace Campus.Infrastructure.Data.Repositories
{
    public class AppUserRepository : IAppUserRepository
    {
        readonly IUnitOfWork unitOfWork;

        public AppUserRepository(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<int> CreateAppUserAsync(AppUser appUser)
        {
            const string sql =
                "INSERT INTO AppUser (Name, Surname, Email, Login, PasswordHash, PasswordSalt, RegistrationDate, RoleId)"
                + "VALUES (@Name, @Surname, @Email, @Login, @PasswordHash, @PasswordSalt, @RegistrationDate, 2)";

            int affectedRows = await unitOfWork.Connection.ExecuteAsync(sql, appUser, unitOfWork.Transaction);
            return affectedRows;
        }

        public async Task<AppUser> GetAppUserByIdAsync(int id)
        {
            const string sql = "SELECT * FROM AppUser WHERE Id = @Id";

            var appUser = await unitOfWork.Connection.QueryAsync<AppUser>(sql, new {id});
            return appUser.SingleOrDefault();
        }

        public async Task<int> DeleteAppUserByIdAsync(int id)
        {
            const string sql = "DELETE FROM AppUser WHERE Id = @Id";

            return await unitOfWork.Connection.ExecuteAsync(sql, new {id}, unitOfWork.Transaction);
        }

        public async Task<int> UpdateAppUserAsync(AppUser appUser)
        {
            const string sql =
                "UPDATE AppUser " +
                "SET Name             = @Name," +
                "    Surname          = @Surname " +
                "WHERE Id = @Id";

            return await unitOfWork.Connection.ExecuteAsync(sql, appUser, unitOfWork.Transaction);
        }
    }
}