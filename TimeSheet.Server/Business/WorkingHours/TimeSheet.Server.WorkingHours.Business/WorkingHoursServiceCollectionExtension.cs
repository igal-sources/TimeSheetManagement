using Microsoft.Extensions.DependencyInjection;
using TimeSheet.Server.WorkingHours.Business.Repositories;
using TimeSheet.Server.WorkingHours.Business.Services;
using TimeSheet.Server.WorkingHours.Common.Contracts;

namespace TimeSheet.Server.WorkingHours.Business
{
    public static class WorkingHoursServiceCollectionExtension
    {
        public static IServiceCollection ConfigureWorkingHoursServices(this IServiceCollection services)
        {
            services.AddSingleton<IWorkingHoursService, WorkingHoursService>();
            services.AddSingleton<IWorkingHoursRepository, WorkingHoursRepository>();

            return services;
        }
    }
}
