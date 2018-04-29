using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RedRiverChatServer;
using RedRiverChatServer.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace RedRiverChatServerTests
{
    public class TestStartup : Startup
    {
        public TestStartup(IConfiguration configuration, IServiceProvider serviceProvider) : base(configuration, serviceProvider)
        {
        }

        public override void ConfigureDatabase(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseInMemoryDatabase("test_db"));
        }
    }
}
