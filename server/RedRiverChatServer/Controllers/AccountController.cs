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
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private IConfiguration _config;
        private UserManager<ApplicationUser> _userManager;
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
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(new { response = "Registration successful" });
            }
            else { return BadRequest(new { result.Errors }); }
        }

        [HttpPost]
        public async Task<IActionResult> LogIn([FromBody]LoginModel login)
        {
            IActionResult response = Unauthorized();

            var user = _userManager.Users.SingleOrDefault<ApplicationUser>(r => r.Email == login.Email);

            if (user == null) { return response; }

            var result = await _signInManager.CheckPasswordSignInAsync(user,
                   login.Password, lockoutOnFailure: false);

         
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


        [HttpPost, Authorize]
        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { response = "User logged out." });
        }

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

        private async Task<string> BuildToken(ApplicationUser user)
        {
            //Supposing user can only have one role
            var roleList = await  _userManager.GetRolesAsync(user);

            string userRole = string.Empty;

            if (roleList.Count == 0) { userRole = "user"; }
            else { userRole = roleList[0]; }

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