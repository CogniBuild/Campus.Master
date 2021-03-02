using System.Threading;
using System.Threading.Tasks;
using Campus.Services.Interfaces.DTO.Classroom;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface IClassroomService
    {
        Task<ClassroomPreviewDto> GetClassroomPreview(int id, CancellationToken token);
        Task<ClassroomViewDto> GetClassroomView(int id, CancellationToken token);

        Task CreateClassroom(string userId, ClassroomContentDto classroom, CancellationToken token);
        Task EditClassroom(string userId, int classroomId, ClassroomContentDto classroom, CancellationToken token);
        Task DeleteClassroom(int classroomId, CancellationToken token);
    }
}