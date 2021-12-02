using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mav.API.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/{version:apiVersion}/[controller]")]
    [ApiController]
    public class EchoController : ControllerBase
    {
        private readonly IServiceProvider serviceProvider;

        public EchoController(IServiceProvider _serviceProvider)
        {
            serviceProvider = _serviceProvider;
        }

        //GET api/1.0/Echo/GetEchoTest/{id}
        [HttpGet("GetEchoTest/{id}", Name = "GetEchoTest")]
        [AllowAnonymous]
        public IActionResult GetEchoTest(int id)
        {
            if (id == 0) { return BadRequest(); }
            var r = $"Hello No. {id}";
            return Ok(r);
        }

        //GET api/1.0/Echo/GetEchoTest/{id}
        [HttpGet("GetEchoTestSecure/{id}", Name = "GetEchoTestSecure")]
        [Authorize(Roles = "Administrator")]
        public IActionResult GetEchoTestSecure(int id)
        {
            if (id == 0) { return BadRequest(); }
            var r = $"Hello to a secure No. {id}";
            return Ok(r);
        }
    }
}