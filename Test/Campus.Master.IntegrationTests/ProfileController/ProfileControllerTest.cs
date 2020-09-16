using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Campus.Domain.Core.Models;
using Campus.Services.Interfaces.Interfaces;
using Campus.Infrastructure.Data.EntityFrameworkCore.Context;
using Campus.Master.API.Helpers.Contracts;
using Microsoft.AspNetCore.Http;
using Controller =  Campus.Master.API.Controllers.ProfileController;

namespace Campus.Master.IntegrationTests.ProfileController
{
    public class ProfileControllerTest : BaseTest
    {
        protected Controller Sut { get; }
        private CampusContext Context { get; }

        protected ProfileControllerTest()
        {
            Sut = new Controller(
                SetIdentityProvider(),
                (IProfileService)Provider.GetService(typeof(IProfileService)),
                (ITokenBuilder)Provider.GetService(typeof(ITokenBuilder)));

            Context = (CampusContext) Provider.GetService(typeof(CampusContext));
            
            AddSampleUsers();
        }
        
        private IHttpContextAccessor SetIdentityProvider()
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, "1"),
                new Claim(ClaimTypes.Role, "1")
            };

            var identity = new ClaimsIdentity(claims);
            var accessor = new HttpContextAccessor
            {
                HttpContext = new DefaultHttpContext()
                {
                    User = new ClaimsPrincipal(identity)
                }
            };

            return accessor;
        }

        private void ClearRecords()
        {
            Context.Users.RemoveRange(Context.Users.AsEnumerable());
            Context.SaveChanges();
        }

        private void AddRecord(AppUser user)
        {
            Context.Users.Add(user);
            Context.SaveChanges();
        }

        private void AddSampleUsers()
        {
            AddRecord(new AppUser
            {
                Email = "user1@domain.com",
                PasswordHash = new byte[] { 167, 139, 163, 99, 136, 221, 199, 4, 0, 198, 231, 121, 40, 148, 77, 
                    45, 137, 23, 24, 51, 101, 207, 90, 148, 57, 29, 213, 120, 92, 47, 19, 
                    81, 161, 224, 228, 19, 114, 126, 219, 133, 129, 130, 181, 177, 71, 143, 
                    4, 81, 9, 95, 214, 191, 196, 33, 207, 68, 92, 39, 182, 50, 186, 
                    173, 212, 217 },
                PasswordSalt = new byte[] { 228, 36, 57, 14, 202, 140, 19, 206, 78, 51, 141, 152, 64, 163, 51, 
                    83, 32, 168, 188, 148, 39, 123, 44, 32, 167, 81, 125, 203, 142, 180, 
                    60, 26, 136, 6, 75, 128, 30, 44, 254, 100, 230, 43, 248, 65, 234, 244, 
                    94, 231, 186, 141, 64, 203, 223, 197, 253, 78, 63, 217, 69, 239, 140, 
                    50, 12, 188, 103, 60, 23, 210, 246, 35, 242, 17, 222, 167, 27, 227, 55, 
                    51, 108, 85, 224, 222, 106, 242, 66, 141, 96, 189, 177, 235, 100, 121, 
                    107, 95, 110, 30, 129, 43, 85, 31, 82, 58, 130, 197, 64, 131, 147, 164, 
                    209, 20, 18, 175, 138, 127, 153, 115, 38, 58, 190, 149, 208, 79, 234, 52, 
                    95, 182, 215, 156 }
            });
            AddRecord(new AppUser
            {
                Email = "user2@domain.com",
                PasswordHash = new byte[] { 167, 139, 163, 99, 136, 221, 199, 4, 0, 198, 231, 121, 40, 148, 77, 
                    45, 137, 23, 24, 51, 101, 207, 90, 148, 57, 29, 213, 120, 92, 47, 19, 
                    81, 161, 224, 228, 19, 114, 126, 219, 133, 129, 130, 181, 177, 71, 143, 
                    4, 81, 9, 95, 214, 191, 196, 33, 207, 68, 92, 39, 182, 50, 186, 
                    173, 212, 217 },
                PasswordSalt = new byte[] { 228, 36, 57, 14, 202, 140, 19, 206, 78, 51, 141, 152, 64, 163, 51, 
                    83, 32, 168, 188, 148, 39, 123, 44, 32, 167, 81, 125, 203, 142, 180, 
                    60, 26, 136, 6, 75, 128, 30, 44, 254, 100, 230, 43, 248, 65, 234, 244, 
                    94, 231, 186, 141, 64, 203, 223, 197, 253, 78, 63, 217, 69, 239, 140, 
                    50, 12, 188, 103, 60, 23, 210, 246, 35, 242, 17, 222, 167, 27, 227, 55, 
                    51, 108, 85, 224, 222, 106, 242, 66, 141, 96, 189, 177, 235, 100, 121, 
                    107, 95, 110, 30, 129, 43, 85, 31, 82, 58, 130, 197, 64, 131, 147, 164, 
                    209, 20, 18, 175, 138, 127, 153, 115, 38, 58, 190, 149, 208, 79, 234, 52, 
                    95, 182, 215, 156 }
            });
            AddRecord(new AppUser
            {
                Email = "user3@domain.com",
                PasswordHash = new byte[] { 167, 139, 163, 99, 136, 221, 199, 4, 0, 198, 231, 121, 40, 148, 77, 
                    45, 137, 23, 24, 51, 101, 207, 90, 148, 57, 29, 213, 120, 92, 47, 19, 
                    81, 161, 224, 228, 19, 114, 126, 219, 133, 129, 130, 181, 177, 71, 143, 
                    4, 81, 9, 95, 214, 191, 196, 33, 207, 68, 92, 39, 182, 50, 186, 
                    173, 212, 217 },
                PasswordSalt = new byte[] { 228, 36, 57, 14, 202, 140, 19, 206, 78, 51, 141, 152, 64, 163, 51, 
                    83, 32, 168, 188, 148, 39, 123, 44, 32, 167, 81, 125, 203, 142, 180, 
                    60, 26, 136, 6, 75, 128, 30, 44, 254, 100, 230, 43, 248, 65, 234, 244, 
                    94, 231, 186, 141, 64, 203, 223, 197, 253, 78, 63, 217, 69, 239, 140, 
                    50, 12, 188, 103, 60, 23, 210, 246, 35, 242, 17, 222, 167, 27, 227, 55, 
                    51, 108, 85, 224, 222, 106, 242, 66, 141, 96, 189, 177, 235, 100, 121, 
                    107, 95, 110, 30, 129, 43, 85, 31, 82, 58, 130, 197, 64, 131, 147, 164, 
                    209, 20, 18, 175, 138, 127, 153, 115, 38, 58, 190, 149, 208, 79, 234, 52, 
                    95, 182, 215, 156 }
            });
            AddRecord(new AppUser
            {
                Email = "example@gmail.com",
                PasswordHash = new byte[] { 167, 139, 163, 99, 136, 221, 199, 4, 0, 198, 231, 121, 40, 148, 77, 
                    45, 137, 23, 24, 51, 101, 207, 90, 148, 57, 29, 213, 120, 92, 47, 19, 
                    81, 161, 224, 228, 19, 114, 126, 219, 133, 129, 130, 181, 177, 71, 143, 
                    4, 81, 9, 95, 214, 191, 196, 33, 207, 68, 92, 39, 182, 50, 186, 
                    173, 212, 217 },
                PasswordSalt = new byte[] { 228, 36, 57, 14, 202, 140, 19, 206, 78, 51, 141, 152, 64, 163, 51, 
                    83, 32, 168, 188, 148, 39, 123, 44, 32, 167, 81, 125, 203, 142, 180, 
                    60, 26, 136, 6, 75, 128, 30, 44, 254, 100, 230, 43, 248, 65, 234, 244, 
                    94, 231, 186, 141, 64, 203, 223, 197, 253, 78, 63, 217, 69, 239, 140, 
                    50, 12, 188, 103, 60, 23, 210, 246, 35, 242, 17, 222, 167, 27, 227, 55, 
                    51, 108, 85, 224, 222, 106, 242, 66, 141, 96, 189, 177, 235, 100, 121, 
                    107, 95, 110, 30, 129, 43, 85, 31, 82, 58, 130, 197, 64, 131, 147, 164, 
                    209, 20, 18, 175, 138, 127, 153, 115, 38, 58, 190, 149, 208, 79, 234, 52, 
                    95, 182, 215, 156 }
            });
        }
        
        protected override async Task OnDestroyAsync()
        {
            await base.OnDestroyAsync();
            ClearRecords();
        }
    }
}
