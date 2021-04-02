using System.Collections.Generic;
using System.Threading.Tasks;
using Campus.Master.API.Filters;
using Campus.Master.API.Helpers.Contracts;
using Campus.Services.Interfaces.DTO.Event;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Campus.Master.API.Controllers
{
    [ApiController]
    [Authorize]
    [ApplicationExceptionHandler]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        private readonly IClaimExtractionService _claimExtractionService;

        public EventController(IEventService eventService,
            IClaimExtractionService claimExtractionService)
        {
            _eventService = eventService;
            _claimExtractionService = claimExtractionService;
        }

        [HttpGet]
        [EntryPointLogging(ActionName = "[Event] Get calendar events", SenderName = "EventController")]
        public async Task<IEnumerable<EventViewDto>> GetEvents()
        {
            return await _eventService.GetClassroomEventsByUserId(_claimExtractionService.GetUserIdFromClaims());
        }
    }
}