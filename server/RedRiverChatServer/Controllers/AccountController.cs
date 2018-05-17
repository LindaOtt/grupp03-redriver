using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RedRiverChatServer.Models;
using RedRiverChatServer.Services;

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
        //EmailSender sends out confirmation emails
        private IEmailSender _emailSender;

        public AccountController(IConfiguration config, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IEmailSender emailSender)
        {
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
        }

        [HttpPost]
        [EnableCors("CorsPolicy")]
        public async Task<object> Register([FromBody] RegisterModel model)
        {
            //Check to see if model is missing required fields

            var initialResult = BuildIdentityResultForRegister(model);
            if ( !initialResult.Succeeded)
            {
              //  var initialResult =IdentityResult.Failed(BuildIdentityErrorArray(model));
                return BadRequest(new { initialResult.Errors });
            }

            var config = new MapperConfiguration(cfg => {

                cfg.CreateMap<RegisterModel, ApplicationUser>();

            });

            IMapper iMapper = config.CreateMapper();

            var user = iMapper.Map<RegisterModel, ApplicationUser>(model);
            
            //CreateAsync does the heavy lifting of adding user to database.
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var callbackUrl = Url.Action(new Microsoft.AspNetCore.Mvc.Routing.UrlActionContext
                {
                    Action = "ConfirmEmail",
                    Values = new { userId = user.Id, code },
                    Protocol = HttpContext.Request.Scheme
                });
                Console.WriteLine(callbackUrl);
                //var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);
                await _emailSender.SendEmailConfirmationAsync(model.Email, callbackUrl);

                return Ok(new { response = "Registration successful" });
            }
            else { return BadRequest(new { result.Errors }); }
        }
        /// <summary>
        /// Cannot change username or password via this method!
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut, Authorize]
        public async Task<object> UpdateAccount([FromBody] UserInfoModel model)
        {
            var username = GetNameFromClaim();
            var user = _userManager.Users.SingleOrDefault<ApplicationUser>(r => r.UserName == username);
     
            //If fields are not present they are not updated. Fields with empty strings nullify database fields. But
            //username,email,firstname, lastname and password cannot be null or empty strings.
            var config = new MapperConfiguration(cfg => {

            //How to return a null instead of an empty string?
            cfg.CreateMap<UserInfoModel, ApplicationUser>()
            .ForMember(destination => destination.UserName, option => option.Ignore())
            .ForMember(destination => destination.Email, option => { option.PreCondition(srs => srs.Email != null && srs.Email != string.Empty); })
            .ForMember(destination => destination.FirstName, option => { option.PreCondition(srs => srs.FirstName != null && !string.IsNullOrEmpty(srs.FirstName)); })
            .ForMember(destination => destination.Surname, option => { option.PreCondition(srs => srs.Surname != null && srs.Surname != string.Empty); })
            .ForAllMembers(p => {
                p.Condition((src, dest, srcMember) => srcMember != null);
                //p.MapFrom(src => src.==string.Empty ? "N/A": src);
            }
                    )
                ;
            });

            //This returns empty strings in the database but these should be nulls!!
            IMapper iMapper = config.CreateMapper();
            user = iMapper.Map<UserInfoModel, ApplicationUser>(model,user);

            //Convert all empty strings to nulls
            Type type = user.GetType();
            PropertyInfo[] properties = type.GetProperties();

            foreach (PropertyInfo property in properties)
            {
                if (property.PropertyType== typeof(string) && (string)property.GetValue(user)=="")
                {
                    property.SetValue(user, null);
                }
            }

            //CreateAsync updates user in database.
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok(new { response = "Update successful" });
            }
            else { return BadRequest(new { result.Errors }); }
        }


        [HttpPut, Authorize]
        public async Task<object> UpdatePassword([FromBody] PasswordModel model)
        {
            var username = GetNameFromClaim();
            var user = _userManager.Users.SingleOrDefault<ApplicationUser>(r => r.UserName == username);


            var result= await _userManager.ChangePasswordAsync(user, model.currentPassword, model.newPassword);
        
            if (result.Succeeded)
            {
                return Ok(new { response = "Password successfully updated" });
            }
            else { return BadRequest(new { result.Errors }); }
        }

        /// <summary>
        /// 'ConfirmEmail' gives the newly registered user login privileges.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<object> ConfirmEmail([FromQuery(Name = "userId")] string userId, [FromQuery(Name = "code")] string token)
        {
            // Find the user by userId
            var user = _userManager.Users.SingleOrDefault<ApplicationUser>(r => r.Id == userId);

            // Update EmailConfirmed
            var result = await _userManager.ConfirmEmailAsync(user, token);

            if (result.Succeeded)
            {
                string clientLogin = "https://clientredriver.azurewebsites.net/";
                return Redirect(clientLogin);
                //return Ok(new { Response = "Email successfully confirmed" });
            }
            else
            {
                return BadRequest(new { result.Errors });
            }
        }

        /// <summary>
        /// 'Login' is really a matter of creating and distributing a JWT token.
        /// User can log in by either email or username.
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> LogIn([FromBody]LoginModel login)
        {
            IActionResult response = Unauthorized();

            ApplicationUser user;

            if (login.Username != null)
            {
                user = _userManager.Users.SingleOrDefault<ApplicationUser>(r => r.UserName == login.Username);
            }
            else if (login.Email != null)
            {
                user = _userManager.Users.SingleOrDefault<ApplicationUser>(r => r.Email == login.Email);
            }
            else
            {
                return BadRequest(new { response = "Required field missing. Username and/or email , password must be present." });
            }
            
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
            if (result.IsNotAllowed)
            {
                response = BadRequest(new { response = "User cannot sign in without a confirmed email" });
            }
            if (result.RequiresTwoFactor)
            {
                response = BadRequest(new { response = "Two factor required" });
            }
           
            return response;
        }


        //Only superusers and admins are allowed to access this route.
        [HttpPost, Authorize(Roles = "superuser,admin")]
        public async Task<IActionResult> DeleteUser([FromBody]DeleteModel model)
        {
            var user = _userManager.Users.SingleOrDefault<ApplicationUser>(r => r.UserName == model.UserName);

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
            var user = _userManager.Users.SingleOrDefault<ApplicationUser>(r => r.UserName == roleModel.UserName);

            if (user == null) { return BadRequest(new { response = "Username does not exist" }); }

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

        private IdentityResult BuildIdentityResultForRegister(RegisterModel model)
        {
            var result = new IdentityResult();

            var errorsList = new List<IdentityError>();

            //Check to see if model is missing required fields
            if (model.UserName == null)
            {
                var error = new IdentityError();
                error.Code = "MissingUsername";
                error.Description = "Required field missing. Username must be present.";
                errorsList.Add(error);
            }

            if (model.Email == null)
            {
                var error = new IdentityError();
                error.Code = "MissingEmail";
                error.Description = "Required field missing. Email must be present.";
                errorsList.Add(error);
            }

            if (model.Password == null)
            {
                var error = new IdentityError();
                error.Code = "MissingPassword";
                error.Description = "Required field missing. Password must be present.";
                errorsList.Add(error);
            }

            if (model.FirstName == null)
            {
                var error = new IdentityError();
                error.Code = "MissingFirstName";
                error.Description = "Required field missing. Firstname must be present.";
                errorsList.Add(error);
            }

            if (model.Surname == null)
            {
                var error = new IdentityError();
                error.Code = "MissingSurname";
                error.Description = "Required field missing. Surname must be present.";
                errorsList.Add(error);
            }

            if (errorsList.Count == 0) { result= IdentityResult.Success; }
            else { result = IdentityResult.Failed(errorsList.ToArray()); }
            return result;
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