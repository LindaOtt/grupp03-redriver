using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.SignalR;
using RedRiverChatServer.Controllers;
using Microsoft.Owin.Cors;
using Owin;
using RedRiverChatServer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RedRiverChatServer.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Primitives;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace RedRiverChatServer
{
    public class Startup
    {
        StringValues token;
        IServiceProvider serviceProvider;
        public Startup(IConfiguration configuration, IServiceProvider serviceProvider)
        {
            Configuration = configuration;
            this.serviceProvider = serviceProvider;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            //Setup the database, so its context can be injected.
            ConfigureDatabase(services);

            //Set password options here
            IdentityBuilder builder = services.AddIdentityCore<ApplicationUser>(opt =>
            {
                opt.Password.RequireDigit = true;
                opt.Password.RequiredLength = 8;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireUppercase = true;
                opt.Password.RequireLowercase = true;
            }
       );

            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), builder.Services);
            builder.AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

            builder.AddRoleValidator<RoleValidator<IdentityRole>>();
            builder.AddRoleManager<RoleManager<IdentityRole>>();
            builder.AddSignInManager<SignInManager<ApplicationUser>>();

            services.AddAuthentication(options => {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
       .AddJwtBearer(options =>
       {
           options.TokenValidationParameters = new TokenValidationParameters
           {
               ValidateIssuer = true,
               ValidateAudience = true,
               ValidateLifetime = true,
               ValidateIssuerSigningKey = true,
               ValidIssuer = Configuration["Jwt:Issuer"],
               ValidAudience = Configuration["Jwt:Issuer"],
               IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
           };
           options.Events = new JwtBearerEvents
           {
               OnMessageReceived = context =>
               {
                   //The SignalR route must get the token from the url - not perfect, but the best way so far.
                   if (context.Request.Path.Value.StartsWith("/chat") &&
                       context.Request.Query.TryGetValue("token", out StringValues token)
                   )
                   {
                       context.Token = token;
                   }

                   return Task.CompletedTask;
               },
               OnAuthenticationFailed = context =>
               {
                   var te = context.Exception;
                   return Task.CompletedTask;
               }
           };
       });

            services.AddCors(options => options.AddPolicy("CorsPolicy", builderq => { builderq.AllowAnyMethod().AllowAnyHeader().WithOrigins(new string[] { "http://localhost:3000", "https://redriverclient.azurewebsites.net","https://redclient.azurewebsites.net", "https://clientredriver.azurewebsites.net", "http://109.228.145.167:3000", "https://localhost:3000" }).AllowCredentials(); }));
            services.AddSignalR();
            services.AddMvc();
            services.AddSingleton<IEmailSender, EmailSender>();
            services.Configure<AuthMessageSenderOptions>(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //Cors must be defined to allow browser interaction with the server
            app.UseCors("CorsPolicy");

            //We want to limit access to some route, plus be able to find out who the user is
            app.UseAuthentication();

            //SignalR calls are routed here when the url is "chat"
            app.UseSignalR(routes =>
            {
                routes.MapHub<Chat>("chat");
            });
        
            //All routes apart from SignalR follow this convention
            app.UseMvc(routes =>
            {
                routes.MapRoute("default", "{controller}/{action}/{id?}");
            });

            //Make sure the database and admin,superuser roles exist - if they don't then they are created.
            dbContext.Database.EnsureCreated();
            SeedDB(serviceProvider,10);
            CreateRole(serviceProvider,"admin");
            CreateRole(serviceProvider,"superuser");
        }

        /// <summary>
        /// CreateRole checks to see if a ApplicationUser role already exists - if it doesn't then it is created.
        /// </summary>
        /// <param name="serviceProvider"></param>
        /// <param name="roleName"></param>
        private void CreateRole(IServiceProvider serviceProvider,string roleName)
        {

            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
           // var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            Task<IdentityResult> roleResult;
           
            //Check if role exists and create if it does not
            Task<bool> roleExists = roleManager.RoleExistsAsync(roleName);
            roleExists.Wait();

            if (!roleExists.Result)
            {
                roleResult = roleManager.CreateAsync(new IdentityRole(roleName));
                roleResult.Wait();
            } 
        }

        public virtual void ConfigureDatabase(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
        }


        /// <summary>
        /// Populate Database with example users
        /// </summary>
        /// <param name="noUsers"></param>
        private void SeedDB(IServiceProvider serviceProvider,int noUsers)
        {
            UserManager<ApplicationUser> userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            using (userManager)
            {
                for (int i = 0; i < noUsers; i++)
                {

                    ApplicationUser newUser = new ApplicationUser
                    {
                        UserName = "sTestUser" + i,
                        Email = "sTestUser" + i + "@sTestUsers",
                        FirstName = "sTestUser" + i,
                        Surname = "User"
                    };

                    var result = userManager.CreateAsync(newUser, "sTestUser" + i);
                    result.Wait();
                }

            }
           
          
        }
          
    }
}
