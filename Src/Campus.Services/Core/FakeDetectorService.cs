using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Campus.Services.Interfaces.DTO.Auxiliary;
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

        public async Task<string> PostImageToValidate(byte[] imageData, ImageAttributes attributes)
        {
            var fakeDetectorRequest = new HttpClient();

            var fakeDetectorSettings = _configuration
                .GetSection("FakeDetector");

            fakeDetectorRequest
                .DefaultRequestHeaders
                .Add("x-functions-key", fakeDetectorSettings.GetValue<string>("ApiKey"));

            
            var byteArrayContent = new ByteArrayContent(imageData);
            byteArrayContent.Headers.ContentType = MediaTypeHeaderValue.Parse(attributes.ContentType);

            var response = await fakeDetectorRequest.PostAsync(
                fakeDetectorSettings.GetValue<string>("Uri"), new MultipartFormDataContent
                {
                    { byteArrayContent, "\"file\"", attributes.FileName }
                });

            return await response.Content.ReadAsStringAsync();
        }
    }
}
