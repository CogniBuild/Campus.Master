using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

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
    public class CreateProfileTests : IDisposable
    {
        private Controller Sut { get; }
        private IHttpContextAccessor Accessor { get; }
        private CampusContext Context { get; }
        
        public CreateProfileTests()
        {
            var collection = ServiceCollectionBuilder.BuildCollection();
            
            collection.AddDbContext<CampusContext>(
                options => options.UseInMemoryDatabase(databaseName: nameof(CreateProfileTests)));
            
            var provider = collection.BuildServiceProvider();
            
            var accessor = ContextAccessorBuilder.Build("1", "1");

            var profile = ServiceLocator.Get<IProfileService>(provider);
            var token = ServiceLocator.Get<ITokenBuilder>(provider);
            var context = ServiceLocator.Get<CampusContext>(provider);

            context.AddSampleUsers();
            Accessor = accessor;
            Context = context;
            Sut = new Controller(accessor, profile, token);
        }
        
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

        public void Dispose()
        {
            Context.ClearUsers();
            Context.Dispose();
        }
    }
}