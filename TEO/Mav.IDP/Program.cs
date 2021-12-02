using System;
using Mav.IDP.Seeds;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;

namespace Mav.IDP
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.Title = "Mav.IDP";

            var host = BuildWebHost(args);
            SeedData.EnsureSeedData(host.Services);

            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .ConfigureLogging(builder =>
                {
                    builder.ClearProviders();
                })
                .Build();
        }
    }
}
