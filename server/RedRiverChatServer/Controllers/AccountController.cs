using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RedRiverChatServer.Models;

namespace RedRiverChatServer.Controllers
{   
    /// <summary>
    /// These are the routes used to create,read, update and delete accounts. 
    /// </summary>
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        //Needed to get info from appsettings.json
        private IConfiguration _config;
        //Usermanager to deal with user creation etc
        private UserManager<ApplicationUser> _userManager;
        //SignInManager to deal with password checking.
        private SignInManager<ApplicationUser> _signInManager;

        public AccountController(IConfiguration config, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<object> Register([FromBody] RegisterModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Username,
                Email = model.Email
            };

            //CreateAsync does the heavy lifting of adding user to database.
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(new { response = "Registration successful" });
            }
            else { return BadRequest(new { result.Errors }); }
        }

        /// <summary>
        /// 'Login' is really a matter of creating and distributing a JWT token.
        /// Should user login by username instead?
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> LogIn([FromBody]LoginModel login)
        {
            IActionResult response = Unauthorized();

            var user = _userManager.Users.SingleOrDefault<ApplicationUser>(r => r.Email == login.Email);

            //Does the user not exist? Return unauthorized in that case.
            if (user == null) { return response; }

            //Check to see if the password was correct
            var result = await _signInManager.CheckPasswordSignInAsync(user,
                   login.Password, lockoutOnFailure: false);

            //Deal with the various outcomes with relevant response.
            if (result.Succeeded)
            {
                var tokenString = BuildToken(user);
                response = Ok(new { token = tokenString.Result });
            }
            if (result.IsLockedOut)
            {
                response = BadRequest(new { response = "User account locked" });
            }
            if(result.IsNotAllowed)
            {
                response = BadRequest(new { response = "Not allowed" });
            }
            if(result.RequiresTwoFactor)
            {
                response = BadRequest(new { response = "Two factor required" });
            }
           
            return response;
        }

        //Logout, but this is actually not needed since a user cannot be 'logged in'. Remove??
        [HttpPost, Authorize]
        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { response = "User logged out." });
        }

        //ToDo Change this - user should be deleted by username instead of email?
        //Only superusers and admins are allowed to access this route.
        [HttpPost, Authorize(Roles = "superuser,admin")]
        public async Task<IActionResult> DeleteUser([FromBody]DeleteModel model)
        {
            var user = _userManager.Users.SingleOrDefault<ApplicationUser>(r => r.Email == model.Email);

            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                return Ok(new { response = "User deleted." });
            }
            else
            {
                return BadRequest(result.Errors);
            }
           
        }

        //Changes the role of a user. This should be authorized, but cannot be until we decide who the first admins and superusers should be...
        [HttpPost]
        public async Task<IActionResult> AddUserToRole([FromBody]RoleModel roleModel)
        {
            var user = _userManager.Users.SingleOrDefault<ApplicationUser>(r => r.Email == roleModel.Email);

            var result = await _userManager.AddToRoleAsync(user, roleModel.RoleName);

            if (result.Succeeded)
            {
                return Ok(new { response = "User is now " + roleModel.RoleName });
            }
            else
            {
                return BadRequest(result.Errors);
            }

        }

        /// <summary>
        /// Build the JWT token for logging in. Among other things the allocated time for the token can be changed here.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        private async Task<string> BuildToken(ApplicationUser user)
        {
            //Supposing user can only have one role
            var roleList = await  _userManager.GetRolesAsync(user);

            string userRole = string.Empty;

            //Roles only exist for admin and superuser. A user without a role is simply a normal user.
            if (roleList.Count == 0) { userRole = "user"; }
            else { userRole = roleList[0]; }

            //These claims represent the information that are baked into the JWT. 
            var claims = new[]{
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("roles", userRole)
            };
            
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims: claims,
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}