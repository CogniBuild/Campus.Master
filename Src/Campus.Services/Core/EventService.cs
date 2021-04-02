using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Infrastructure.Data.EntityFrameworkCore.Context;
using Campus.Services.Interfaces.DTO.Event;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Campus.Services.Core
{
    public class EventService : IEventService
    {
        private readonly UserManager<User> _userManager;
        private readonly CampusContext _context;

        public EventService(UserManager<User> userManager, CampusContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<IEnumerable<EventViewDto>> GetClassroomEventsByUserId(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                throw new ApplicationException("User with this ID doesn't exist");

            await _context.Entry(user)
                .Collection(u => u.Participation)
                .LoadAsync();

            Participant defaultParticipation = user.Participation.FirstOrDefault();

            if (defaultParticipation == null)
                throw new ApplicationException("Given user doesn't participate in any classroom");

            var eventViews = new List<EventViewDto>();
            ICollection<Event> events = defaultParticipation.Classroom?.Events;

            if (events == null)
                throw new ApplicationException("There are no events for given user");

            foreach (Event calendarEvent in events)
            {
                eventViews.Add(new EventViewDto
                {
                    Id = calendarEvent.Id.ToString(),
                    Title = calendarEvent.Title,
                    Start = calendarEvent.StartDate,
                    End = calendarEvent.EndDate
                });
            }

            return eventViews;
        }
    }
}