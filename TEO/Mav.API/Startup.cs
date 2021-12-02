using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Mav.API.DbContexts;
using Microsoft.AspNetCore.Mvc;
using Mav.Services.Concrete;
using Mav.Services.Abstract;
using Mav.Data.Repositories;
using AutoMapper;
using Mav.Services.Identity.Models;
using Microsoft.AspNetCore.Identity;
using Mav.Services.Identity.Services;
using IdentityRole = Microsoft.AspNetCore.Identity.IdentityRole;
using System;

namespace Mav.API
{
    public class Startup
    {
        public IHostingEnvironment HostingEnvironment { get; private set; }
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            HostingEnvironment = env;
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper();
            services.AddMvc();
            services.AddApiVersioning(o =>
            {
                o.ReportApiVersions = true;
                o.AssumeDefaultVersionWhenUnspecified = true;
                o.DefaultApiVersion = new ApiVersion(1, 0);
            });

            //services.AddDbContext<MavConnectDbContext>(options =>
            //    options.UseSqlServer(Configuration.GetConnectionString("ConnectConnection")));

            //services.AddIdentity<ApplicationUser, IdentityRole>()
            //    .AddEntityFrameworkStores<MavConnectDbContext>()
            //    .AddDefaultTokenProviders();

            services.AddAuthorization(authorizationOptions =>
            {

            });

            var authSettingsSection = Configuration.GetSection("AuthAppSettings");
            var authSettings = authSettingsSection.Get<AuthAppSettings>();
            var idpHost = authSettings.Authority.Host;
            var allowableHosts = authSettings.AllowableAccess.Hosts;

            services.AddAuthentication(
                IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = idpHost;
                    options.ApiName = "mavapi";
                    options.ApiSecret = "apisecret";
                });

            services.AddCors(options =>
            {
                // this defines a CORS policy called "default"
                options.AddPolicy("default", policy =>
                {
                    policy.WithOrigins(allowableHosts)
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            // register the DbContext on the container, getting the connection string from
            var connectionString = Configuration["ConnectionStrings:DefaultConnection"];
            services.AddDbContext<MavDbContext>(o => o.UseSqlServer(connectionString, sqloptions => {
                sqloptions.CommandTimeout(45);
                sqloptions.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
            }));

            services.AddDbContext<MavConnectDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("ConnectConnection"), sqloptions => {
                    sqloptions.CommandTimeout(45);
                    sqloptions.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
                }));

            IdentityBuilder builder = services.AddIdentityCore<ApplicationUser>(options => { });
            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), builder.Services);
            builder.AddEntityFrameworkStores<MavConnectDbContext>();

            // register repositories
            services.AddTransient<IUnitOfWork>((s) => {
                return new UnitOfWork<MavDbContext>(s.GetRequiredService<MavDbContext>());
            });
            services.AddTransient<IIdentityUnitOfWork>((s) => {
                return new IdentityUnitOfWork<MavConnectDbContext>(s.GetRequiredService<MavConnectDbContext>());
            });
            services.AddTransient(typeof(IPaginate<>), typeof(Paginate<>)); 
            services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
            services.AddTransient(typeof(IRepositoryAsync<>), typeof(RepositoryAsync<>));

            // register services
            services.AddTransient<ICentreService, CentreService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IUserSearchService, UserSearchService>();
            services.AddTransient<IPageService, PageService>();
            services.AddTransient<IAssessmentService, AssessmentService>();
            services.AddTransient<ISectionService, SectionService>();
            services.AddTransient<IStatementService, StatementService>();
            services.AddTransient<ISettingsService, SettingsService>();
            services.AddTransient<IAssessmentYearService, AssessmentYearService>();
            services.AddTransient<ICentreTypeService, CentreTypeService>();
            services.AddTransient<ICentreSearchService, CentreSearchService>();
            services.AddTransient<ISectionService, SectionService>();
            services.AddTransient<IQuestionGroupService, QuestionGroupService>();
            services.AddTransient<IQuestionService, QuestionService>();
            services.AddTransient<IAnswerService, AnswerService>();
            services.AddTransient<IUserAssessmentService, UserAssessmentService>();
            services.AddTransient<IUserAssessmentSectionService, UserAssessmentSectionService>();
            services.AddTransient<IUserAssessmentAnswerService, UserAssessmentAnswerService>();
            services.AddTransient<IReportingService, ReportingService>();
            services.AddTransient<IUserCentreService, UserCentreService>();
            services.AddTransient<IOrganisationService, OrganisationService>();
            services.AddTransient<IOrganisationTypeService, OrganisationTypeService>();
            services.AddTransient<ILicenceService, LicenceService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, MavDbContext mavDbContext)
        {
            // Automapper mappings
            // MapConfigurationFactory.Scan<Startup>();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(appBuilder =>
                {
                    appBuilder.Run(async context =>
                    {
                        // ensure generic 500 status code on fault.
                        context.Response.StatusCode = 500;
                        await context.Response.WriteAsync("An unexpected fault happened. Try again later.");
                    });
                });
            }

            app.UseCors("default");

            app.UseAuthentication();

            app.UseStaticFiles();

            app.UseMvc();
            //app.UseMvc(routes =>
            //{
            //    routes.MapRoute("default", "{controller=Home}/{action=Index}/{id?}");
            //    routes.MapRoute("defaultWithUser", "{controller=Home}/{action=Index}/{id}/{userid?}");
            //});
        }
    }
}
