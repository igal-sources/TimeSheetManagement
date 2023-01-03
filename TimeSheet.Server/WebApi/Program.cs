using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace TimeSheet.Server.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
             Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });

        //trying to get css for dashboard website
        //Host.CreateDefaultBuilder(args)
        //    .ConfigureWebHostDefaults(webBuilder =>
        //    {
        //        webBuilder.UseStartup<Startup>();
        //        var webRoot = Path.Combine(AppContext.BaseDirectory, "wwwroot");
        //        webBuilder.UseWebRoot(webRoot);
        //    });
    }
}
