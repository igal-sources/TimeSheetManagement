using System.Threading.Tasks;
using TimeSheet.Server.Core.Common.Models;

namespace TimeSheet.Server.Projects.Common.Contracts
{
    public interface IProjectsService
    {
        Task<APIResponse> GetProjectList();
        Task<APIResponse> GetProjectSelectList();
        Task<APIResponse> GetProjectById(string id);
        Task<APIResponse> GetProjectByCustomerId(string id);
        Task<APIResponse> SaveProject(string formJson);
        Task<APIResponse> UpdateProject(string formJson);
    }
}