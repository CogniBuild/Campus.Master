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
    [Collection("Create Profile")]
    public class CreateProfileTests : ProfileControllerTest
    {
        [Fact]
        public async Task ShouldThrowException_WhenPasswordsDoNotMatch()
        {
            // Arrange
            var profile = new ProfileRegistrationDto
            {
                Email = "example@domain.com",
                Password = "password",
                ConfirmPassword = "password1",
                FirstName = "FirstName",
                LastName = "LastName"
            };

            // Act
            Func<Task> sutCall = async () => await Sut.CreateProfile(profile);

            // Assert
            await sutCall.Should().ThrowAsync<ApplicationException>()
                .WithMessage("Wrong username or password.");
        }
        
        [Fact]
        public async Task ShouldThrowException_WhenUserWithEmailAlreadyExistsInDatabase()
        {
            // Arrange
            var profile = new ProfileRegistrationDto
            {
                Email = "example@gmail.com",
                Password = "password",
                ConfirmPassword = "password",
                FirstName = "FirstName",
                LastName = "LastName"
            };

            // Act
            Func<Task> sutCall = async () => await Sut.CreateProfile(profile);

            // Assert
            await sutCall.Should().ThrowAsync<ApplicationException>()
                .WithMessage("User already exists.");
        }

        [Fact]
        public async Task ShouldAddUserToDatabase_WhenUserIsUnique()
        {
            // Arrange
            var profile = new ProfileRegistrationDto
            {
                Email = "unique_user@gmail.com",
                Password = "password",
                ConfirmPassword = "password",
                FirstName = "FirstName",
                LastName = "LastName"
            };

            // Act
            var response = await Sut.CreateProfile(profile);

            // Assert
            response.Should().NotBeNull();
        }
    }
}