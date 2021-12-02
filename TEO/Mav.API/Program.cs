using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Mav.API.DbContexts;
using Mav.API.Seeds;

namespace Mav.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);

            // migrate & seed the database.  Best practice = in Main, using service scope
            using (var scope = host.Services.CreateScope())
            {
                try
                {
                    var context = scope.ServiceProvider.GetService<MavDbContext>();
                    context.Database.Migrate();
                    context.EnsureSeedDataForContext();
                }
                catch (Exception ex)
                {
                    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while migrating or seeding the database.");
                }
            }

            // run the web app
            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                //.ConfigureAppConfiguration((hostingContext, config) =>
                //{
                //    config.SetBasePath(Directory.GetCurrentDirectory());
                //    config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: false);
                //    config.AddJsonFile("appsettings.{env.EnvironmentName}.json", optional: false, reloadOnChange: false);
                //})
                //.SetBasePath(env.ContentRootPath)
                //.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                //.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                //.AddEnvironmentVariables();
                .UseStartup<Startup>()
                //.UseKestrel(o => {
                //    o.Limits.KeepAliveTimeout = TimeSpan.FromMinutes(30);
                //})
                .Build();
    }
}
