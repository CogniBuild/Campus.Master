using System.Linq;
using System.Text;
using System.Security.Cryptography;
using Campus.Services.Interfaces.Interfaces;

namespace Campus.Infrastructure.Business.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        public (byte[] hash, byte[] salt) GenerateSecrets(string password)
        {
            using var encrypt = new HMACSHA512();
            return (encrypt.ComputeHash(Encoding.UTF8.GetBytes(password)), encrypt.Key);
        }

        public bool VerifyPassword(string password, byte[] hash, byte[] salt)
        {
            using var encrypt = new HMACSHA512(salt);
            var computedHash = encrypt.ComputeHash(Encoding.UTF8.GetBytes(password));
            return !computedHash.Where((t, i) => t != hash[i]).Any();
        }
    }
}