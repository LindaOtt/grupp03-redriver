using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RedRiverChatServer.Models;

namespace RedRiverChatServer.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private ApplicationDbContext context;

        public UserController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            this.context = context;
        }

        [HttpGet, Authorize]
        public ActionResult GetUserInfo()
        {
            var config = new MapperConfiguration(cfg => {

                cfg.CreateMap<ApplicationUser, RegisterModel>();

            });

            string name = GetNameFromClaim();
            var user = _userManager.Users.FirstOrDefault(c => c.UserName == name);

            if (user !=null)
            {
                IMapper iMapper = config.CreateMapper();

                var strippedUser = iMapper.Map<ApplicationUser, RegisterModel>(user);
                return Ok(strippedUser) ;
            }
            else
            {
                return NotFound(new { result = "User not found" });
            }
        }

        [HttpGet, Authorize]
        public ActionResult GetFriends()
        {

            string name = GetNameFromClaim();
            var user = _userManager.Users.FirstOrDefault(c => c.UserName == name);

            if (user != null)
            {
                var result = context.Friendship.Where(c => c.ApplicationUserId == user.Id);
                return Ok(result);
            }
            else
            {
                return NotFound(new { result = "User not found" });
            }
        }

        [HttpPost, Authorize]
        public async Task<ActionResult> AddFriend([FromBody] FriendModel friendModel)
        {
            string name = GetNameFromClaim();
            var friend = _userManager.Users.FirstOrDefault(c => c.UserName == friendModel.Username);
            var user = _userManager.Users.FirstOrDefault(c => c.UserName == name);

            //Does friendship already exist?
            var friendshipTest = context.Friendship.Where(c => c.ApplicationUserId == user.Id && c.FriendUsername==friendModel.Username);
            if(friendshipTest.Count<Friendship>()!=0) { return Ok(new { result = "Friend already added" }); }

            if (user != null && friend!=null)
            {
                var friendship = new Friendship { FriendUsername=friend.UserName, FriendId=friend.Id};
                user.Friendships.Add(friendship);

                var reversedFriendship = new Friendship { FriendUsername = user.UserName, FriendId = user.Id };
                friend.Friendships.Add(reversedFriendship);

                await _userManager.UpdateAsync(user);
         
                return Ok(new { result = "Friend added successfully" });
            }
            else
            {
                return NotFound(new { result = "Friend could not be added" });
            }
        }

        [HttpPost, Authorize]
        public async Task<ActionResult> DeleteFriend([FromBody] FriendModel friendModel)
        {
            string name = GetNameFromClaim();
            var friend = _userManager.Users.FirstOrDefault(c => c.UserName == friendModel.Username);
            var user = _userManager.Users.FirstOrDefault(c => c.UserName == name);

            var friendshipToRemove = context.Friendship.FirstOrDefault(c => c.ApplicationUserId == user.Id && c.FriendUsername == friendModel.Username);
            var reciprocalFriendshipToRemove = context.Friendship.FirstOrDefault(c => c.ApplicationUserId == friend.Id && c.FriendUsername == user.UserName);

            if (friendshipToRemove==null) { return Ok(new { result = "Friendship does not exist" }); }

            if (user != null && friendshipToRemove != null && reciprocalFriendshipToRemove != null)
            {
                user.Friendships.Remove(friendshipToRemove);
                friend.Friendships.Remove(reciprocalFriendshipToRemove);
                await _userManager.UpdateAsync(user);
                await _userManager.UpdateAsync(friend);
                return Ok(new { result = "Friendship successfully removed" });
            }
            else
            {
                return NotFound(new { result = "Friendship could not be removed" });
            }
        }

        private string GetNameFromClaim()
        {
            IEnumerable<Claim> claims = HttpContext.User.Claims;
            Claim nameClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            string name = nameClaim.Value;
            return name;
        }
    }
}