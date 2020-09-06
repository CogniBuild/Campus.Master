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
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITaskRepository _taskRepository;

        public TaskService(IUnitOfWork unitOfWork, ITaskRepository taskRepository)
        {
            _unitOfWork = unitOfWork;
            _taskRepository = taskRepository;
        }

        public async Task<TaskDto> GetTaskById(int taskId)
        {
            var task = await _taskRepository.GetTaskById(taskId);

            if (task == null)
            {
                throw new ApplicationException("Task with specified id not found");
            }

            return new TaskDto
            {
                Id = task.Id,
                Description = task.Description,
                Priority = task.Priority,
                Tag = task.ProjectTag,
                Deadline = task.Deadline
            };
        }

        public async Task EditTaskById(int taskId, TaskContentDto taskDto)
        {
            await _taskRepository.EditTask(new UserTask
            {
                Id = taskId,
                Description = taskDto.Description,
                Priority = taskDto.Priority,
                ProjectTag = taskDto.Tag,
                Deadline = taskDto.Deadline,
            });

            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteTaskById(int taskId)
        {
            await _taskRepository.DeleteTask(taskId);
            await _unitOfWork.CommitAsync();
        }
    }
}