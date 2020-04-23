using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

using Campus.Master.API.Models.Project;
using Campus.Master.API.Models.Task;
using Campus.Master.API.Models;

namespace Campus.Master.API.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly ILogger _logger;

        public ProjectController(ILogger<ProjectController> logger)
        {
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
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> FetchProjects([FromQuery] int page, [FromQuery] int items)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Fetch Projects: Page={page}, Items={items}");
            
            // TODO: Put business logic here
            
            var result = await Task.Run(() => new [] 
            {
                new ProjectModel {
                    Id = 1,
                    Name = "Name",
                    Color = "Color",
                    Status = "Status"
                },
                new ProjectModel {
                    Id = 2,
                    Name = "Name",
                    Color = "Color",
                    Status = "Status"
                }
            });
            
            return Ok(result);
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
            
            // TODO: Put business logic here
            
            var result = await Task.Run(() => new ProjectModel 
            {
                Id = 1,
                Name = "Name",
                Color = "Color",
                Status = "Status"
            });
            
            return Ok(result);
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
            
            // TODO: Put business logic here
            await Task.CompletedTask;
            var idOfNewProject = 1;

            var status = new StateTransfer
            {
                Message = $"'{model.Name}' project is created!",
                Payload = $"api/project/{idOfNewProject}"
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
            
            // TODO: Put business logic here
            await Task.CompletedTask;

            return Ok(new StateTransfer
            {
                Message = $"Project fields are updated now!",
                Payload = $"api/project/{id}"
            });
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
            
            // TODO: Put business logic here
            await Task.CompletedTask;
            
            return Ok(new StateTransfer
            {
                Message = "Project is deleted now!",
                Payload = "/"
            });
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
        /// <response code="404">Project wasn't found.</response>
        [HttpGet("{id}/task")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTasksRelatedToTheProject(int id, [FromQuery] int page, [FromQuery] int items)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Get Tasks Related To The Project #{id}");
            
            // TODO: Put business logic here
            
            var result = await Task.Run(() => new [] 
            {
                new TaskModel {
                    Id = 1,
                    Description = "Description",
                    Priority = "Priority",
                    Tag = "Tag",
                    Deadline = "00-00-0000"
                },
                new TaskModel {
                    Id = 2,
                    Description = "Description",
                    Priority = "Priority",
                    Tag = "Tag",
                    Deadline = "00-00-0000"
                }
            });
            
            return Ok(result);
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
            
            // TODO: Put business logic here
            await Task.CompletedTask;

            var state = new StateTransfer
            {
                Message = $"Task '{model.Description}' is created!",
                Payload = $"/project/{id}"
            };

            return Created(state.Payload, state);
        }
    }
}
