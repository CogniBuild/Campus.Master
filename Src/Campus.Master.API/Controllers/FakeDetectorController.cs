using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Campus.Master.API.Filters;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

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

            return await _detectorService.PostImageToValidate(fileBytes, image.FileName);
        }
    }
}
