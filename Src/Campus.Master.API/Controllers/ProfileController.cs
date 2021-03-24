using System.Threading.Tasks;
using System.Security.Claims;
using System.Threading;
using Campus.Master.API.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Campus.Master.API.Helpers.Contracts;
using Campus.Services.Interfaces.DTO.User;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Campus.Master.API.Controllers
{
    [ApiController]
    [Authorize]
    [ApplicationExceptionHandler]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IClaimExtractionService _claimExtractionService;
        private readonly IProfileService _profileService;
        private readonly ITokenBuilder _jwtBuilder;

        public ProfileController(IClaimExtractionService claimExtractionService,
            IProfileService profileService,
            ITokenBuilder jwtBuilder)
        {
            _claimExtractionService = claimExtractionService;
            _profileService = profileService;
            _jwtBuilder = jwtBuilder;
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
        [EntryPointLogging(ActionName = "[Profile] Get Profile Information", SenderName = "ProfileController")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<UserViewDto> GetProfileInformation(CancellationToken token) =>
            await _profileService.GetUserByIdAsync(_claimExtractionService.GetUserIdFromClaims(), token);

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
        ///         "Email": "...",
        ///         "UserName": "...",
        ///         "FullName": "...",
        ///         "Password": "...",
        ///         "ConfirmPassword": "..."
        ///     }
        /// 
        /// </remarks>
        /// <param name="profile">Register form data.</param>
        /// <param name="token"></param>
        /// <returns>JWT token.</returns>
        /// <response code="201">New profile created.</response>
        /// <response code="400">Form data is invalid.</response>
        [AllowAnonymous]
        [HttpPost("create")]
        [EntryPointLogging(ActionName = "[Profile] Create Profile", SenderName = "ProfileController")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<string> CreateProfile(UserRegistrationDto profile, CancellationToken token)
        {
            await _profileService.CreateUserAsync(profile, token);

            return await VerifyUserAndBuildToken(new UserAuthenticationDto
            {
                Email = profile.Email,
                Password = profile.Password
            }, token);
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
        ///         "Email": "...",
        ///         "Password": "..."
        ///     }
        /// 
        /// </remarks>
        /// <param name="profile">Log in form data.</param>
        /// <param name="token"></param>
        /// <returns>JWT token.</returns>
        /// <response code="200">New profile created.</response>
        /// <response code="400">Form data is invalid.</response>
        [AllowAnonymous]
        [EntryPointLogging(ActionName = "[Profile] Authenticate Profile", SenderName = "ProfileController")]
        [HttpPost("auth")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<string> AuthenticateProfile(UserAuthenticationDto profile, CancellationToken token) =>
            await VerifyUserAndBuildToken(profile, token);

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
        ///         "FullName": "..."
        ///     }
        /// 
        /// </remarks>
        /// <param name="profile">Edit profile form data.</param>
        /// <param name="token"></param>
        /// <returns>State transfer model.</returns>
        /// <response code="200">Profile data is updated.</response>
        /// <response code="400">Edit profile form data is invalid.</response>
        /// <response code="401">User is unauthorized.</response>
        [HttpPut]
        [EntryPointLogging(ActionName = "[Profile] Edit Profile", SenderName = "ProfileController")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task EditProfile(UserEditDto profile, CancellationToken token) =>
            await _profileService.EditUserAsync(_claimExtractionService.GetUserIdFromClaims(), profile, token);

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
        [EntryPointLogging(ActionName = "[Profile] Delete Profile", SenderName = "ProfileController")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task DeleteProfile(CancellationToken token) =>
            await _profileService.DeleteUserAsync(_claimExtractionService.GetUserIdFromClaims(), token);

        private async Task<string> VerifyUserAndBuildToken(UserAuthenticationDto profile,
            CancellationToken token)
        {
            var claims = await _profileService.VerifyUserAsync(profile, token);
            
            return _jwtBuilder.ResetClaims()
                .AddClaim(ClaimTypes.NameIdentifier, claims.ProfileId)
                .Build();
        }
    }
}
