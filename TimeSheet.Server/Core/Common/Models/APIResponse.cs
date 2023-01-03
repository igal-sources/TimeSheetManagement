using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using TimeSheet.Common.Models;

namespace TimeSheet.Server.Core.Common.Models
{
    public class APIResponse
    {
        private JToken _responseData;
        public int ResponseStatusCode { get; set; }
        public string ResponseStatusText { get; set; } = string.Empty;
        public string ResponseMessage { get; set; } = string.Empty;
        public JToken ResponseData { get => _responseData; }

        public APIResponse()
        {
            _responseData = new JObject();
        }

        public APIResponse(int responseStatusCode, string responseStatusText, string responseMessage)
        {
            ResponseStatusCode = responseStatusCode;
            ResponseStatusText = responseStatusText;
            ResponseMessage = responseMessage;
            _responseData = new JObject();

        }

        public void SetReponseData(string jsonData)
        {
            if (string.IsNullOrEmpty(jsonData))
            {
                _responseData = string.Empty;
                return;
            }

            _responseData = JToken.Parse(jsonData);
        }
        public void SetReponseData(object data, bool convertEnumsToText)
        {
            _responseData = ConvertObjectToJToken(data, convertEnumsToText);
        }
        public void SetReponseData(JToken data)
        {
            _responseData = data;
        }

        public void SetReponseData(Exception e)
        {
            //TODO: check how to convert exception to user readable errormessage
            //e.g. if sql server is down, user should get some errorid that can be transalted by our support team
            _responseData = ConvertObjectToJToken(e, true);
            //_responseData = JsonConvert.SerializeObject(e.Message);
        }
        public void SetReponseData(List<ErrorsResponse> errorList)
        {
           
            var errorsResultsWrapper = new { errors = errorList };
            _responseData = ConvertObjectToJToken(errorsResultsWrapper, true);
        }

        private JToken ConvertObjectToJToken(object obj, bool convertEnumsToText)
        {
            var jsonSerializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
            if (convertEnumsToText)
            {
                jsonSerializerSettings.Converters = new List<JsonConverter>() { new Newtonsoft.Json.Converters.StringEnumConverter() };
            }
            var jsonSerializer = JsonSerializer.CreateDefault(jsonSerializerSettings);

            return JToken.FromObject(obj, jsonSerializer);
        }
    }
}
