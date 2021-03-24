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
                Location = classroom.Location,
                IsOnline = classroom.IsOnline
            };
        }

        public async Task CreateClassroom(string userId, ClassroomContentDto classroom, CancellationToken token)
        {
            await _context.Classrooms.AddAsync(new Classroom
            {
                Name = classroom.Name,
                Description = classroom.Description,
                Institution = classroom.Institution,
                Location = classroom.Location,
                IsOnline = classroom.IsOnline
            }, token);

            await _context.SaveChangesAsync(token);
        }

        public async Task EditClassroom(string userId, int classroomId, ClassroomContentDto classroom, CancellationToken token)
        {
            _context.Classrooms.Update(new Classroom
            {
                Id = classroomId,
                Name = classroom.Name,
                Description = classroom.Description,
                Institution = classroom.Institution,
                Location = classroom.Location,
                IsOnline = classroom.IsOnline
            });

            await _context.SaveChangesAsync(token);
        }

        public async Task DeleteClassroom(int classroomId, CancellationToken token)
        {
            var classroom = await _context.Classrooms
                .FirstOrDefaultAsync(c => c.Id == classroomId, token);

            if (classroom != null)
                _context.Classrooms.Remove(classroom);
            
            await _context.SaveChangesAsync(token);
        }
    }
}