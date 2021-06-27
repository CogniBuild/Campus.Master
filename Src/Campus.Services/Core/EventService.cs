using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Infrastructure.Data.EntityFrameworkCore.Context;
using Campus.Services.Interfaces.DTO.Event;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Campus.Services.Implementation.Core
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
            var classroom = await GetDefaultClassroomByUserId(userId);

            var events = classroom?.Events;

            if (events == null)
                throw new ApplicationException("There are no events for given user");

            var eventViews = new List<EventViewDto>();

            foreach (Event calendarEvent in events)
            {
                var eventViewDto = new EventViewDto
                {
                    Id = calendarEvent.Id.ToString(),
                    Title = calendarEvent.Title,
                    Description = calendarEvent.Description,
                    AllDay = calendarEvent.AllDay,
                    Location = calendarEvent.ActualLocation,
                };

                if (calendarEvent.AllDay)
                {
                    eventViewDto.Start = calendarEvent.StartDate.ToString("yyyy-MM-dd");
                    eventViewDto.End = calendarEvent.EndDate?.ToString("yyyy-MM-dd");
                }
                else
                {
                    eventViewDto.Start = calendarEvent.StartDate.ToString("yyyy-MM-ddTHH:mm");
                    eventViewDto.End = calendarEvent.EndDate?.ToString("yyyy-MM-ddTHH:mm");
                }

                eventViews.Add(eventViewDto);
            }

            return eventViews;
        }

        public async Task<int> AddEvent(string userId, EventAddDto eventDto)
        {
            var defaultClassroom = await GetDefaultClassroomByUserId(userId);

            var newEvent = new Event
            {
                Title = eventDto.Title,
                Description = eventDto.Description,
                StartDate = eventDto.Start,
                EndDate = eventDto.End,
                ActualLocation = eventDto.Location,
                AllDay = eventDto.AllDay
            };

            defaultClassroom.Events.Add(newEvent);

            await _context.SaveChangesAsync();

            return newEvent.Id;
        }

        public async Task EditEventById(string userId, EventEditDto eventDto)
        {
            var defaultClassroom = await GetDefaultClassroomByUserId(userId);

            var eventToEdit = defaultClassroom.Events
                .FirstOrDefault(e => e.Id.ToString() == eventDto.Id);

            if (eventToEdit == null)
                throw new ApplicationException($"Event with {eventDto.Id} id not found for given user");

            eventToEdit.Title = eventDto.Title;
            eventToEdit.Description = eventDto.Description;
            eventToEdit.StartDate = eventDto.Start;
            eventToEdit.EndDate = eventDto.End;
            eventToEdit.ActualLocation = eventDto.Location;
            eventToEdit.AllDay = eventDto.AllDay;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteEventById(string userId, string eventId)
        {
            var defaultClassroom = await GetDefaultClassroomByUserId(userId);

            var eventToDelete = defaultClassroom.Events
                .FirstOrDefault(e => e.Id.ToString() == eventId);

            if (eventToDelete == null)
                throw new ApplicationException($"Event with {eventId} id not found for given user");

            _context.Events.Remove(eventToDelete);

            await _context.SaveChangesAsync();
        }

        private async Task<Classroom> GetDefaultClassroomByUserId(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                throw new ApplicationException("User with this ID doesn't exist");

            await _context.Entry(user)
                .Collection(u => u.Participation)
                .LoadAsync();

            var defaultParticipation = user.Participation.FirstOrDefault();

            if (defaultParticipation == null)
                throw new ApplicationException("Given user doesn't participate in any classroom");

            await _context.Entry(defaultParticipation)
                .Reference(c => c.Classroom)
                .LoadAsync();

            await _context.Entry(defaultParticipation.Classroom)
                .Collection(c => c.Events)
                .LoadAsync();

            return defaultParticipation.Classroom;
        }
    }
}
