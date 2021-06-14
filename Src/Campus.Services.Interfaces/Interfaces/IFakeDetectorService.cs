using System.Threading.Tasks;
using Campus.Services.Interfaces.DTO.Auxiliary;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface IFakeDetectorService
    {
        public Task<string> PostImageToValidate(byte[] imageData, ImageAttributes attributes);
    }
}
