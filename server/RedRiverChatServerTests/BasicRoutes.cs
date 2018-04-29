using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using RedRiverChatServer;
using RestSharp;
using System;
using System.Net.Http;
using Xunit;

namespace RedRiverChatServerTests
{
    public class BasicRouteTests
    {
        private readonly TestServer _server;
        private readonly HttpClient _client;

        public BasicRouteTests()
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            _server = new TestServer(new WebHostBuilder()
           .UseStartup<TestStartup>()
           .UseConfiguration(config)
           .UseEnvironment("Development"));
            _client = _server.CreateClient();

        }

        [Fact]
        public async void TryUnprotectedRoute_Get_Returns200()
        {
            var response = await _client.GetAsync("/api/routetest/tryunprotectedroute");
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async void TryProtectedRoute_Get_Returns403()
        {
            var response = await _client.GetAsync("/api/routetest/tryprotectedroute");
            Assert.Equal(System.Net.HttpStatusCode.Unauthorized,response.StatusCode);
        }


        public void Dispose()
        {
            _client.Dispose();
            _server.Dispose();
        }
    }
}
