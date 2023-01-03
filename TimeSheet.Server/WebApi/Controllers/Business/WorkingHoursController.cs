using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using TimeSheet.Server.Core.Common.Models;
using TimeSheet.Server.Customers.Common.Contracts;
using TimeSheet.Server.WorkingHours.Common.Contracts;

namespace TimeSheet.Server.WebApi.Controllers.Business
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkingHoursController : ControllerBase
    {
        private IWorkingHoursService _workingHoursService;

        public WorkingHoursController(IWorkingHoursService workingHoursService)
        {
            _workingHoursService = workingHoursService;
        }

        [HttpGet("GetWorkingHoursList")]
        public async Task<APIResponse> GetWorkingHoursList()
        {
            return await _workingHoursService.GetWorkingHoursList();
        }

        [HttpGet("{id}")]
        public async Task<APIResponse> GetWorkingHoursById(string id)
        {
            return await _workingHoursService.GetWorkingHoursById(id);
        }


        [HttpPost("SaveWorkingHours")]
        public async Task<APIResponse> SaveWorkingHours([FromBody] JToken formJson)
        {
            var formJsonStr = formJson.ToString();
            return await _workingHoursService.SaveWorkingHours(formJsonStr);
        }


        [HttpPut("UpdateWorkingHours")]
        public async Task<APIResponse> UpdateWorkingHours(string id, [FromBody] JToken formJson)
        {
            var formJsonStr = formJson.ToString();
            return await _workingHoursService.UpdateWorkingHours(formJsonStr);
        }
    }
}
