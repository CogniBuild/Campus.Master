using System;
using System.Threading;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Infrastructure.Data.EntityFrameworkCore.Context;
using Campus.Services.Interfaces.DTO.Classroom;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Campus.Services.Core
{
    public class ClassroomService : IClassroomService
    {
        private readonly CampusContext _context;

        public ClassroomService(CampusContext context)
        {
            _context = context;
        }
        
        public async Task<ClassroomPreviewDto> GetClassroomPreview(int id, CancellationToken token)
        {
            var classroom = await _context.Classrooms
                .FirstOrDefaultAsync(c => c.Id == id, token);

            if (classroom == null)
                return null;

            return new ClassroomPreviewDto
            {
                Name = classroom.Name,
                Description = classroom.Description,
                Institution = classroom.Institution
            };
        }

        public async Task<ClassroomViewDto> GetClassroomView(int id, CancellationToken token)
        {
            var classroom = await _context.Classrooms
                .FirstOrDefaultAsync(c => c.Id == id, token);

            if (classroom == null)
                return null;

            return new ClassroomViewDto
            {
                Name = classroom.Name,
                Institution = classroom.Institution,
                Location = classroom.DefaultLocation,
                IsOnline = classroom.IsRemote
            };
        }

        public async Task CreateClassroom(string userId, ClassroomContentDto classroom, CancellationToken token)
        {
            await _context.Classrooms.AddAsync(new Classroom
            {
                Name = classroom.Name,
                Description = classroom.Description,
                Institution = classroom.Institution,
                DefaultLocation = classroom.Location,
                IsRemote = classroom.IsOnline
            }, token);

            await _context.SaveChangesAsync(token);
        }

        public async Task EditClassroom(string userId, int classroomId, ClassroomContentDto classroom, CancellationToken token)
        {
            var classroomRecorded = await _context.Classrooms
                .FirstOrDefaultAsync(c => c.Id == classroomId, token);

            if (classroomRecorded != null)
            {
                classroomRecorded.Name = classroom.Name;
                classroomRecorded.Description = classroom.Description;
                classroomRecorded.Institution = classroom.Institution;
                classroomRecorded.DefaultLocation = classroom.Location;
                classroomRecorded.IsRemote = classroom.IsOnline;
                
                _context.Classrooms.Update(classroomRecorded);
                await _context.SaveChangesAsync(token);
            }
        }

        public async Task DeleteClassroom(int classroomId, CancellationToken token)
        {
            var classroom = await _context.Classrooms
                .FirstOrDefaultAsync(c => c.Id == classroomId, token);

            if (classroom != null)
            {
                _context.Classrooms.Remove(classroom);
                await _context.SaveChangesAsync(token);
            }
        }
    }
}
