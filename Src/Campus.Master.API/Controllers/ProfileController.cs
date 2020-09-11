using System;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Linq;
using Campus.Master.API.Filters;
using Campus.Services.Interfaces.DTO.Profile;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
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

        public ProfileController(IProfileService profileService,
                                 ITokenBuilder jwtBuilder)
        {
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
        public async Task<ProfileViewDto> GetProfileInformation() =>
            await _profileService.GetAppUserProfileByIdAsync(GetUserIdFromClaims());

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
        [EntryPointLogging(ActionName = "[Profile] Create Profile", SenderName = "ProfileController")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<StateTransfer> CreateProfile(ProfileRegistrationDto profile)
        {
            await _profileService.CreateProfileAsync(profile);
            return await VerifyAppUserAndBuildToken(new ProfileAuthenticationDto
            {
                Email = profile.Email,
                Password = profile.Password
            });
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
        /// <param name="profile">Log in form data.</param>
        /// <returns>JWT token.</returns>
        /// <response code="200">New profile created.</response>
        /// <response code="400">Form data is invalid.</response>
        [AllowAnonymous]
        [EntryPointLogging(ActionName = "[Profile] Authenticate Profile", SenderName = "ProfileController")]
        [HttpPost("auth")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<StateTransfer> AuthenticateProfile(ProfileAuthenticationDto profile) =>
            await VerifyAppUserAndBuildToken(profile);

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
        /// <param name="profile">Edit profile form data.</param>
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
        public async Task EditProfile(ProfileEditingDto profile) =>
            await _profileService.EditAppUserProfileByIdAsync(GetUserIdFromClaims(), profile);

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
        public async Task DeleteProfile() =>
            await _profileService.DeleteAppUserProfileByIdAsync(GetUserIdFromClaims());

        private async Task<StateTransfer> VerifyAppUserAndBuildToken(ProfileAuthenticationDto profile)
        {
            var claims = await _profileService.VerifyAppUserProfile(profile);

            return new StateTransfer
            {
                Message = BuildToken(new ProfileClaimsDto
                {
                    ProfileId = claims.ProfileId,
                    RoleId = claims.RoleId
                }),
                Payload = "api/profile"
            };
        }

        private string BuildToken(ProfileClaimsDto model) => 
            _jwtBuilder.ResetClaims()
                .AddClaim(ClaimTypes.NameIdentifier, model.ProfileId.ToString())
                .AddClaim(ClaimTypes.Role, model.RoleId.ToString())
                .Build();

        private int GetUserIdFromClaims()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var claimedId = claimsIdentity?.Claims.FirstOrDefault()?.Value;

            if (claimedId == null)
                throw new ApplicationException("Failed to identify claims.");
            
            return Convert.ToInt32(claimedId);
        }
    }
}