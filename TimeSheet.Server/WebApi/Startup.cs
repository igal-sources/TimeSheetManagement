using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using TimeSheet.Server.Configuration.Core;
using TimeSheet.Server.Customers.Business;
using TimeSheet.Server.Customers.Business.Server.Projects.Business;
using TimeSheet.Server.WorkingHours.Business;

namespace TimeSheet.Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //1. This method is called before the configure, 
            //2. the method is used to add services to the service container
            //3. the services will be availible as dependency injection services

            //Adding services to the service container makes them available 
            //within the app and in the Configure method, 

            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.Formatting = Formatting.Indented;
                options.SerializerSettings.TypeNameHandling = TypeNameHandling.Auto;
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.Converters.Add(new StringEnumConverter());
            });

            /*
               CORS - Access-Control-Allow-Origin - 
               in order to accept connection from other origins (IP and Ports, that are not the current application)
               we must add the cors to the Dependency Injection services, and configure it in the middleware configuration
            */
            services.AddCors();

            services.ConfigureProjectsServices();
            services.ConfigureCustomersServices();
            services.ConfigureWorkingHoursServices();

            services.ConfigureConfigurationServices();

            services.AddSwaggerGen(swagger =>
            {
                swagger.SwaggerDoc("v1", new OpenApiInfo { Title = "Time Sheet Management API" });
            });
            services.AddSwaggerGenNewtonsoftSupport();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Time Sheet Management API");
            });


            //Cors must be before at the bigging of the middleware 
            //after adding the CORS to the services we need to configure it
            //and set the origin, methods ... that we want to allow in ower application
            app.UseCors(builder => builder.AllowAnyOrigin()
                                          .AllowAnyMethod()
                                          .AllowAnyHeader()
                                        );


            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                // this will help catching all call that don't have any corresponding controler
                // in such case we will call the "DefaultController" and will return error on the client side

                //this caused a problem with running the approval document workflow so commented it out for the time being
                endpoints.MapFallbackToController("DefaultCall", "Default");
            });

            //app.UseHttpActivities();
        }
    }
}
