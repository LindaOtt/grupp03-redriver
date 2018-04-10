using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedRiverChatServer.Controllers
{
    public class Chat:Hub
    {
        public override Task OnConnectedAsync()
        {
            return Clients.All.InvokeAsync("Send", $"{Context.ConnectionId} joined");
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return Clients.All.InvokeAsync("Send", $"{Context.ConnectionId} left");
        }

        public Task Send(string message)
        {
            return Clients.All.InvokeAsync("Send", message);
        }

    }
}
