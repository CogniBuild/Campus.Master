namespace Campus.Master.API.Helpers.Contracts
{
    public interface ITokenBuilder
    {
        ITokenBuilder AddClaim(string type, string value);

        ITokenBuilder ResetClaims();

        string Build();
    }
}