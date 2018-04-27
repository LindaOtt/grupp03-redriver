using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RedRiverChatServer.Models
{
  /*  public class SignalRUser
    {
        [Key]
        public string UserName { get; set; }
        public ICollection<Connection> Connections { get; set; }
        public virtual ICollection<SignalRUserConversationRoom> SignalRUserConversationRooms { get; set; } = new List<SignalRUserConversationRoom>();
    }*/

    public class Connection
    {
        public string ConnectionID { get; set; }
        public string UserAgent { get; set; }
        public bool Connected { get; set; }
    }

    public class ConversationRoom
    {
        [Key]
        public string RoomName { get; set; }
        public virtual ICollection<ApplicationUserConversationRoom> ApplicationUserConversationRooms { get; set; } = new List<ApplicationUserConversationRoom>();
    }

    //Join Table
    public class ApplicationUserConversationRoom
    {
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        public string RoomName { get; set; }
        public ConversationRoom ConversationRoom { get; set; }
    }

    public class Log
    {
        [Key]
        public string LogId { get; set; }
        public string GroupName { get; set; }
        public string Username { get; set; }
        public string Message { get; set; }
        public DateTime TimeStamp { get; set; } = DateTime.Now;

        public Log(string GroupName, string Username, string Message)
        {
            this.GroupName = GroupName;
            this.Username = Username;
            this.Message = Message;
        }

        public Log() { }
    }

}
