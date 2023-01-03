using Microsoft.Extensions.DependencyInjection;
using TimeSheet.Server.Projects.Business.Repositories;
using TimeSheet.Server.Projects.Business.Services;
using TimeSheet.Server.Projects.Common.Contracts;

namespace TimeSheet.Server.Customers.Business.Server.Projects.Business
{
    public static class ProjectsServiceCollectionExtension
    {
        public static IServiceCollection ConfigureProjectsServices(this IServiceCollection services)
        {
            services.AddSingleton<IProjectsService, ProjectsService>();
            services.AddSingleton<IProjectsRepository, ProjectsRepository>();

            return services;
        }
    }
}
