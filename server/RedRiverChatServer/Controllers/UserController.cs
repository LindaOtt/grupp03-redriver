using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Newtonsoft.Json;
using RedRiverChatServer.Models;

namespace RedRiverChatServer.Controllers
{
    /// <summary>
    /// Routes to be primarily called by user to get info on themselves, add/delete friends
    /// 
    /// </summary>
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {
        private readonly IHostingEnvironment _environment;
        //UserManager class used when finding users, checking passwords etc. 
        private UserManager<ApplicationUser> _userManager;
        //DBContext used to access database.
        private ApplicationDbContext context;

        /// <summary>
        ///  ASP.NET injects the UserManager and ApplicationDBContext if they are passed as parameters
        ///  in the constructor function
        /// </summary>
        public UserController(IHostingEnvironment IHostingEnvironment, UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _environment = IHostingEnvironment;
            _userManager = userManager;
            this.context = context;
        }

        /// <summary>
        /// Gets info on user from database and maps it to the RegisterModel class.
        /// This obscures unwanted info from being passed on (e.g. password hash)
        /// </summary>
        /// <returns></returns>
        [HttpGet, Authorize]
        public ActionResult GetUserInfo()
        {
            var config = new MapperConfiguration(cfg => {

                cfg.CreateMap<ApplicationUser, UserInfoModel>();

            });

            string name = GetNameFromClaim();

            var user = _userManager.Users.FirstOrDefault(c => c.UserName == name);
            context.Entry(user)
            .Collection(b => b.Friendships)
            .Load();

            if (user !=null)
            {
                IMapper iMapper = config.CreateMapper();

                var strippedUser = iMapper.Map<ApplicationUser, UserInfoModel>(user);
                return Ok(strippedUser) ;
            }
            else
            {
                return NotFound(new { result = "User not found" });
            }
        }

        /// <summary>
        /// Returns list of friends by querying Friendships database table.
        /// TODO Map this output - only friend username is needed.
        /// </summary>
        /// <returns></returns>
        [HttpGet, Authorize]
        public ActionResult GetFriends()
        {

            string name = GetNameFromClaim();
            var user = _userManager.Users.FirstOrDefault(c => c.UserName == name);

            if (user != null)
            {
                var result = context.Friendship.Where(c => c.ApplicationUserId == user.Id);
                List<string> resultList = new List<string>();
                foreach (var r in result)
                {
                    resultList.Add(r.FriendUsername);
                }
                return Ok(new { friendList = resultList });
            }
            else
            {
                return NotFound(new { result = "User not found" });
            }
        }

        public ActionResult Groups()
        {

            string name = GetNameFromClaim();
            var user = _userManager.Users.FirstOrDefault(c => c.UserName == name);

            if (user != null)
            {
                var result = context.ApplicationUserConversationRooms.Where(c => c.ApplicationUserId == user.Id);
                List<string> resultList = new List<string>();
                foreach (var r in result)
                {
                    resultList.Add(r.RoomName);
                }
                return Ok(new { groupList = resultList });
            }
            else
            {
                return NotFound(new { groupList = "User not found" });
            }
        }

        /// <summary>
        /// Adds two friendship entries to Friendship database table - one
        /// friendship in each direction.
        /// </summary>
        /// <param name="friendModel"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Deletes a Friendship and its reciprocal friendship from Friendship table.
        /// </summary>
        /// <param name="friendModel"></param>
        /// <returns></returns>
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

                context.Friendship.Remove(friendshipToRemove);
                context.Friendship.Remove(reciprocalFriendshipToRemove);

                context.SaveChanges();
               
                return Ok(new { result = "Friendship successfully removed" });
            }
            else
            {
                return NotFound(new { result = "Friendship could not be removed" });
            }
        }

        /// <summary>
        /// Uploads users profile picture to wwwroot/images.
        /// </summary>
        /// <returns></returns>
        [HttpPost, Authorize]
        public async Task<ActionResult> UploadImage()
        {
            string name = GetNameFromClaim();
            var user = _userManager.Users.FirstOrDefault(c => c.UserName == name);

            var newFileName = string.Empty;
            var tempFileName = string.Empty;

            if (HttpContext.Request.Form.Files != null)
            {
                var fileName = string.Empty;
                string PathDB = string.Empty;

                var files = HttpContext.Request.Form.Files;

                foreach (var file in files)
                {
                    //Getting FileName
                    fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                    //Assigning users name as FileName
                    var uniqueFileName = name;

                    //Getting file Extension
                    var FileExtension = Path.GetExtension(fileName);

                    //Concating FileName + FileExtension
                    newFileName = uniqueFileName + FileExtension;

                    //Concating FileName + FileExtension for AvatarUrl
                    tempFileName = uniqueFileName + FileExtension;

                    //Combines two strings into a path
                    fileName = Path.Combine(_environment.WebRootPath, "images") + $@"/{newFileName}";

                    //If you want to store path to folder in database
                    PathDB = "images/" + newFileName;

                    //Set users avatar to the uploaded file
                    user.AvatarUrl = "https://serverredriver.azurewebsites.net/images/" + tempFileName;

                    await _userManager.UpdateAsync(user);

                    using (FileStream fs = System.IO.File.Create(fileName))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                    }
                }
                return Ok(new { result = "Image successfully uploaded" });
            }
            else
            {
                return BadRequest(new { result = "Must provide an image for upload."});
            }
        }

        [Authorize]
        public ActionResult GroupLogs([FromBody] GroupModel groupModel)
        {
            //ToDo Check if user in IN group!
             var result = context.Logs.Where(c => c.GroupName == groupModel.GroupName); 
             return Ok(result); 
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