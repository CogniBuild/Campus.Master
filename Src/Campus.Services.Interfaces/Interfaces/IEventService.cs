using System.Collections.Generic;
using System.Threading.Tasks;
using Campus.Services.Interfaces.DTO.Event;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface IEventService
    {
        Task<IEnumerable<EventViewDto>> GetClassroomEventsByUserId(string userId);
    }
}