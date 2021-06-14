using System.IO;
using System.Threading.Tasks;
using Campus.Master.API.Filters;
using Campus.Services.Interfaces.DTO.Auxiliary;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Campus.Master.API.Controllers
{
    [ApiController]
    [Authorize]
    [ApplicationExceptionHandler]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class FakeDetectorController : ControllerBase
    {
        private readonly IFakeDetectorService _detectorService;

        public FakeDetectorController(IFakeDetectorService detectorService)
        {
            _detectorService = detectorService;
        }

        [HttpPost]
        [Route("validateImage")]
        public async Task<string> ValidateImage()
        {
            var image = HttpContext.Request.Form.Files["Image"];

            await using var ms = new MemoryStream();
            await image.CopyToAsync(ms);
            var fileBytes = ms.ToArray();

            return await _detectorService.PostImageToValidate(fileBytes, new ImageAttributes
            {
                FileName = image.FileName,
                ContentType = image.ContentType
            });
        }
    }
}
