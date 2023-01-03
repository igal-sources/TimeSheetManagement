using System.Collections.Generic;
using System.Threading.Tasks;
using TimeSheet.Server.Customers.Common.Models;

namespace TimeSheet.Server.Customers.Business.Repositories
{
    public interface ICustomersRepository
    {
        Task<string> GetCustomerList();
        Task<string> GetCustomerSelectList();
        Task<string> GetCustomerById(string id);
        Task<List<CustomersModel>> GetCustomerObjectById(string id);
        Task<string> SaveCustomer(string formJson);
        Task<string> UpdateCustomer(string formJson);


    }
}
