using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedRiverChatServer.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string SocialSecurity { get; set; }
    }

    public class RegisterModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }

    public class RoleModel
    {
        public string Email { get; set; }
        public string RoleName { get; set; }
    }

    public class DeleteModel
    {
        public string Email { get; set; }
    }

}
