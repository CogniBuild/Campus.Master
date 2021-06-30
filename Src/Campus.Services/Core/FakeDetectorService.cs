using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Campus.Services.Interfaces.DTO.Auxiliary;
using Campus.Services.Interfaces.Interfaces;
using ICampusConfigurationProvider = Campus.Services.Interfaces.Interfaces.Configuration.IConfigurationProvider;

namespace Campus.Services.Implementation.Core
{
    class FakeDetectorService : IFakeDetectorService
    {
        private readonly ICampusConfigurationProvider _configuration;

        public FakeDetectorService(ICampusConfigurationProvider configuration)
        {
            _configuration = configuration;
        }

        public async Task<string> PostImageToValidate(byte[] imageData, ImageAttributes attributes)
        {
            var fakeDetectorRequest = new HttpClient();

            fakeDetectorRequest.DefaultRequestHeaders.Add("x-functions-key",
                _configuration.GetConfigurationValue("FakeDetector:ApiKey", Convert.ToString));


            var byteArrayContent = new ByteArrayContent(imageData);
            byteArrayContent.Headers.ContentType = MediaTypeHeaderValue.Parse(attributes.ContentType);

            var response = await fakeDetectorRequest.PostAsync(
                _configuration.GetConfigurationValue("FakeDetector:Uri", Convert.ToString),
                new MultipartFormDataContent
                {
                    {byteArrayContent, "\"file\"", attributes.FileName}
                });

            return await response.Content.ReadAsStringAsync();
        }
    }
}
