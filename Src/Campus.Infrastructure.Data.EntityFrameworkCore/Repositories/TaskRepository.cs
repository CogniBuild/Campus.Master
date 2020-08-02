using System;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Domain.Interfaces.Interfaces;
using Campus.Infrastructure.Data.EntityFrameworkCore.Context;
using Microsoft.EntityFrameworkCore;

namespace Campus.Infrastructure.Data.EntityFrameworkCore.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly CampusContext _context;

        public TaskRepository(CampusContext context)
        {
            _context = context;
        }

        public async Task<UserTask> GetTaskById(int taskId)
        {
            return await _context.Tasks
                .FirstOrDefaultAsync(task => task.Id == taskId);
        }

        public async Task DeleteTask(int taskId)
        {
            var task = await GetTaskById(taskId);

            if (task != null)
                _context.Tasks.Remove(task);
        }

        public async Task EditTask(UserTask task)
        {
            await Task.Run(() => _context.Tasks.Update(task));
        }
    }
}
