using System;
using System.Threading.Tasks;
using Campus.Services.Interfaces.DTO.Profile;
using FluentAssertions;
using Xunit;

namespace Campus.Master.IntegrationTests.ProfileController
{
    public class AuthenticateProfileTests : ProfileControllerTest
    {
        [Fact]
        public async Task ShouldThrowException_WhenUserWithEmailDoesntExist()
        {
            // Arrange
            var profile = new ProfileAuthenticationDto
            {
                Email = "example@domain.com",
                Password = "password"
            };

            // Act
            Func<Task> sutCall = async () => await Sut.AuthenticateProfile(profile);

            // Assert
            await sutCall.Should().ThrowAsync<ApplicationException>()
                .WithMessage("Wrong username or password.");
        }
    }
}