using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RedRiverChatServer.Models;

namespace RedRiverChatServer.Controllers
{
    [Produces("application/json")]
    [Route("api/Group")]
    public class GroupController : Controller
    {
        ApplicationDbContext context;

        public GroupController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet("{name}")]
        [Authorize]
        public ActionResult GetGroupDetails(string name)
        {
            GroupModel group = new GroupModel();
            List<string> usersInGroup = new List<string>();
            var result = context.ApplicationUserConversationRooms.Where(c => c.RoomName == name);

            if(result.Count() == 0) { return NotFound(); }

            group.GroupName = name;

            //ToDo Creation Date

            foreach(ApplicationUserConversationRoom a in result)
            {
                var user = context.Users.FirstOrDefault(u => u.Id == a.ApplicationUserId);
                usersInGroup.Add(user.UserName);
            }

            //Security check - is the calling user in this group?
            string username = GetNameFromClaim();
            if (!usersInGroup.Contains(username)) { return Unauthorized(); }

            group.Members = usersInGroup.ToArray();
            return Ok(group);
        }

        /// <summary>
        /// Convenience method to get name of user from the JWT token.
        /// </summary>
        /// <returns></returns>
        private string GetNameFromClaim()
        {
            IEnumerable<Claim> claims = HttpContext.User.Claims;
            Claim nameClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            string name = nameClaim.Value;
            return name;
        }

    }



}