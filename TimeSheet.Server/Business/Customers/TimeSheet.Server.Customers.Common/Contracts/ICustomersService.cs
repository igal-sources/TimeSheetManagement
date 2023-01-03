using System.Threading.Tasks;
using TimeSheet.Server.Core.Common.Models;
using TimeSheet.Server.Customers.Common.Models;

namespace TimeSheet.Server.Customers.Common.Contracts
{
    public interface ICustomersService
    {
        Task<APIResponse> GetCustomerList();
        Task<APIResponse> GetCustomerSelectList();
        Task<APIResponse> GetCustomerById(string id);
        Task<APIResponse> GetCustomerObjectById(string id);
        Task<APIResponse> SaveCustomer(string formJson);
        Task<APIResponse> UpdateCustomer(string formJson);       
    }
}
