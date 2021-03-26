using System;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Campus.Master.API.Helpers.Contracts;

namespace Campus.Master.API.Helpers.Implementations
{
    public class ClaimExtractionService : IClaimExtractionService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        
        public ClaimExtractionService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        
        public string GetUserIdFromClaims()
        {
            if (!(_httpContextAccessor.HttpContext.User.Identity is ClaimsIdentity identity))
                throw new ApplicationException("Failed to identify user.");
            
            var idClaim = identity.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
            
            if (idClaim == null)
                throw new ApplicationException("Failed to identify user.");

            return idClaim.Value;
        }
    }
}