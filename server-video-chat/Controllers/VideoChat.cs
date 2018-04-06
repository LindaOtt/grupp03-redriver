using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server_video_chat.Controllers
{
    class UserConn
    {
        public string Usrname { set; get; }
        public string ConnectionID { set; get; }

        public string WebRtcId { set; get; }
    }

    public class VideoChat:Hub
    {
        static List<UserConn> ulist = new List<UserConn>();
        public override Task OnConnectedAsync()
        {
            var us = new UserConn();
            var httpContext = Context.Connection.GetHttpContext();
            us.Usrname = httpContext.Request.Query["username"];
            us.WebRtcId = httpContext.Request.Query["webrtcurl"];
            us.ConnectionID = Context.ConnectionId;
            ulist.Add(us);

            Console.WriteLine(us.Usrname.ToString());
            Console.WriteLine(ulist.ToString());

            return Clients.All.SendAsync("Open", ulist);
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var user = ulist.FirstOrDefault(x => x.ConnectionID == Context.ConnectionId);

            if (user != null)
            {
                ulist.Remove(user);
            }
            return Clients.All.SendAsync("Close", ulist);
        }

        public Task Send(string message)
        {
            return Clients.All.SendAsync("Send", message);
        }

    }
}