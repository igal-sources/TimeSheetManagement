using Newtonsoft.Json.Linq;
using System;
using System.Threading.Tasks;
using TimeSheet.Server.Core.Common.Models;
using TimeSheet.Server.Projects.Business.Repositories;
using TimeSheet.Server.Projects.Common.Contracts;

namespace TimeSheet.Server.Projects.Business.Services
{
    public class ProjectsService : IProjectsService
    {
        private IProjectsRepository _projectsRepository;

        public ProjectsService( IProjectsRepository projectsRepository)
        {
            _projectsRepository = projectsRepository;
        }

        public async Task<APIResponse> GetProjectList()
        {
            var response = new APIResponse(0, "OK", "OK");

            try
            {
                var data = await _projectsRepository.GetProjectList();
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

        public async Task<APIResponse> GetProjectSelectList()
        {
            var response = new APIResponse(0, "OK", "OK");

            try
            {
                var data = await _projectsRepository.GetProjectSelectList();
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

        public async Task<APIResponse> GetProjectById(string id)
        {
            var response = new APIResponse(0, "OK", "OK");

            try
            {
                var data = await _projectsRepository.GetProjectById(id);
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

        public async Task<APIResponse> GetProjectByCustomerId(string id)
        {
            var response = new APIResponse(0, "OK", "OK");

            try
            {
                var data = await _projectsRepository.GetProjectByCustomerId(id);
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

        public async Task<APIResponse> SaveProject(string formJson)
        {
            var response = new APIResponse(0, "OK", "OK");

            try
            {
                var data = await _projectsRepository.SaveProject(formJson);
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

        public async Task<APIResponse> UpdateProject(string formJson)
        {
            var response = new APIResponse(0, "OK", "OK");

            try
            {
                var data = await _projectsRepository.UpdateProject(formJson);
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
