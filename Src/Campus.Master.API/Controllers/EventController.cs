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

        /// <summary>
        /// Get calendar events
        /// </summary>
        /// <returns>Collection of events for default classroom</returns>
        [HttpGet]
        [EntryPointLogging(ActionName = "[Event] Get calendar events", SenderName = "EventController")]
        public async Task<IEnumerable<EventViewDto>> GetEvents()
        {
            return await _eventService.GetClassroomEventsByUserId(_claimExtractionService.GetUserIdFromClaims());
        }

        /// <summary>
        /// Add event
        /// </summary>
        /// <returns>Id of newly created event</returns>
        [HttpPost]
        [EntryPointLogging(ActionName = "[Event] Add event", SenderName = "EventController")]
        public async Task<int> AddEvent(EventAddDto eventDto)
        {
            return await _eventService.AddEvent(_claimExtractionService.GetUserIdFromClaims(), eventDto);
        }

        /// <summary>
        /// Edit event
        /// </summary>
        [HttpPut]
        [EntryPointLogging(ActionName = "[Event] Edit event", SenderName = "EventController")]
        public async Task EditEvent(EventEditDto eventDto)
        {
            await _eventService.EditEventById(_claimExtractionService.GetUserIdFromClaims(), eventDto);
        }
    }
}