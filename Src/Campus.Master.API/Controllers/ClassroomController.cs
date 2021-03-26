using System.Threading;
using System.Threading.Tasks;
using Campus.Master.API.Helpers.Contracts;
using Campus.Services.Interfaces.DTO.Classroom;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Campus.Master.API.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ClassroomController : ControllerBase
    {
        private readonly IClassroomService _classroomService;
        private readonly IClaimExtractionService _claimExtractionService;
        
        public ClassroomController(IClassroomService classroomService,
                                   IClaimExtractionService claimExtractionService)
        {
            _classroomService = classroomService;
            _claimExtractionService = claimExtractionService;
        }
        
        [HttpPost]
        public async Task CreateClassroom(ClassroomContentDto classroom, CancellationToken token) =>
            await _classroomService.CreateClassroom(_claimExtractionService.GetUserIdFromClaims(), classroom, token);
    }
}