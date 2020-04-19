using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Campus.Master.API.Models.Task;
using Campus.Master.API.Models;

namespace Campus.Master.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ILogger _logger;

        public TaskController(ILogger<TaskController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// GET api/task?page={number}&items={number}&filterBy={string}
        /// Authentication: Bearer {token}
        /// Content-Type: application/json
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> FetchTasks([FromQuery] int page, [FromQuery] int items, [FromQuery] string filterBy)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Fetch Tasks: Page={page}, Items={items}, FilterBy={filterBy}");
            
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
        /// GET api/task/{id}
        /// Authentication: Bearer {token}
        /// Content-Type: application/json
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Get Task By Id #{id}");
            
            // TODO: Put business logic here
            
            var result = await Task.Run(() => new TaskModel {
                Id = 1,
                Description = "Description",
                Priority = "Priority",
                Tag = "Tag",
                Deadline = "00-00-0000"
            });
            
            return Ok(result);
        }
        

        /// <summary>
        /// PUT api/task/{id}
        /// Authentication: Bearer {token}
        /// Content-Type: application/json
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> EditTask(int id, [FromBody] TaskContentModel model)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Edit task #{id}");
            
            // TODO: Put business logic here
            await Task.CompletedTask;

            return Ok(new StateTransfer
            {
                Message = "Task fields are updated now!",
                Payload = $"api/task/{id}"
            });
        }

        /// <summary>
        /// DELETE api/task/{id}
        /// Authentication: Bearer {token}
        /// Content-Type: application/json
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Delete task #{id}");
            
            // TODO: Put business logic here
            await Task.CompletedTask;
            
            return Ok(new StateTransfer
            {
                Message = "Task is deleted now!",
                Payload = "/"
            });
        }
    }
}
