using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Campus.Services.Interfaces.DTO.Classroom;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Campus.Master.API.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ClassroomController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IClassroomService _classroomService;
        
        public ClassroomController(IHttpContextAccessor httpContextAccessor,
                                   IClassroomService classroomService)
        {
            _httpContextAccessor = httpContextAccessor;
            _classroomService = classroomService;
        }
        
        [HttpPost]
        public async Task CreateClassroom(ClassroomContentDto classroom, CancellationToken token) =>
            await _classroomService.CreateClassroom(GetUserIdFromClaims(), classroom, token);

        private string GetUserIdFromClaims()
        {
            var identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            
            if (identity == null)
                throw new ApplicationException("Failed to identify user.");
            
            var idClaim = identity.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
            
            if (idClaim == null)
                throw new ApplicationException("Failed to identify user.");

            return idClaim.Value;
        }
    }
}