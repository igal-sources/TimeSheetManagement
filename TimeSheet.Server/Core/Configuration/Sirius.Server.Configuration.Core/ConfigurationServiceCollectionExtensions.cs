using Microsoft.Extensions.DependencyInjection;
using TimeSheet.Server.Configuration.Common.Contracts;
using TimeSheet.Server.Configuration.Core.Repositories;
using TimeSheet.Server.Configuration.Core.Services;

namespace TimeSheet.Server.Configuration.Core
{
    public static class ConfigurationServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureConfigurationServices(this IServiceCollection services)
        {
            services.AddTransient<IConfigurationService, ConfigurationService>();
            services.AddTransient<IConfigurationRepository, ConfigurationRepository>();

            return services;
        }
    }
}
