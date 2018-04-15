using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RedRiverChatServer.Controllers
{
    [Authorize]
    public class Chat:Hub
    {
        private readonly static ConnectionMapping<string> _connections =
            new ConnectionMapping<string>();

        public override Task OnConnectedAsync()
        {
            //JwtRegisteredClaimNames.Sub
            IEnumerable<Claim> claims = Context.User.Claims;
            Claim nameClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            string name = nameClaim.Value;
            _connections.Add(name, Context.ConnectionId);
            Clients.All.InvokeAsync("Send", $"{name} joined");
            Console.WriteLine(Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            IEnumerable<Claim> claims = Context.User.Claims;
            Claim nameClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            string name = nameClaim.Value;
            _connections.Remove(name, Context.ConnectionId);
            Clients.All.InvokeAsync("Send", $"{name} left");
            return base.OnDisconnectedAsync(exception);
        }

        public void SendChatMessage(string who, string message)
        {
            string name = Context.User.Identity.Name;

            foreach (var connectionId in _connections.GetConnections(who))
            {
                Clients.All.InvokeAsync("Send", name + ": " + message);
            }
        }

    

        public void Send(string message)
        {
            IEnumerable<Claim> claims = Context.User.Claims;
            Claim nameClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            string name = nameClaim.Value;
            Clients.All.InvokeAsync("Send", name + ": " + message);
        }


    }
}
