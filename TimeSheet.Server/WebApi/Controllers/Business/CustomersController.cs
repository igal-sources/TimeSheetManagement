using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using TimeSheet.Server.Core.Common.Models;
using TimeSheet.Server.Customers.Common.Contracts;

namespace TimeSheet.Server.WebApi.Controllers.Business
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private ICustomersService _customersService;

        public CustomersController(ICustomersService customersService)
        {
            _customersService = customersService;
        }

        [HttpGet("GetCustomerList")]
        public async Task<APIResponse> GetCustomerList()
        {
            return await _customersService.GetCustomerList();
        }

        [HttpGet("GetCustomerSelectList")]
        public async Task<APIResponse> GetCustomerSelectList()
        {
            return await _customersService.GetCustomerSelectList();
        }

        [HttpGet("{id}")]
        public async Task<APIResponse> GetCustomerById(string id)
        {
            return await _customersService.GetCustomerById(id);
        }

        [HttpGet("GetCustomerObjectById/{id}")]
        public async Task<APIResponse> GetCustomerObjectById(string id)
        {
            return await _customersService.GetCustomerObjectById(id);
        }


        [HttpPost("SaveCustomer")]
        public async Task<APIResponse> SaveCustomer([FromBody] JToken formJson)
        {
            var formJsonStr = formJson.ToString();
            return await _customersService.SaveCustomer(formJsonStr);
        }


        [HttpPut("UpdateCustomer")]
        public async Task<APIResponse> UpdateCustomer([FromBody] JToken formJson)
        {
            var formJsonStr = formJson.ToString();
            return await _customersService.UpdateCustomer(formJsonStr);
        }
    }
}
