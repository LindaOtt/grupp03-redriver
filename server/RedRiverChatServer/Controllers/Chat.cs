using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using RedRiverChatServer.Models;
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
        private readonly static ConnectionMapping<string> _connections = new ConnectionMapping<string>();
        private ApplicationDbContext context;

        public Chat(ApplicationDbContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// When a new SignalR connection is created, the connection is listed in the in-memory collection , with the username as a key.
        /// At present a connection message is sent to all connected users
        /// </summary>
        /// <returns></returns>
        public override Task OnConnectedAsync()
        {
            string name = GetNameFromClaim();
            _connections.Add(name, Context.ConnectionId);
            
            // Retrieve user.
            var user = context.Users.Include(u=>u.ApplicationUserConversationRooms).SingleOrDefault(u => u.UserName == name);
           
            // Add the user to each assigned (in memory) group.
            foreach (var group in user.ApplicationUserConversationRooms)
            {
                Groups.AddAsync(Context.ConnectionId, group.RoomName);
                Clients.Group(group.RoomName).InvokeAsync("alterFriendStatus", new[] {name, group.RoomName,"online"});
            }
            
            return base.OnConnectedAsync();
        }

        /// <summary>
        /// ....and removed from the same collection upon disconnect. Message sent to all users.
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override Task OnDisconnectedAsync(Exception exception)
        {
            string name = GetNameFromClaim();
            _connections.Remove(name, Context.ConnectionId);

            // Retrieve user.
            var user = context.Users.Include(u => u.ApplicationUserConversationRooms).SingleOrDefault(u => u.UserName == name);
           
            // Remove the user to each assigned (in memory) group.
            foreach (var group in user.ApplicationUserConversationRooms)
            {
                Groups.RemoveAsync(Context.ConnectionId, group.RoomName); //Does this need to be done? Or does removing collections also remove from all groups?
                Clients.Group(group.RoomName).InvokeAsync("alterFriendStatus", new[] { name, group.RoomName, "offline" });
            }

            return base.OnDisconnectedAsync(exception);
        }

        /// <summary>
        /// Send a chat message to a particular user, regardless of group. Should probably never be used in RedRiver context.
        /// All RedRiver communication is group dependent.
        /// </summary>
        /// <param name="who"></param>
        /// <param name="message"></param>
        public void SendMessageToUser(string who, string message)
        {
            string senderName = Context.User.Identity.Name;

            //This is needed in case the user currently has multiple connections. ToDo Check if this is possible in the dictionary...
            foreach (var connectionId in _connections.GetConnections(who))
            {
                Clients.Client(connectionId).InvokeAsync("messageSentToSpecificUser", new[] { senderName, message });
            }
        }

        /// <summary>
        /// Sends message to entire group. Will be logged.
        /// </summary>
        /// <param name="groupName"></param>
        /// <param name="message"></param>
        public void SendMessageToGroup(string groupName, string message)
        {
            string name = GetNameFromClaim();
            Clients.Group(groupName).InvokeAsync("messageSentToGroup", new[] { groupName, name, message });

            context.Logs.Add(new Log(groupName, name, message));
            context.SaveChanges();
        }

        /// <summary>
        /// Sends message to all connected users. Unlikely that this is used in RedRiver.
        /// </summary>
        /// <param name="message"></param>
        public void SendMessageToAllConnectedUsers(string message)
        {
            string senderName = GetNameFromClaim();
            Clients.All.InvokeAsync("messageSentToAllConnectedUsers", new[] { senderName, message });
        }

        /// <summary>
        /// User calls this method to join a group. The group will be created if it doesn't exist.
        /// </summary>
        /// <param name="groupName"></param>
        /// <returns></returns>
        public async Task<Object> JoinGroup(string groupName)
        {
            string name = GetNameFromClaim();
            //Add to in-memory group
            await Groups.AddAsync(Context.ConnectionId, groupName);
            // Retrieve room if it exists. If it doesn't it will be created in the future.
            var group = context.Rooms.FirstOrDefault(e=>e.RoomName==groupName);
            // Retrieve user.
            var user = context.Users.Include(u=>u.ApplicationUserConversationRooms).SingleOrDefault(u => u.UserName == name);
            //Is the user already a member of the group? In that case, return info message to user stating this.
            if (user.ApplicationUserConversationRooms.FirstOrDefault(u=>u.RoomName==groupName) != null)
            {
                return Clients.User(Context.ConnectionId).InvokeAsync("addInfoMessageFromGroup", new[] { groupName, name + " is already a participant in group " + groupName });
            }
            //Create Room
            if (group == null)
            {
                group = new ConversationRoom(){RoomName = groupName};
            }
       
            ApplicationUserConversationRoom sRCR = new ApplicationUserConversationRoom()
            {
                ApplicationUserId = user.Id,
                ApplicationUser = user,
                RoomName = groupName,
                ConversationRoom = group
            };

            group.ApplicationUserConversationRooms.Add(sRCR);
            context.ApplicationUserConversationRooms.Add(sRCR);
            user.ApplicationUserConversationRooms.Add(sRCR);

            await context.SaveChangesAsync();
            return Clients.Group(groupName).InvokeAsync("userAddedToGroup", new[] { name, groupName });
        }

        /// <summary>
        /// Add a new user to an existing groupchat.
        /// </summary>
        /// <param name="groupName"></param>
        /// <param name="usernameToAdd"></param>
        /// <returns></returns>
        public async Task<Object> AddClientToGroup(string groupName, string usernameToAdd)
        {
            // Retrieve room if it exists.
            var group = context.Rooms.FirstOrDefault(e => e.RoomName == groupName);
            if (group == null)
            {
                return Clients.Client(Context.ConnectionId).InvokeAsync("addInfoMessageFromGroup", new[] { groupName, groupName + "does not exist" });
            }

            //Add user to in-memory group
            foreach (var connectionId in _connections.GetConnections(usernameToAdd))
            {
                await Groups.AddAsync(connectionId, groupName);
            }

            // Retrieve user.
            var user = context.Users.Include(u => u.ApplicationUserConversationRooms).SingleOrDefault(u => u.UserName == usernameToAdd);

            //Is the user already a member of the group? In that case, return info message stating this.
            if (user.ApplicationUserConversationRooms.FirstOrDefault(u => u.RoomName == groupName) != null)
            {
                return Clients.Client(Context.ConnectionId).InvokeAsync("addInfoMessageFromGroup", new[] { groupName, usernameToAdd + " is already a participant in group " + groupName });
            }

            ApplicationUserConversationRoom sRCR = new ApplicationUserConversationRoom()
            {
                ApplicationUserId = user.Id,
                ApplicationUser = user,
                RoomName = groupName,
                ConversationRoom = group
            };

            group.ApplicationUserConversationRooms.Add(sRCR);
            context.ApplicationUserConversationRooms.Add(sRCR);
            user.ApplicationUserConversationRooms.Add(sRCR);
            
            await context.SaveChangesAsync();

            return Clients.Group(groupName).InvokeAsync("userAddedToGroup", new[] { groupName, usernameToAdd });
        }

        /// <summary>
        /// Creates a new chat with multiple clients. Calling client username should be included in list!
        /// </summary>
        /// <param name="groupName"></param>
        /// <param name="usernames"></param>
        /// <returns></returns>
        public async Task<Object> StartGroupChatWithMultipleClients(string groupName, string[] usernames)
        {
            List<ApplicationUser> users = new List<ApplicationUser>();
            List<ApplicationUserConversationRoom> aUCRs = new List<ApplicationUserConversationRoom>();

            //Add users to in-memory group
            foreach(string usernameToAdd in usernames)
            {
                foreach (var connectionId in _connections.GetConnections(usernameToAdd))
                {
                    await Groups.AddAsync(connectionId, groupName);
                }
            }

            // Retrieve room
            var group = context.Rooms.FirstOrDefault(e => e.RoomName == groupName);
            if (group != null)
            {
                return Clients.Client(Context.ConnectionId).InvokeAsync("addInfoMessageFromGroup", new[] { groupName, groupName + "already exists" });
            }

            //Notify group about each user
            foreach (string usernameToAdd in usernames)
            {
                    await Clients.Group(groupName).InvokeAsync("userAddedToGroup", new[] { usernameToAdd, groupName });  
            }

            // Retrieve users.
            foreach (string usernameToAdd in usernames)
            {
                users.Add(context.Users.Include(u => u.ApplicationUserConversationRooms).SingleOrDefault(u => u.UserName == usernameToAdd));
            }

            //Create the new  group
            var newGroup = new ConversationRoom()
            {
                RoomName = groupName
            };

            //An ApplicationUserConversationRoom must be created to link each user with each group
            foreach (ApplicationUser u in users)
            {
                 aUCRs.Add(new ApplicationUserConversationRoom()
                {
                    ApplicationUserId = u.Id,
                    ApplicationUser = u,
                    RoomName = groupName,
                    ConversationRoom = newGroup
                });
            }

            //Then each AUCR must be added to the the AUCR table, the specific group and the specific user
            foreach (ApplicationUserConversationRoom aUCR in aUCRs)
            {
                newGroup.ApplicationUserConversationRooms.Add(aUCR);
            
                context.ApplicationUserConversationRooms.Add(aUCR);
 
                aUCR.ApplicationUser.ApplicationUserConversationRooms.Add(aUCR); //???
            }

            await context.SaveChangesAsync();

            return Clients.Group(groupName).InvokeAsync("addInfoMessageFromGroup", new[] { groupName, groupName + "created" });
        }

        /// <summary>
        /// User calls this method to leave a group
        /// </summary>
        /// <param name="groupName"></param>
        /// <returns></returns>
        public async Task<Object> LeaveGroup(string groupName)
        {
            string name = GetNameFromClaim();

            var user = context.Users.Include(u=>u.ApplicationUserConversationRooms).SingleOrDefault(u => u.UserName == name);

            var aUCRToRemove = user.ApplicationUserConversationRooms.FirstOrDefault(u => u.RoomName == groupName);
            if (aUCRToRemove == null)
            {
                return Clients.Client(Context.ConnectionId).InvokeAsync("addInfoMessageFromGroup", new[] { groupName, name + " is not a member of " + groupName });
            }

            user.ApplicationUserConversationRooms.Remove(aUCRToRemove);
            context.ApplicationUserConversationRooms.Remove(aUCRToRemove);

            await context.SaveChangesAsync();

            //If there are no more links to that room then it should be deleted!
            var finalAUCR = context.ApplicationUserConversationRooms.FirstOrDefault(u => u.RoomName == groupName);
            if (finalAUCR == null)
            {
                var roomToRemove = context.Rooms.FirstOrDefault(u => u.RoomName==groupName);
                context.Rooms.Remove(roomToRemove);
            }
            
            await context.SaveChangesAsync();
            await Groups.RemoveAsync(Context.ConnectionId, groupName);
            return Clients.All.InvokeAsync("userLeftGroup", new[] { name, groupName });
        }

        private string GetNameFromClaim()
        {
            IEnumerable<Claim> claims = Context.User.Claims;
            Claim nameClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            return nameClaim.Value;
        }

        /*        
         *          /// <summary>
                /// Used to add the current user and one other user to a new groupchat
                /// </summary>
                /// <param name="groupName"></param>
                /// <param name="userNameOfOtherUser"></param>
                /// <returns></returns>
         *        public async Task<Object> StartGroupChat(string groupName, string userNameOfOtherUser)
                {
                    string name = GetNameFromClaim();

                    //Add user to in-memory group
                    foreach (var connectionId in _connections.GetConnections(name))
                    {
                        await Groups.AddAsync(connectionId, groupName);
                    }

                    //Add other user to in-memory group if other user is connected
                    foreach (var connectionId in _connections.GetConnections(userNameOfOtherUser))
                    {
                        await Groups.AddAsync(connectionId, groupName);
                    }

                    // Retrieve room if it exists. If it doesn't it will be created.
                    var group = context.Rooms.FirstOrDefault(e => e.RoomName == groupName);
                    // Retrieve user.
                    var user = context.Users.Include(u => u.ApplicationUserConversationRooms).SingleOrDefault(u => u.UserName == name);

                    // Retrieve other user.
                    var otherUser = context.Users.Include(u => u.ApplicationUserConversationRooms).SingleOrDefault(u => u.UserName == userNameOfOtherUser);

                    //Is the user already a member of the group? In that case, return info message stating this.
                    if (user.ApplicationUserConversationRooms.FirstOrDefault(u => u.RoomName == groupName) != null)
                    {
                        return Clients.Group(groupName).InvokeAsync("addInfoMessageFromGroup", new[] { groupName, name + " is already a participant in group " + groupName });
                    }

                    //Is other user already a member of the group? In that case, return info message stating this.
                    if (user.ApplicationUserConversationRooms.FirstOrDefault(u => u.RoomName == groupName) != null)
                    {
                        return Clients.Group(groupName).InvokeAsync("addInfoMessageFromGroup", new[] { groupName, userNameOfOtherUser + " is already a participant in group " + groupName });
                    }

                    //Create Room
                    if (group == null)
                    {
                        var newGroup = new ConversationRoom()
                        {
                            RoomName = groupName
                        };

                        ApplicationUserConversationRoom sRCR = new ApplicationUserConversationRoom()
                        {
                            ApplicationUserId = user.Id,
                            ApplicationUser = user,
                            RoomName = groupName,
                            ConversationRoom = newGroup
                        };

                        ApplicationUserConversationRoom sRCR2 = new ApplicationUserConversationRoom()
                        {
                            ApplicationUserId = otherUser.Id,
                            ApplicationUser = otherUser,
                            RoomName = groupName,
                            ConversationRoom = newGroup
                        };

                        newGroup.ApplicationUserConversationRooms.Add(sRCR);
                        newGroup.ApplicationUserConversationRooms.Add(sRCR2);

                        context.ApplicationUserConversationRooms.Add(sRCR);
                        context.ApplicationUserConversationRooms.Add(sRCR2);

                        user.ApplicationUserConversationRooms.Add(sRCR);
                        otherUser.ApplicationUserConversationRooms.Add(sRCR2);
                    }
                    else
                    {
                        ApplicationUserConversationRoom sRCR = new ApplicationUserConversationRoom()
                        {
                            ApplicationUserId = user.Id,
                            ApplicationUser = user,
                            RoomName = groupName,
                            ConversationRoom = group
                        };

                        ApplicationUserConversationRoom sRCR2 = new ApplicationUserConversationRoom()
                        {
                            ApplicationUserId = otherUser.Id,
                            ApplicationUser = otherUser,
                            RoomName = groupName,
                            ConversationRoom = group
                        };

                        group.ApplicationUserConversationRooms.Add(sRCR);
                        group.ApplicationUserConversationRooms.Add(sRCR2);

                        context.ApplicationUserConversationRooms.Add(sRCR);
                        context.ApplicationUserConversationRooms.Add(sRCR2);

                        user.ApplicationUserConversationRooms.Add(sRCR);
                        otherUser.ApplicationUserConversationRooms.Add(sRCR2);
                    }

                    await context.SaveChangesAsync();

                    await Clients.Group(groupName).InvokeAsync("userAddedToGroup", new[] { groupName, name });

                    return Clients.Group(groupName).InvokeAsync("userAddedToGroup", new[] { groupName, userNameOfOtherUser });
                }
                */

    }
}
