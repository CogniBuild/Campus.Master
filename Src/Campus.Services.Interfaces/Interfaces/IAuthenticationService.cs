namespace Campus.Services.Interfaces.Interfaces
{
    public interface IAuthenticationService
    {
        (byte[] hash, byte[] salt) GenerateSecrets(string password);
        bool VerifyPassword(string password, byte[] hash, byte[] salt);
    }
}