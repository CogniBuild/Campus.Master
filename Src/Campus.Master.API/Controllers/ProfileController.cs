using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Campus.Master.API.Models.Profile;
using Campus.Master.API.Models;

namespace Campus.Master.API.Controllers
{
    // TODO: Implement authorization, implement CSRF protection
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly ILogger _logger;

        public ProfileController(ILogger<ProfileController> logger)
        {
            _logger = logger;
        }
        
        /// <summary>
        /// GET api/profile
        /// Authentication: Bearer {token}
        /// Content-Type: application/json
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetProfileInformation()
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Get Profile Information");
            
            // TODO: Put business logic here
            
            var result = await Task.Run(() => new ProfileViewModel
            {
                Login = "Login",
                Email = "Email",
                FirstName = "FirstName",
                LastName = "LastName"
            });
            
            return Ok(result);
        }

        /// <summary>
        /// POST api/profile/create
        /// Content-Type: application/json
        /// 
        /// {
        ///     “Login”: “...”,
        ///     “Password”: “...”,
        ///     “ConfirmPassword”: “...”,
        ///     “Email”: “...”,
        ///     “FirstName”: “...”,
        ///     “LastName”: “...”
        /// }
        /// </summary>
        [HttpPost("create")]
        public async Task<IActionResult> CreateProfile(ProfileRegistrationModel model)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Create Profile @{model.Login}");
            
            // TODO: Put business logic here
            await Task.CompletedTask;
            
            var state = new StateTransfer
            {
                Message = "{JWT-TOKEN}",
                Payload = "/profile"
            };

            return Created(state.Payload, state);
        }

        /// <summary>
        /// POST api/profile/auth
        /// Content-Type: application/json
        /// 
        /// {
        ///     “Login”: “...”,
        ///     “Password”: “...”
        /// }
        /// </summary>
        [HttpPost("auth")]
        public async Task<IActionResult> AuthenticateProfile(AuthenticationModel model)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Authenticate Profile @{model.Login}");
            
            // TODO: Put business logic here
            await Task.CompletedTask;
            
            return Ok(new StateTransfer
            {
                Message = "{JWT-TOKEN}",
                Payload = "/profile"
            });
        }

        /// <summary>
        /// PUT api/profile
        /// Authentication: Bearer {token}
        /// Content-Type: application/json
        /// 
        /// {
        ///     “FirstName”: “...”,
        ///     “LastName”: “...”
        /// }
        /// </summary>
        [HttpPut]
        public async Task<IActionResult> EditProfile(ProfileEditingModel model)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Edit Profile");
            
            // TODO: Put business logic here
            await Task.CompletedTask;
            
            return Ok(new StateTransfer
            {
                Message = "Profile data is updated now!",
                Payload = ""
            });
        }

        /// <summary>
        /// DELETE api/profile
        /// Authentication: Bearer {token}
        /// Content-Type: application/json
        /// </summary>
        [HttpDelete]
        public async Task<IActionResult> DeleteProfile()
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Delete Profile");
            
            // TODO: Put business logic here
            await Task.CompletedTask;
            
            return Ok(new StateTransfer
            {
                Message = "Profile is deleted now!",
                Payload = "/"
            });
        }
    }
}