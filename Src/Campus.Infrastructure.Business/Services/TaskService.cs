using System;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Domain.Interfaces.Interfaces;
using Campus.Services.Interfaces.DTO.Task;
using Campus.Services.Interfaces.Interfaces;

namespace Campus.Infrastructure.Business.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<TaskModelDto> GetTaskById(int userId, int taskId)
        {
            var task = await _taskRepository.GetTaskById(userId, taskId);

            if (task == null)
            {
                throw new ApplicationException("Task with specified id not found");
            }

            return new TaskModelDto
            {
                Id = task.Id,
                Description = task.Description,
                Priority = task.Priority,
                Tag = task.ProjectTag,
                Deadline = task.Deadline
            };
        }

        public async Task<int> EditTaskById(int taskId, TaskContentModelDto taskDto)
        {
            var affectedRows = await _taskRepository.EditTask(new UserTask
            {
                Id = taskId,
                Description = taskDto.Description,
                Priority = taskDto.Priority,
                ProjectTag = taskDto.Tag,
                Deadline = taskDto.Deadline,
            });

            if (affectedRows == 0)
            {
                throw new ApplicationException("Unable to update task by id");
            }

            return affectedRows;
        }

        public async Task<int> DeleteTaskById(int taskId)
        {
            var affectedRows = await _taskRepository.DeleteTask(taskId);

            if (affectedRows == 0)
            {
                throw new ApplicationException("Unable to delete task by id");
            }

            return affectedRows;
        }
    }
}