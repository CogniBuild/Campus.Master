using Campus.Services.Interfaces.Interfaces;
using Campus.Infrastructure.Business.Services;
using Campus.Master.API.Helpers.Contracts;
using Campus.Master.API.Helpers.Implementations;

using Controller =  Campus.Master.API.Controllers.ProfileController;

namespace Campus.Master.IntegrationTests.ProfileController
{
    public class ProfileControllerTest : BaseTest
    {
        protected Controller Sut { get; }

        protected ProfileControllerTest()
        {
            Sut = new Controller(
                (IProfileService)Provider.GetService(typeof(IProfileService)),
                (ITokenBuilder)Provider.GetService(typeof(ITokenBuilder)));
        }
    }
}