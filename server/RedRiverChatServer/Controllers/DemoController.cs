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
    /// Routes to be primarily called by user to upload avatar
    /// 
    /// </summary>
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class DemoController : Controller
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
        public DemoController(IHostingEnvironment IHostingEnvironment, UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _environment = IHostingEnvironment;
            _userManager = userManager;
            this.context = context;
        }

        [HttpGet, Authorize]
        public IActionResult UploadAvatar()
        {
            return View();
        }

        /// <summary>
        /// Uploads user avatar to wwwroot/Avatars.
        /// </summary>
        /// <returns></returns>
        [HttpPost, Authorize]
        public ActionResult UploadAvatar(string random)
        {
            string name = GetNameFromClaim();
            var user = _userManager.Users.FirstOrDefault(c => c.UserName == name);

            var newFileName = string.Empty;

            if (HttpContext.Request.Form.Files != null)
            {
                var fileName = string.Empty;
                string PathDB = string.Empty;

                var files = HttpContext.Request.Form.Files;

                foreach (var file in files)
                {
                    //Getting FileName
                    fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                    //Assigning FileName
                    var myUniqueFileName = "test";

                    //Getting file Extension
                    var FileExtension = Path.GetExtension(fileName);

                    //Concating FileName + FileExtension
                    newFileName = myUniqueFileName + FileExtension;

                    //Combines two strings into a path
                    fileName = Path.Combine(_environment.WebRootPath, "Avatars") + $@"/{newFileName}";

                    //If you want to store path to folder in database
                    PathDB = "Avatars/" + newFileName;

                    using (FileStream fs = System.IO.File.Create(fileName))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                    }
                }
            }
            return Ok(new { result = "Avatar successfully uploaded" });

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
