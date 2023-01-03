using System;
using System.Linq;
using System.Threading.Tasks;
using TimeSheet.Server.Core.Common.Models;
using TimeSheet.Server.Customers.Business.Repositories;
using TimeSheet.Server.Customers.Common.Contracts;
using TimeSheet.Server.Customers.Common.Models;

namespace TimeSheet.Server.Customers.Business.Services
{
    public class CustomersService : ICustomersService
    {
        private ICustomersRepository _customersRepository;

        public CustomersService(ICustomersRepository customersRepository)
        {
            _customersRepository = customersRepository;
        }

        public async Task<APIResponse> GetCustomerList()
        {
            var response = new APIResponse(0, "OK", "OK");

            try
            {
                var data = await _customersRepository.GetCustomerList();
                response.SetReponseData(data);
            }
            catch (Exception e)
            {
                response.ResponseStatusCode = 99999;
                response.ResponseStatusText = "Error";
                response.ResponseMessage = e.Message;
                response.SetReponseData(e);
            }

            return response;
        }

        public async Task<APIResponse> GetCustomerSelectList()
        {
            var response = new APIResponse(0, "OK", "OK");

            try
            {
                var data = await _customersRepository.GetCustomerSelectList();
                response.SetReponseData(data);
            }
            catch (Exception e)
            {
                response.ResponseStatusCode = 99999;
                response.ResponseStatusText = "Error";
                response.ResponseMessage = e.Message;
                response.SetReponseData(e);
            }

            return response;
        }

        public async Task<APIResponse> GetCustomerById(string id)
        {
            var response = new APIResponse(0, "OK", "OK");

            try
            {
                var data = await _customersRepository.GetCustomerById(id);
                response.SetReponseData(data);
            }
            catch (Exception e)
            {
                response.ResponseStatusCode = 99999;
                response.ResponseStatusText = "Error";
                response.ResponseMessage = e.Message;
                response.SetReponseData(e);
            }

            return response;
        }

        public async Task<APIResponse> GetCustomerObjectById(string id)
        {
            var response = new APIResponse(0, "OK", "OK");

            try
            {
                var data = await _customersRepository.GetCustomerObjectById(id);
                response.SetReponseData(data.FirstOrDefault(), true);
            }
            catch (Exception e)
            {
                response.ResponseStatusCode = 99999;
                response.ResponseStatusText = "Error";
                response.ResponseMessage = e.Message;
                response.SetReponseData(e);
            }

            return response;
        }

        public async Task<APIResponse> SaveCustomer(string formJson)
        {
            var response = new APIResponse(0, "OK", "OK");

            try
            {
                var data = await _customersRepository.SaveCustomer(formJson);
                response.SetReponseData(data);
            }
            catch (Exception e)
            {
                response.ResponseStatusCode = 99999;
                response.ResponseStatusText = "Error";
                response.ResponseMessage = e.Message;
                response.SetReponseData(e);
            }

            return response;
        }

        public async Task<APIResponse> UpdateCustomer(string formJson)
        {
            var response = new APIResponse(0, "OK", "OK");

            try
            {
                var data = await _customersRepository.UpdateCustomer(formJson);
                response.SetReponseData(data);
            }
            catch (Exception e)
            {
                response.ResponseStatusCode = 99999;
                response.ResponseStatusText = "Error";
                response.ResponseMessage = e.Message;
                response.SetReponseData(e);
            }

            return response;
        }
    }
}
