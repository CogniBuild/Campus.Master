using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Campus.Master.API.Models;
using Campus.Master.API.Filters;
using Campus.Services.Interfaces.DTO.Task;
using Campus.Services.Interfaces.Interfaces;

namespace Campus.Master.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        /// <summary>
        /// Fetch stored tasks.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     GET /api/task?page={number} items={number} filterBy={string}
        ///     Authentication: Bearer {token}
        ///     Content-Type: application/json
        /// 
        /// </remarks>
        /// <param name="page">Page number.</param>
        /// <param name="items">Number of tasks per single page (has value limit in settings).</param>
        /// <param name="filterBy">Filter criteria for tasks, represented as string.</param>
        /// <returns>Set of user's tasks.</returns>
        /// <response code="200">Tasks are successfully fetched.</response>
        /// <response code="204">User has no stored tasks.</response>
        /// <response code="400">Query fields are invalid.</response>
        /// <response code="401">User is unauthorized.</response>
        /// <response code="403">Requested count of items exceeded the limit.</response>
        [HttpGet]
        [EntryPointLogging(ActionName = "[Task] Fetch Tasks", SenderName = "TaskController")]
        [ServiceFilter(typeof(QueryItemsLimiter))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> FetchTasks([FromQuery] int page, [FromQuery] int items,
            [FromQuery] string filterBy)
        {
            // TODO: Put business logic here

            var result = await Task.Run(() => new[]
            {
                new TaskDto
                {
                    Id = 1,
                    Description = "Description",
                    Priority = "Priority",
                    Tag = "Tag",
                    Deadline = DateTime.MinValue
                },
                new TaskDto
                {
                    Id = 2,
                    Description = "Description",
                    Priority = "Priority",
                    Tag = "Tag",
                    Deadline = DateTime.MinValue
                }
            });

            return Ok(result);
        }

        /// <summary>
        /// Get task by ID.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     GET api/task/{id}
        ///     Authentication: Bearer {token}
        ///     Content-Type: application/json
        /// 
        /// </remarks>
        /// <param name="id">Integer representation for task ID.</param>
        /// <returns>Task information.</returns>
        /// <response code="200">Task with given ID exists.</response>
        /// <response code="400">ID field is invalid.</response>
        /// <response code="401">User is unauthorized.</response>
        /// <response code="404">Task with given ID doesn't exist.</response>
        [HttpGet("{id}")]
        [EntryPointLogging(ActionName = "[Task] Get Task By Id", SenderName = "TaskController")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTaskById(int id)
        {
            int userId = GetCurrentUserId();

            try
            {
                var task = await _taskService.GetTaskById(id);

                return Ok(new TaskDto
                {
                    Id = task.Id,
                    Description = task.Description,
                    Priority = task.Priority,
                    Tag = task.Tag,
                    Deadline = task.Deadline
                });
            }
            catch (ApplicationException e)
            {
                return NotFound(e.Message);
            }
        }


        /// <summary>
        /// Edit task.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     PUT api/task/{id}
        ///     Authentication: Bearer {token}
        ///     Content-Type: application/json
        ///
        ///     {
        ///         "Description": "...",
        ///         "Priority": "...",
        ///         "Tag": "...",
        ///         "Deadline": "..."
        ///     }
        /// 
        /// </remarks>
        /// <param name="id">Integer representation for task ID.</param>
        /// <param name="model">Task edit form data.</param>
        /// <returns>State transfer model.</returns>
        /// <response code="200">Task fields are updated.</response>
        /// <response code="400">Edit task form data is invalid.</response>
        /// <response code="401">User is unauthorized.</response>
        /// <response code="404">Task wasn't found.</response>
        [HttpPut("{id}")]
        [EntryPointLogging(ActionName = "[Task] Edit Task", SenderName = "TaskController")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> EditTask(int id, [FromBody] TaskContentDto model)
        {
            try
            {
                await _taskService.EditTaskById(id, new TaskContentDto
                {
                    Description = model.Description,
                    Priority = model.Priority,
                    Tag = model.Tag,
                    Deadline = model.Deadline
                });

                return Ok(new StateTransfer
                {
                    Message = "Task fields are updated now!",
                    Payload = $"api/task/{id}"
                });
            }
            catch (ApplicationException e)
            {
                return NotFound(e.Message);
            }
        }

        /// <summary>
        /// Delete task.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     DELETE api/task/{id}
        ///     Authentication: Bearer {token}
        ///     Content-Type: application/json
        /// 
        /// </remarks>
        /// <param name="id">Integer representation for task ID.</param>
        /// <returns>State transfer model.</returns>
        /// <response code="200">Task is deleted.</response>
        /// <response code="401">User is unauthorized.</response>
        /// <response code="404">Task wasn't found.</response>
        [HttpDelete("{id}")]
        [EntryPointLogging(ActionName = "[Task] Delete Task", SenderName = "TaskController")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteTask(int id)
        {
            try
            {
                await _taskService.DeleteTaskById(id);

                return Ok(new StateTransfer
                {
                    Message = "Task is deleted now!",
                    Payload = "/"
                });
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