using System.Threading.Tasks;
using TimeSheet.Server.Core.Common.Models;

namespace TimeSheet.Server.WorkingHours.Common.Contracts
{
    public interface IWorkingHoursService
    {
        Task<APIResponse> GetWorkingHoursList();
        Task<APIResponse> GetWorkingHoursById(string id);
        Task<APIResponse> SaveWorkingHours(string formJson);
        Task<APIResponse> UpdateWorkingHours(string formJson);
    }
}
