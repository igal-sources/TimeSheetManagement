using System;
using System.Threading.Tasks;
using TimeSheet.Server.Core.Common.Models;
using TimeSheet.Server.WorkingHours.Business.Repositories;
using TimeSheet.Server.WorkingHours.Common.Contracts;

namespace TimeSheet.Server.WorkingHours.Business.Services
{
    public class WorkingHoursService : IWorkingHoursService
    {
        private IWorkingHoursRepository _workingHoursRepository;

        public WorkingHoursService(IWorkingHoursRepository workingHoursRepository)
        {
            _workingHoursRepository = workingHoursRepository;
        }

        public async Task<APIResponse> GetWorkingHoursList()
        {
            var response = new APIResponse(0, "OK", "OK");

            try
            {
                var data = await _workingHoursRepository.GetWorkingHoursList();
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

        public async Task<APIResponse> GetWorkingHoursById(string id)
        {
            var response = new APIResponse(0, "OK", "OK");

            try
            {
                var data = await _workingHoursRepository.GetWorkingHoursById(id);
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

        public async Task<APIResponse> SaveWorkingHours(string formJson)
        {
            var response = new APIResponse(0, "OK", "OK");

            try
            {
                var data = await _workingHoursRepository.SaveWorkingHours(formJson);
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

        public async Task<APIResponse> UpdateWorkingHours(string formJson)
        {
            var response = new APIResponse(0, "OK", "OK");

            try
            {
                var data = await _workingHoursRepository.UpdateWorkingHours(formJson);
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
