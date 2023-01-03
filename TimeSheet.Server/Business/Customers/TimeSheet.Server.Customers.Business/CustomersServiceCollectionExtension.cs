using Microsoft.Extensions.DependencyInjection;
using TimeSheet.Server.Customers.Business.Repositories;
using TimeSheet.Server.Customers.Business.Services;
using TimeSheet.Server.Customers.Common.Contracts;

namespace TimeSheet.Server.Customers.Business
{
    public static class CustomersServiceCollectionExtension
    {
        public static IServiceCollection ConfigureCustomersServices(this IServiceCollection services)
        {
            services.AddSingleton<ICustomersService, CustomersService>();
            services.AddSingleton<ICustomersRepository, CustomersRepository>();

            return services;
        }
    }
}
