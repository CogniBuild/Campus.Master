using System;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Campus.Infrastructure.Data.EntityFrameworkCore.Context;
using Campus.Master.API.Helpers.Contracts;
using Campus.Master.IntegrationTests.Utils;
using Campus.Services.Interfaces.DTO.Profile;
using Campus.Services.Interfaces.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Xunit;
using Controller =  Campus.Master.API.Controllers.ProfileController;

namespace Campus.Master.IntegrationTests.ProfileController
{
    public class GetProfileInformationTests : IDisposable
    {
        private Controller Sut { get; }
        private IHttpContextAccessor Accessor { get; }
        private CampusContext Context { get; }
        
        public GetProfileInformationTests()
        {
            var serviceProvider = ServiceCollectionBuilder.BuildCollection();
            var accessor = ContextAccessorBuilder.Build("1", "1");
            var profile = ServiceLocator.Get<IProfileService>(serviceProvider);
            var token = ServiceLocator.Get<ITokenBuilder>(serviceProvider);
            var context = ServiceLocator.Get<CampusContext>(serviceProvider);

            context.AddSampleUsers();
            Accessor = accessor;
            Context = context;
            Sut = new Controller(accessor, profile, token);
        }

        [Fact]
        public async Task ShouldThrowException_WhenIdentityHasWrongType()
        {
            // Arrange
            Accessor.HttpContext.User = new ClaimsPrincipal(new GenericIdentity(""));
            
            // Act
            Func<Task> sutCall = async () => await Sut.GetProfileInformation();

            // Assert
            await sutCall.Should().ThrowAsync<ApplicationException>()
                .WithMessage("Failed to identify user.");
        }
        
        [Fact]
        public async Task ShouldThrowException_WhenIdentityHasNoClaims()
        {
            // Arrange
            Accessor.HttpContext.User = new ClaimsPrincipal(new ClaimsIdentity(new Claim[0]));
            
            // Act
            Func<Task> sutCall = async () => await Sut.GetProfileInformation();

            // Assert
            await sutCall.Should().ThrowAsync<ApplicationException>()
                .WithMessage("Failed to identify user.");
        }
        
        [Fact]
        public async Task ShouldReturnProfileView_WhenUserExistsInDatabase()
        {
            // Arrange
            Accessor.HttpContext.User = new ClaimsPrincipal(new ClaimsIdentity(new []
            {
                new Claim(ClaimTypes.NameIdentifier, "1"),
                new Claim(ClaimTypes.Role, "1")
            }));

            var expectedResponse = new ProfileViewDto
            {
                Email = "user1@domain.com",
                FirstName = "Foo",
                LastName = "Bar"
            };
            
            // Act
            var response = await Sut.GetProfileInformation();

            // Assert
            response.Should().BeEquivalentTo(expectedResponse);
        }

        public void Dispose()
        {
            Context.ClearUsers();
            Context.Dispose();
        }
    }
}