using System;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Linq;
using Campus.Services.Interfaces.DTO.Profile;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Campus.Master.API.Helpers.Contracts;
using Campus.Master.API.Models;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Campus.Master.API.Controllers
{
    [ApiController]
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;
        private readonly ITokenBuilder _jwtBuilder;
        private readonly ILogger _logger;

        public ProfileController(IProfileService profileService,
                                 ITokenBuilder jwtBuilder,
                                 ILogger<ProfileController> logger)
        {
            _profileService = profileService;
            _jwtBuilder = jwtBuilder;
            _logger = logger;
        }

        /// <summary>
        /// Get profile information.
        /// </summary>
        /// <remarks>
        /// Request
        /// 
        ///     GET /api/profile
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

            var claimsIdentity = User.Identity as ClaimsIdentity;
            var claimedId = claimsIdentity?.Claims.FirstOrDefault()?.Value;

            if (claimedId == null)
                return BadRequest(new StateTransfer
                {
                    Message = "Failed to parse claims!",
                    Payload = "api/profile"
                });
            
            var id = Convert.ToInt32(claimedId);
            var profileById = await _profileService.GetAppUserProfileByIdAsync(id);

            var result = new ProfileViewDto
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
        ///         “Email”: “...”,
        ///         “Password”: “...”,
        ///         “ConfirmPassword”: “...”,
        ///         “Email”: “...”,
        ///         “FirstName”: “...”,
        ///         “LastName”: “...”
        ///     }
        /// 
        /// </remarks>
        /// <param name="profile">Register form data.</param>
        /// <returns>JWT token.</returns>
        /// <response code="201">New profile created.</response>
        /// <response code="400">Form data is invalid.</response>
        [AllowAnonymous]
        [HttpPost("create")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateProfile(ProfileRegistrationDto profile)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Create Profile @{profile.Login}");

            if (profile.Password != profile.ConfirmPassword)
            {
                return BadRequest(new StateTransfer
                {
                    Message = "Registration form is invalid!",
                    Payload = "api/profile/create"
                });
            }

            try
            {
                await _profileService.CreateAppUserProfileAsync(profile);

                var claims = await _profileService.VerifyAppUserProfile(new ProfileAuthenticationDto
                {
                    Email = profile.Login,
                    Password = profile.Password
                });

                var state = new StateTransfer
                {
                    Message = BuildToken(new ProfileClaimsDto
                    {
                        ProfileId = claims.ProfileId,
                        RoleId = claims.RoleId
                    }),
                    Payload = "api/profile"
                };

                return Created(state.Payload, state);
            }
            catch (ArgumentException)
            {
                return BadRequest(new StateTransfer
                {
                    Message = "User already exists!",
                    Payload = "api/profile/create"
                });
            }
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
        ///         “Email”: “...”,
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
        public async Task<IActionResult> AuthenticateProfile(ProfileAuthenticationDto model)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Authenticate Profile @{model.Email}");

            try
            {
                var claims = await _profileService.VerifyAppUserProfile(new ProfileAuthenticationDto
                {
                    Email = model.Email,
                    Password = model.Password
                });

                return Ok(new StateTransfer
                {
                    Message = BuildToken(new ProfileClaimsDto { 
                        ProfileId = claims.ProfileId, 
                        RoleId = claims.RoleId 
                    }),
                    Payload = "api/profile"
                });
            }
            catch (ApplicationException)
            {
                return BadRequest(new StateTransfer
                {
                    Message = "Wrong username or password!",
                    Payload = "api/profile/auth"
                });
            }
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
        public async Task<IActionResult> EditProfile(ProfileEditingDto model)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Edit Profile");

            var claimsIdentity = User.Identity as ClaimsIdentity;
            var claimedId = claimsIdentity?.Claims.FirstOrDefault()?.Value;

            if (claimedId == null)
                return BadRequest(new StateTransfer
                {
                    Message = "Failed to parse claims!",
                    Payload = "api/profile"
                });
            
            var id = Convert.ToInt32(claimedId);
            await _profileService.EditAppUserProfileByIdAsync(id, new ProfileEditingDto
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

            var claimsIdentity = User.Identity as ClaimsIdentity;
            var claimedId = claimsIdentity?.Claims.FirstOrDefault()?.Value;

            if (claimedId == null)
                return BadRequest(new StateTransfer
                {
                    Message = "Failed to parse claims!",
                    Payload = "api/profile"
                });
            
            var id = Convert.ToInt32(claimedId);
            await _profileService.DeleteAppUserProfileByIdAsync(id);

            return Ok(new StateTransfer
            {
                Message = $"Profile is deleted now!",
                Payload = "/"
            });
        }

        private string BuildToken(ProfileClaimsDto model) => 
            _jwtBuilder.ResetClaims()
                .AddClaim(ClaimTypes.NameIdentifier, model.ProfileId.ToString())
                .AddClaim(ClaimTypes.Role, model.RoleId.ToString())
                .Build();
    }
}