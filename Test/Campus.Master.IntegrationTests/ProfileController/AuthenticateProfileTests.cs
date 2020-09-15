using System;
using System.Text;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Master.API.Models;
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
            await ConfigureUsers();

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
        
        [Fact]
        public async Task ShouldReturnStateTransfer_WhenUserPasswordMatchWithDatabase()
        {
            // Arrange
            await ConfigureUsers();

            var profile = new ProfileAuthenticationDto
            {
                Email = "example@gmail.com",
                Password = "A1111111"
            };

            // Act
            var response = await Sut.AuthenticateProfile(profile);

            // Assert
            response.Should().NotBeNull();
        }

        private async Task ConfigureUsers()
        {
            await ClearRecordsAsync();
            await AddSampleUsers();
        }
    }
}
