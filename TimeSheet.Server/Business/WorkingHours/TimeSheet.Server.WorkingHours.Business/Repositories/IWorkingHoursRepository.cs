using System.Threading.Tasks;

namespace TimeSheet.Server.WorkingHours.Business.Repositories
{
    public interface IWorkingHoursRepository
    {
        Task<string> GetWorkingHoursList();
        Task<string> GetWorkingHoursById(string id);
        Task<string> SaveWorkingHours(string formJson);
        Task<string> UpdateWorkingHours(string formJson);


    }
}
