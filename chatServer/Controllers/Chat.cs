using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RedRiverChatServer.Controllers
{
    /// <summary>
    /// This is a hub as defined by SignalR.
    /// </summary>
    [Authorize]
    public class Chat:Hub
    {
        private readonly static ConnectionMapping<string> _connections =
            new ConnectionMapping<string>();
        
        /// <summary>
        /// When a new SignalR connection is created, the connection is listed in the in-memory collection , with the username as a key.
        /// At present a connection message is sent to all connected users
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// ....and removed from the same collection upon disconnect. Message sent to all users.
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override Task OnDisconnectedAsync(Exception exception)
        {
            IEnumerable<Claim> claims = Context.User.Claims;
            Claim nameClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            string name = nameClaim.Value;
            _connections.Remove(name, Context.ConnectionId);
            Clients.All.InvokeAsync("Send", $"{name} left");
            return base.OnDisconnectedAsync(exception);
        }

        /// <summary>
        /// Send a chat message to a particular user
        /// </summary>
        /// <param name="who"></param>
        /// <param name="message"></param>
        public void SendChatMessage(string who, string message)
        {
            string name = Context.User.Identity.Name;

            foreach (var connectionId in _connections.GetConnections(who))
            {
                Clients.All.InvokeAsync("Send", name + ": " + message);
            }
        }

        /// <summary>
        /// Sends message to all connected users.
        /// </summary>
        /// <param name="message"></param>
        public void Send(string message)
        {
            IEnumerable<Claim> claims = Context.User.Claims;
            Claim nameClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            string name = nameClaim.Value;
            Clients.All.InvokeAsync("Send", name + ": " + message);
        }


    }
}
