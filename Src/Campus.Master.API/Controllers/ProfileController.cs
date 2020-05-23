using System;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Campus.Infrastructure.Business.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Campus.Master.API.Models.Profile;
using Campus.Master.API.Models;
using Campus.Services.Interfaces.DTO;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;

namespace Campus.Master.API.Controllers
{
    [ApiController]
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;

        public ProfileController(IProfileService profileService,
                                 IConfiguration configuration,
                                 ILogger<ProfileController> logger)
        {
            _profileService = profileService;
            _configuration = configuration;
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

            if (model.Password != model.ConfirmPassword)
            {
                return BadRequest(new StateTransfer
                {
                    Message = "Registration form is invalid!",
                    Payload = "api/profile/create"
                });
            }

            try
            {
                await _profileService.CreateAppUserProfileAsync(new ProfileRegistrationModelDto
                {
                    Login = model.Login,
                    Password = model.Password,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName
                });

                var claims = await _profileService.VerifyAppUserProfile(new ProfileAuthenticationDto
                {
                    Login = model.Login,
                    Password = model.Password
                });

                var state = new StateTransfer
                {
                    Message = BuildToken(new ProfileClaimsModel
                    {
                        ProfileId = claims.ProfileId,
                        RoleId = claims.RoleId
                    }),
                    Payload = "api/profile"
                };

                return Created(state.Payload, state);
            }
            catch (ApplicationException)
            {
                return BadRequest(new StateTransfer
                {
                    Message = "User already exists!",
                    Payload = "api/profile/create"
                });
            }
            catch (Exception)
            {
                return StatusCode(500);
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

            try
            {
                var claims = await _profileService.VerifyAppUserProfile(new ProfileAuthenticationDto
                {
                    Login = model.Login,
                    Password = model.Password
                });

                return Ok(new StateTransfer
                {
                    Message = BuildToken(new ProfileClaimsModel { 
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
            catch (Exception)
            {
                return StatusCode(500);
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

        private string BuildToken(ProfileClaimsModel model)
        {
            var claims = new[] {
                new Claim(ClaimTypes.NameIdentifier, model.ProfileId.ToString()),
                new Claim(ClaimTypes.Role, model.RoleId.ToString())
            };

            var encryptingSecret = Encoding.UTF8.GetBytes(_configuration
                .GetSection("Security:EndpointEncryptionSecret").Value);
            var key = new SymmetricSecurityKey(encryptingSecret);
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var descriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(6),
                SigningCredentials = credentials
            };

            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateToken(descriptor);
            
            return handler.WriteToken(token);
        }
    }
}