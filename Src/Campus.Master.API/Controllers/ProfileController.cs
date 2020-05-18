using System;
using System.Threading.Tasks;
using Campus.Infrastructure.Business.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Campus.Master.API.Models.Profile;
using Campus.Master.API.Models;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Campus.Master.API.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;
        private readonly ILogger _logger;

        public ProfileController(IProfileService profileService, ILogger<ProfileController> logger)
        {
            _profileService = profileService;
            _logger = logger;
        }

        /// <summary>
        /// Get profile information.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     GET /api/Profile
        ///     Authentication: Bearer {token}
        ///     Content-Type: application/json
        /// 
        /// </remarks>
        /// <returns>General profile information.</returns>
        /// <response code="200">User exists and is authorized.</response>
        /// <response code="401">User is unauthorized.</response>  
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetProfileInformation()
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Get Profile Information");

            int id = 1;

            var profileById = await _profileService.GetAppUserProfileByIdAsync(id);

            var result = new ProfileViewModel
            {
                Login = profileById.Login,
                Email = profileById.Email,
                FirstName = profileById.FirstName,
                LastName = profileById.LastName
            };

            return Ok(result);
        }

        /// <summary>
        /// Create profile.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     POST /api/profile/create
        ///     Content-Type: application/json
        /// 
        ///     {
        ///         “Login”: “...”,
        ///         “Password”: “...”,
        ///         “ConfirmPassword”: “...”,
        ///         “Email”: “...”,
        ///         “FirstName”: “...”,
        ///         “LastName”: “...”
        ///     }
        /// 
        /// </remarks>
        /// <param name="model">Register form data.</param>
        /// <returns>JWT token.</returns>
        /// <response code="201">New profile created.</response>
        /// <response code="400">Form data is invalid.</response>
        [AllowAnonymous]
        [HttpPost("create")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateProfile(ProfileRegistrationModel model)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Create Profile @{model.Login}");

            await _profileService.CreateAppUserProfileAsync(new ProfileRegistrationModelDto
            {
                Login = model.Login,
                Password = model.Password,
                ConfirmPassword = model.ConfirmPassword,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName
            });

            var state = new StateTransfer
            {
                Message = "{JWT-TOKEN}",
                Payload = "api/profile"
            };

            return Created(state.Payload, state);
        }

        /// <summary>
        /// Authenticate profile.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     POST /api/profile/auth
        ///     Content-Type: application/json
        /// 
        ///     {
        ///         “Login”: “...”,
        ///         “Password”: “...”
        ///     }
        /// 
        /// </remarks>
        /// <param name="model">Log in form data.</param>
        /// <returns>JWT token.</returns>
        /// <response code="200">New profile created.</response>
        /// <response code="400">Form data is invalid.</response>
        [AllowAnonymous]
        [HttpPost("auth")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AuthenticateProfile(AuthenticationModel model)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Authenticate Profile @{model.Login}");

            // TODO: Put business logic here
            await Task.CompletedTask;

            return Ok(new StateTransfer
            {
                Message = "{JWT-TOKEN}",
                Payload = "api/profile"
            });
        }

        /// <summary>
        /// Edit profile.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     PUT /api/profile
        ///     Authentication: Bearer {token}
        ///     Content-Type: application/json
        /// 
        ///     {
        ///         “FirstName”: “...”,
        ///         “LastName”: “...”
        ///     }
        /// 
        /// </remarks>
        /// <param name="model">Edit profile form data.</param>
        /// <returns>State transfer model.</returns>
        /// <response code="200">Profile data is updated.</response>
        /// <response code="400">Edit profile form data is invalid.</response>
        /// <response code="401">User is unauthorized.</response>
        [HttpPut]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> EditProfile(ProfileEditingModel model)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Edit Profile");

            int id = 1;

            await _profileService.EditAppUserProfileByIdAsync(id, new ProfileEditingModelDto
            {
                FirstName = model.FirstName,
                LastName = model.LastName
            });


            return Ok(new StateTransfer
            {
                Message = "Profile data is updated now!",
                Payload = "api/profile"
            });
        }

        /// <summary>
        /// Delete profile.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     DELETE /api/profile
        ///     Authentication: Bearer {token}
        ///     Content-Type: application/json
        /// 
        /// </remarks>
        /// <returns>State transfer model.</returns>
        /// <response code="200">Profile is deleted.</response>
        /// <response code="401">User is unauthorized.</response>  
        [HttpDelete]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> DeleteProfile()
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Delete Profile");

            int id = 1;

            await _profileService.DeleteAppUserProfileByIdAsync(id);

            return Ok(new StateTransfer
            {
                Message = $"Profile is deleted now!",
                Payload = "/"
            });
        }
    }
}