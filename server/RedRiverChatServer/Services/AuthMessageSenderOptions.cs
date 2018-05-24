using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedRiverChatServer.Services
{
    /// <summary>
    /// Message Sender class configured to send messages with SendGrid as proxy.
    /// </summary>
    public class AuthMessageSenderOptions
    {
        public string SendGridUser
        {
            get; set;

        }
        public string SendGridKey
        {
            get; set;

        }
    }
}
