using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Campus.Services.Interfaces.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Campus.Services.Core
{
    class FakeDetectorService : IFakeDetectorService
    {
        private readonly IConfiguration _configuration;

        public FakeDetectorService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<string> PostImageToValidate(byte[] imageData)
        {
            var fakeDetectorRequest = new HttpClient();

            var fakeDetectorSettings = _configuration
                .GetSection("FakeDetector");

            fakeDetectorRequest
                .DefaultRequestHeaders
                .Add("x-functions-key", fakeDetectorSettings.GetValue<string>("ApiKey"));

            var response = await fakeDetectorRequest.PostAsync(
                fakeDetectorSettings.GetValue<string>("Uri"),
                new MultipartFormDataContent
                {{new StreamContent(imageData),"file"}});

            return await response.Content.ReadAsStringAsync();
        }
    }
}
