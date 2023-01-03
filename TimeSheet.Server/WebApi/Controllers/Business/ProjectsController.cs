using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using TimeSheet.Server.Core.Common.Models;
using TimeSheet.Server.Projects.Common.Contracts;

namespace TimeSheet.Server.WebApi.Controllers.Business
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private IProjectsService _projectsService;

        public ProjectsController(IProjectsService projectsService)
        {
            _projectsService = projectsService;
        }

        [HttpGet("GetProjectList")]
        public async Task<APIResponse> GetProjectList()
        {
            return await _projectsService.GetProjectList();
        }

        [HttpGet("GetProjectSelectList")]
        public async Task<APIResponse> GetProjectSelectList()
        {
            return await _projectsService.GetProjectSelectList();
        }

        [HttpGet("{id}")]
        public async Task<APIResponse> GetProjectById(string id)
        {
            return await _projectsService.GetProjectById(id);
        }

        [HttpGet("GetByCustomerId/{id}")]
        public async Task<APIResponse> GetProjectByCustomerId(string customerId)
        {
            return await _projectsService.GetProjectByCustomerId(customerId);
        }

        [HttpPost("SaveProject")]
        public async Task<APIResponse> SaveProject([FromBody] JToken formJson)
        {
            var formJsonStr = formJson.ToString();
            return await _projectsService.SaveProject(formJsonStr);
        }


        [HttpPut("UpdateProject")]
        public async Task<APIResponse> UpdateProject(string id, [FromBody] JToken formJson)
        {
            var formJsonStr = formJson.ToString();
            return await _projectsService.UpdateProject(formJsonStr);
        }
    }
}
