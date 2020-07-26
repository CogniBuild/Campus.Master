using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Domain.Interfaces.Interfaces;
using Campus.Services.Interfaces.DTO.Project;
using Campus.Services.Interfaces.DTO.Task;
using Campus.Services.Interfaces.Interfaces;

namespace Campus.Infrastructure.Business.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IProjectRepository _projectRepository;

        public ProjectService(IUnitOfWork unitOfWork, IProjectRepository projectRepository)
        {
            _unitOfWork = unitOfWork;
            _projectRepository = projectRepository;
        }

        public async Task<IEnumerable<ProjectModelDto>> GetSavedProjects(int userId, int offset, int limit)
        {
            var projects = await _projectRepository.GetProjectsListing(userId, offset, limit);

            var projectModels = new List<ProjectModelDto>();

            if (projects == null)
            {
                throw new ApplicationException("Projects with specified limiter don't exist");
            }

            foreach (var project in projects)
            {
                projectModels.Add(new ProjectModelDto
                {
                    Id = project.Id,
                    Name = project.Name,
                    Color = project.Color,
                    Status = project.StatusId
                });
            }

            return projectModels;
        }

        public async Task CreateProject(int userId, ProjectContentModelDto projectDto)
        {
            await _projectRepository.CreateNewProject(userId, new Project()
            {
                Name = projectDto.Name,
                Color = projectDto.Color,
                StatusId = projectDto.Status,
            });
            await _unitOfWork.CommitAsync();
        }

        public async Task<ProjectModelDto> GetProjectById(int projectId)
        {
            var project = await _projectRepository.GetProjectInformationById(projectId);

            if (project == null)
            {
                throw new ApplicationException("Project with specified id doesn't exist");
            }

            return new ProjectModelDto
            {
                Id = project.Id,
                Name = project.Name,
                Color = project.Color,
                Status = project.StatusId
            };
        }

        public async Task EditProject(int userId, int id, ProjectContentModelDto projectContent)
        {
            await _projectRepository.EditProject(new Project
            {
                Id = id,
                Name = projectContent.Name,
                Color = projectContent.Color,
                StatusId = projectContent.Status,
                UserId = userId
            });

            await _unitOfWork.CommitAsync();
        }

        public async Task<IEnumerable<TaskModelDto>> GetProjectTasks(int userId, int id, int limit, int offset)
        {
            var projectTasks = await _projectRepository.GetProjectTasks(userId, id, limit, offset);

            if (projectTasks == null)
            {
                throw new ApplicationException($"Tasks with specified project id don't exist");
            }

            var taskModelsDto = new List<TaskModelDto>();

            foreach (var task in projectTasks)
            {
                taskModelsDto.Add(new TaskModelDto
                {
                    Id = task.Id,
                    Description = task.Description,
                    Priority = task.Priority,
                    Tag = task.ProjectTag,
                    Deadline = task.Deadline
                });
            }

            return taskModelsDto;
        }

        public async Task AddTaskToProject(int id, TaskContentModelDto model)
        {
            await _projectRepository.AddTaskToProject(new UserTask
            {
                Description = model.Description,
                Priority = model.Priority,
                ProjectTag = model.Tag,
                Deadline = model.Deadline,
                ProjectId = id
            });

            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteProject(int userId, int projectId)
        {
            await _projectRepository.DeleteProject(userId, projectId);
            await _unitOfWork.CommitAsync();
        }
    }
}