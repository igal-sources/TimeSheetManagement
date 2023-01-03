using System.Threading.Tasks;

namespace TimeSheet.Server.Projects.Business.Repositories
{
    public interface IProjectsRepository
    {
        Task<string> GetProjectList();
        Task<string> GetProjectSelectList();
        Task<string> GetProjectById(string id);
        Task<string> GetProjectByCustomerId(string id);
        Task<string> SaveProject(string formJson);
        Task<string> UpdateProject(string formJson);
    }
}
