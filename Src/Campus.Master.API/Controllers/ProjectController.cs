using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Campus.Master.API.Models.Project;
using Campus.Master.API.Models.Task;
using Campus.Master.API.Models;
using Campus.Master.API.Filters;
using Campus.Services.Interfaces.DTO.Project;
using Campus.Services.Interfaces.DTO.Task;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Campus.Master.API.Controllers
{
    [ApiController]
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly ILogger _logger;

        public ProjectController(IProjectService projectService,
                                 ILogger<ProjectController> logger)
        {
            _projectService = projectService;
            _logger = logger;
        }

        /// <summary>
        /// Fetch stored projects.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     GET /api/project?page={number} items={number}
        ///     Authentication: Bearer {token}
        ///     Content-Type: application/json
        /// 
        /// </remarks>
        /// <param name="page">Page number.</param>
        /// <param name="items">Number of projects per single page (has value limit in settings).</param>
        /// <returns>Set of user's projects.</returns>
        /// <response code="200">Projects are successfully fetched.</response>
        /// <response code="204">User has no stored projects.</response>
        /// <response code="400">Query fields are invalid.</response>
        /// <response code="401">User is unauthorized.</response>
        /// <response code="403">Requested count of items exceeded the limit.</response>
        [HttpGet]
        [ServiceFilter(typeof(QueryItemsLimiter))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> FetchProjects([FromQuery] int page, [FromQuery] int items)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Fetch Projects: Page={page}, Items={items}");
            
            int userId = GetCurrentUserId();

            int offset = items * (page - 1);

            try
            {
                var savedProjects = await _projectService.GetSavedProjects(userId, offset, items);

                var result = new List<ProjectModel>();

                foreach (var project in savedProjects)
                {
                    result.Add(new ProjectModel
                    {
                        Id = project.Id,
                        Name = project.Name,
                        Color = project.Color,
                        Status = project.Status
                    });
                }

                return Ok(result);
            }
            catch (ArgumentException e)
            {
                return NotFound(e.Message);
            }
        }

        /// <summary>
        /// Get project by ID.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     GET /api/project/{id}
        ///     Authentication: Bearer {token}
        ///     Content-Type: application/json
        /// 
        /// </remarks>
        /// <param name="id">Integer representation for project ID.</param>
        /// <returns>Project information.</returns>
        /// <response code="200">Project with given ID exists.</response>
        /// <response code="400">ID field is invalid.</response>
        /// <response code="401">User is unauthorized.</response>
        /// <response code="404">Project with given ID doesn't exist.</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetProjectById(int id)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Get Project By Id #{id}");

            try
            {
                var result = await _projectService.GetProjectById(id);

                return Ok(new ProjectModel
                {
                    Id = result.Id,
                    Name = result.Name,
                    Color = result.Color,
                    Status = result.Status
                });
            }
            catch (ArgumentException e)
            {
                return NotFound(e.Message);
            }
        }

        /// <summary>
        /// Create project.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     POST /api/project
        ///     Authentication: Bearer {token}
        ///     Content-Type: application/json
        ///
        ///     {
        ///         “Name”: “...”,
        ///         “Color”: “...”,
        ///         “Status”: “...”
        ///     }
        /// 
        /// </remarks>
        /// <param name="model">Project creation form data.</param>
        /// <returns>State transfer model.</returns>
        /// <response code="201">New project created.</response>
        /// <response code="400">Form data is invalid.</response>
        /// <response code="401">User is unauthorized.</response>
        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> CreateProject(ProjectContentModel model)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Create Project");
            
            int userId = GetCurrentUserId();

            await _projectService.CreateProject(userId, new ProjectContentModelDto
            {
                Name = model.Name,
                Color = model.Color,
                Status = model.Status
            });

            var status = new StateTransfer
            {
                Message = $"'{model.Name}' project is created!",
                Payload = $"api/project"
            };

            return Created(status.Payload, status);
        }

        /// <summary>
        /// Edit project.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     PUT /api/project/{id}
        ///     Authentication: Bearer {token}
        ///     Content-Type: application/json
        ///
        ///     {
        ///         “Name”: “...”,
        ///         “Color”: “...”,
        ///         “Status”: “...”
        ///     }
        /// 
        /// </remarks>
        /// <param name="id">Integer representation for project ID.</param>
        /// <param name="model">Project editing form data.</param>
        /// <returns>State transfer model.</returns>
        /// <response code="200">Project fields are updated.</response>
        /// <response code="400">Edit project form data is invalid.</response>
        /// <response code="401">User is unauthorized.</response>
        /// <response code="404">Project wasn't found.</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> EditProject(int id, [FromBody] ProjectContentModel model)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Edit Project #{id}");

            try
            {
                await _projectService.EditProject(id, new ProjectContentModelDto
                {
                    Name = model.Name,
                    Color = model.Color,
                    Status = model.Status
                });

                return Ok(new StateTransfer
                {
                    Message = $"Project fields are updated now!",
                    Payload = $"api/project/{id}"
                });
            }
            catch (ApplicationException e)
            {
                return NotFound(e.Message);
            }
        }

        /// <summary>
        /// Delete project.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     DELETE /api/project/{id}
        ///     Authentication: Bearer {token}
        ///     Content-Type: application/json
        ///
        /// </remarks>
        /// <param name="id">Integer representation for project ID.</param>
        /// <returns>State transfer model.</returns>
        /// <response code="200">Project is deleted.</response>
        /// <response code="401">User is unauthorized.</response>
        /// <response code="404">Project wasn't found.</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteProject(int id)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Delete Profile #{id}");
            
            try
            {
                await _projectService.DeleteProject(id);
                
                return Ok(new StateTransfer
                {
                    Message = "Project is deleted now!",
                    Payload = "/"
                });
            }
            catch (ApplicationException e)
            {
                return NotFound(e.Message);
            }
        }

        /// <summary>
        /// Get tasks related to the project.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     GET /api/project/{id}/task?page={number} items={number}
        ///     Authentication: Bearer {token}
        ///     Content-Type: application/json
        ///
        /// </remarks>
        /// <param name="id">Integer representation for project ID.</param>
        /// <param name="page">Number of tasks to skip from the beginning.</param>
        /// <param name="items">Number of tasks per single query (has value limit in settings).</param>
        /// <returns>Set of tasks related to the project with ID.</returns>
        /// <response code="200">Tasks are successfully fetched.</response>
        /// <response code="204">Project has no related tasks.</response>
        /// <response code="400">Query fields are invalid.</response>
        /// <response code="401">User is unauthorized.</response>
        /// <response code="403">Requested count of items exceeded the limit.</response>
        /// <response code="404">Project wasn't found.</response>
        [HttpGet("{id}/task")]
        [ServiceFilter(typeof(QueryItemsLimiter))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTasksRelatedToTheProject(int id, [FromQuery] int page,
            [FromQuery] int items)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Get Tasks Related To The Project #{id}");

            int offset = items * (page - 1);

            var taskModels = new List<TaskModel>();

            try
            {
                var projectTasks = await _projectService.GetProjectTasks(id, items, offset);

                foreach (var task in projectTasks)
                {
                    taskModels.Add(new TaskModel
                    {
                        Id = task.Id,
                        Description = task.Description,
                        Priority = task.Priority,
                        Tag = task.Tag,
                        Deadline = task.Deadline
                    });
                }

                return Ok(taskModels);
            }
            catch (ApplicationException e)
            {
                return NotFound(e.Message);
            }
        }

        /// <summary>
        /// Attach task to the project.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     POST /api/project/{id}/task
        ///     Authentication: Bearer {token}
        ///     Content-Type: application/json
        ///
        ///     {
        ///         “Description”: “...”,
        ///         “Priority”: “...”,
        ///         “Tag”: “...”,
        ///         “Deadline”: “...”
        ///     }
        ///
        /// </remarks>
        /// <param name="id">Integer representation for project ID.</param>
        /// <param name="model">Task creation form data.</param>
        /// <returns>State transfer model.</returns>
        /// <response code="201">New task created.</response>
        /// <response code="400">Form data is invalid.</response>
        /// <response code="401">User is unauthorized.</response>
        /// <response code="404">Project wasn't found.</response>
        [HttpPost("{id}/task")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> AttachTaskToTheProject(int id, [FromBody] TaskContentModel model)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Attach Task To The Project #{id}");

            try
            {
                await _projectService.AddTaskToProject(id, new TaskContentModelDto
                {
                    Description = model.Description,
                    Priority = model.Priority,
                    Tag = model.Tag,
                    Deadline = model.Deadline
                });

                var state = new StateTransfer
                {
                    Message = $"Task '{model.Description}' is created!",
                    Payload = $"/project/{id}"
                };

                return Created(state.Payload, state);
            }
            catch (ApplicationException e)
            {
                return NotFound(e.Message);
            }
        }

        private int GetCurrentUserId()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var claimedId = claimsIdentity?.Claims.FirstOrDefault()?.Value;

            return Convert.ToInt32(claimedId);
        }
    }
}