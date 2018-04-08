using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server_video_chat.Controllers
{
    class UserConn
    {
        public string Username { set; get; }
        public string ConnectionID { set; get; }
    }

    class CallObj
    {
        public string from { set; get; }
        public object data { set; get; }
    }

    public class VideoChat : Hub
    {
        static List<UserConn> ulist = new List<UserConn>();
        public override Task OnConnectedAsync()
        {

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

        public Task UserInfo(string username)
        {
            var us = new UserConn();

            us.Username = username;
            us.ConnectionID = Context.ConnectionId;
            ulist.Add(us);

            Console.WriteLine(us.Username.ToString());
            return Clients.All.SendAsync("Open", ulist);
        }

        public Task Request(string friendID)
        {
            var user = ulist.FirstOrDefault(x => x.ConnectionID == friendID);

            return Clients.Client(friendID).SendAsync("request", Context.ConnectionId);
        }

        public Task Call(object data)
        {
            Console.WriteLine(data);

            var tempObj = new CallObj();
            tempObj.data = data;
            tempObj.from = Context.ConnectionId;

            return Clients.All.SendAsync("call", tempObj);
        }

        public Task End(string friendID)
        {
            var user = ulist.FirstOrDefault(x => x.ConnectionID == friendID);

            return Clients.Client(friendID).SendAsync("end", Context.ConnectionId);
        }
    }
}