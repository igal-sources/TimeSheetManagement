using TimeSheet.Server.Configuration.Common.Contracts;
using TimeSheet.Server.Configuration.Core.Repositories;

namespace TimeSheet.Server.Configuration.Core.Services
{
    public class ConfigurationService : IConfigurationService
    {
        private IConfigurationRepository _configurationRepository;

        public ConfigurationService(IConfigurationRepository configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }
    }
}
