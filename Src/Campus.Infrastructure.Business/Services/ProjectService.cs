using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Campus.Domain.Interfaces.Interfaces;
using Campus.Services.Interfaces.DTO.Project;
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
                throw new ApplicationException("Projects with specified limiters dont exist");
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
    }
}