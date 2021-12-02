using Mav.Common.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Net.Http.Headers;

namespace Mav.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/{version:apiVersion}/[controller]")]
    [ApiController]
    public class FilesController : ApiControllerBase
    {
        public FilesController(
            IConfiguration configuration
        ) : base(configuration)
        {}
        
        //POST api/1.0/Files/TinyUpload
        [HttpPost("TinyUpload", Name = "TinyUploadRoute")]
        [Authorize(Roles = "Administrator")]
        [DisableRequestSizeLimit]
        public IActionResult TinyUpload()
        {
            var result = new GenericResult<string>();
            
            try
            {
                var file = Request.Form.Files[0];

                // CDN settings
                var tinySection = Configuration.GetSection("TinySettings");
                var tinySettings = tinySection.Get<TinySettings>();
                if (tinySettings == null)
                {
                    return BadRequest("Tiny settings are missing");
                }

                string newPath = Path.Combine(tinySettings.ImagesCdnPath, tinySettings.ImagesCdnFolder);
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }

                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var cdnFileName = $"{Guid.NewGuid()}{Path.GetExtension(fileName)}";
                    var cdnUrl = $"/assets/{tinySettings.ImagesCdnFolder}/{cdnFileName}";
                    string fullPath = Path.Combine(newPath, cdnFileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    result.KeyID = cdnUrl;
                    return Ok(result);
                }
                
                return NotFound("No file found");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}