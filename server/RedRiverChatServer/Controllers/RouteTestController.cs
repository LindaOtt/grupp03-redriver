using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RedRiverChatServer.Controllers
{
    /// <summary>
    /// Selection of routes used for api auth tests
    /// </summary>
    [Route("api/[controller]/[action]")]
    public class RouteTestController : Controller
    {
        // Example of route not requiring auth
        [HttpGet]
        public IActionResult TryUnprotectedRoute()
        {
            return Ok(new { result = "Unprotected route accessed" });
        }

        // Example of authorized route
        [HttpGet,Authorize]
        public IActionResult TryProtectedRoute()
        {
            return Ok(new { result = "Protected route accessed"});
        }


        // Example of authorized route - GET api/values
        [HttpGet, Authorize(Roles = "admin")]
        public IActionResult TryProtectedRouteAdmin()
        {
            return Ok(new { result = "Protected route accessed - you shold be admin if you see this." });
        }

        // Example of authorized route 
        [HttpGet, Authorize(Roles = "superuser")]
        public IActionResult TryProtectedRouteSuperUser()
        {
            return Ok(new { result = "Protected route accessed  - you shold be superuser if you see this." });
        }

        // Example of authorized route - GET api/values
        [HttpGet, Authorize(Roles = "superuser,admin")]
        public IActionResult TryProtectedRouteSuperUserOrAdmin()
        {
            return Ok(new { result = "Protected route accessed - you shold be  OR admin if you see this." });
        }

    }
}
