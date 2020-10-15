using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Campus.Master.IntegrationTests.Utils
{
    public static class ContextAccessorBuilder
    {
        public static IHttpContextAccessor Build(string userId, string roleId)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(ClaimTypes.Role, roleId)
            };

            var identity = new ClaimsIdentity(claims);
            var accessor = new HttpContextAccessor
            {
                HttpContext = new DefaultHttpContext()
                {
                    User = new ClaimsPrincipal(identity)
                }
            };

            return accessor;
        }
    }
}