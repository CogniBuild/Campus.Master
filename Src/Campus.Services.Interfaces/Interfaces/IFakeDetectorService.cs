using System.Net.Http;
using System.Threading.Tasks;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface IFakeDetectorService
    {
        public Task<string> PostImageToValidate(byte[] imageData, string imageName);
    }
}