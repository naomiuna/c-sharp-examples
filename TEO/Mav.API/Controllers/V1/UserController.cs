using Mav.Common.Models;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using Mav.Services.Identity.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Threading.Tasks;

namespace Mav.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/{version:apiVersion}/[controller]")]
    [ApiController]
    public class UserController : ApiControllerBase
    {
        private readonly IUserService UserService;
        private readonly ICentreService CentreService;

        public UserController(
            IConfiguration configuration,
            IUserService userService,
            ICentreService centreService
        ) : base(configuration)
        {
            UserService = userService;
            CentreService = centreService;
        }

        // GET api/1.0/User/GetUserById/{id}
        [HttpGet("GetUserById/{id}", Name = "GetUserByIdRoute")]
        [Authorize(Roles = "Administrator,ExamOfficer")]
        public async Task<IActionResult> GetUserById(string id)
        {
            return await TryActionAsync(async () =>
            {
                var user = await UserService.GetUserById<UserViewModel>(id);
                var roles = await UserService.GetUserRoles(id);
                user.Role = roles.FirstOrDefault() ?? "";
                return user;
            });
        }

        // Get api/1.0/User/GetCurrentUser
        [HttpGet("GetCurrentUser", Name = "GetCurrentUserRoute")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var principal = await GetCurrentUserAsync();
            if (string.IsNullOrEmpty(principal?.UserID))
            {
                return BadRequest();
            }
            return await TryActionAsync(async () =>
            {
                return await UserService.GetUserById<UserViewModel>(principal?.UserID);
            });
        }

        // GET api/1.0/User/GetExamUserById/{id}
        [HttpGet("GetExamUserById/{id}", Name = "GetExamUserByIdRoute")]
        [Authorize(Roles = "Administrator,ExamOfficer")]
        public async Task<IActionResult> GetExamUserById(string id)
        {
            return await TryActionAsync(async () => await UserService.GetExamUserById(id));
        }

        // GET api/1.0/User/GetMyDetails
        [HttpGet("GetMyDetails", Name = "GetMyDetailsRoute")]
        [Authorize]
        public async Task<IActionResult> GetMyDetails()
        {
            var principal = await GetCurrentUserAsync();
            if (string.IsNullOrEmpty(principal?.UserID))
            {
                return BadRequest();
            }

            return await TryActionAsync(async () => await UserService.GetExamUserById(principal?.UserID));
        }

        // GET api/1.0/User/GetExamInvigilatorDetails/{id}
        [HttpGet("GetExamInvigilatorDetails/{id}", Name = "GetExamInvigilatorDetailsRoute")]
        [Authorize(Roles = "Administrator,ExamOfficer")]
        public async Task<IActionResult> GetExamInvigilatorDetails(string id)
        {
            return await TryActionAsync(async () => await UserService.GetUserById<InvigilatorViewModel>(id));
        }


        // POST api/1.0/User/CreateUser
        [HttpPost("CreateUser", Name = "CreateUserRoute")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateUser(AddUserViewModel vm)
        {
            var principal = await GetCurrentUserAsync();

            if (string.IsNullOrEmpty(principal?.UserID))
            {
                return BadRequest();
            }

            if (!vm.Email.Equals(vm.ConfirmEmail))
            {
                ModelState.AddModelError("ConfirmEmail", "Please ensure both emails match");
                return BadRequest(ModelState);
            }

            vm.CreatorID = principal.UserID;
            vm.Enabled = false;

            return await TryActionAsync(async () =>
            {
                var createUser = await UserService.CreateUser<string>(vm);
                if (createUser.Status == EnumStatusCode.Ok)
                {
                    return Ok(createUser);
                }
                return BadRequest();
            });
        }

        // POST api/1.0/User/CreateExamInvigilator
        [HttpPost("CreateExamInvigilator", Name = "CreateExamInvigilatorRoute")]
        [Authorize(Roles = "ExamOfficer")]
        public async Task<IActionResult> CreateExamInvigilator(AddInvigilatorViewModel vm)
        {
            var principal = await GetCurrentUserAsync();

            if (string.IsNullOrEmpty(principal?.UserID))
            {
                //ModelState.AddModelError("ConfirmEmail", "Your login credential have become stale. Please logout and sign back in and try again.");
                //return BadRequest();

                return Ok(new GenericResult<string>
                {
                    Status = EnumStatusCode.UnexpectedError,
                    Message = "Your login credential have become stale. Please logout and sign back in and try again."
                });
            }

            if (!vm.Email.Equals(vm.ConfirmEmail))
            {
                //ModelState.AddModelError("ConfirmEmail", "Please ensure both emails match");
                //return BadRequest(ModelState);

                return Ok(new GenericResult<string>
                {
                    Status = EnumStatusCode.UnexpectedError,
                    Message = "Please ensure both emails match."
                });
            }

            var centreLookup = await CentreService.GetUserCentreAsync(principal.UserID);
            if (centreLookup.Status != EnumStatusCode.Ok)
            {
                //ModelState.AddModelError("ConfirmEmail", "No matching centre record has been found");
                //return BadRequest();

                return Ok(new GenericResult<string>
                {
                    Status = EnumStatusCode.UnexpectedError,
                    Message = "No matching centre record has been found."
                });
            }

            vm.CreatorID = principal.UserID;
            vm.CentreID = centreLookup.KeyID;
            vm.Enabled = false;

            return await TryActionAsync(async () =>
            {
                var centreTotals = await CentreService.GetCentreInvigilatorTotals(vm.CentreID.Value);
                if (centreTotals.CurrentTotal < centreTotals.MaxAllowed)
                {
                    var createUser = await UserService.CreateExamInvigilator<string>(vm);
                    if (createUser.Status == EnumStatusCode.Ok)
                    {
                        var createUserCentre = await CentreService.AddUserCentreAsync<int>(new AddUserCentreViewModel { CentreID = vm.CentreID ?? 0, UserID = createUser.KeyID });
                        if (createUserCentre.KeyID > 0)
                        {
                            centreTotals.CurrentTotal++;
                            //if (centreTotals.CurrentTotal == centreTotals.MaxAllowed)
                            //{
                            //    createUser.Status = EnumStatusCode.OkLimitReached;
                            //    createUser.Message = "Maximum number of invigilators for this account has been reached";
                            //}
                            return createUser;
                        }
                    }

                    return createUser;
                }

                return new GenericResult<string>
                {
                    Status = EnumStatusCode.OkLimitReached,
                    Message = "Maximum number of invigilators for this account has been reached"
                };
            });
        }

        // POST api/1.0/User/CreateSLT
        [HttpPost("CreateSLT", Name = "CreateSLTRoute")]
        [Authorize(Roles = "ExamOfficer")]
        public async Task<IActionResult> CreateSLT(AddSLTViewModel vm)
        {
            var principal = await GetCurrentUserAsync();

            if (string.IsNullOrEmpty(principal?.UserID))
            {
                //ModelState.AddModelError("ConfirmEmail", "Your login credential have become stale. Please logout and sign back in and try again.");
                //return BadRequest();

                return Ok(new GenericResult<string>
                {
                    Status = EnumStatusCode.UnexpectedError,
                    Message = "Your login credential have become stale. Please logout and sign back in and try again."
                });
            }

            if (!vm.Email.Equals(vm.ConfirmEmail))
            {
                //ModelState.AddModelError("ConfirmEmail", "Please ensure both emails match");
                //return BadRequest(ModelState);

                return Ok(new GenericResult<string>
                {
                    Status = EnumStatusCode.UnexpectedError,
                    Message = "Please ensure both emails match."
                });
            }

            var centreLookup = await CentreService.GetUserCentreAsync(principal.UserID);
            if (centreLookup.Status != EnumStatusCode.Ok)
            {
                //ModelState.AddModelError("ConfirmEmail", "No matching centre record has been found");
                //return BadRequest();

                return Ok(new GenericResult<string>
                {
                    Status = EnumStatusCode.UnexpectedError,
                    Message = "No matching centre record has been found."
                });
            }

            vm.CreatorID = principal.UserID;
            vm.CentreID = centreLookup.KeyID;
            vm.Enabled = false;

            return await TryActionAsync(async () =>
            {
                
                    var createUser = await UserService.CreateSLT<string>(vm);
                    if (createUser.Status == EnumStatusCode.Ok)
                    {
                        var createUserCentre = await CentreService.AddUserCentreAsync<int>(new AddUserCentreViewModel { CentreID = vm.CentreID ?? 0, UserID = createUser.KeyID });
                        if (createUserCentre.KeyID > 0)
                        {
                            //if (centreTotals.CurrentTotal == centreTotals.MaxAllowed)
                            //{
                            //    createUser.Status = EnumStatusCode.OkLimitReached;
                            //    createUser.Message = "Maximum number of invigilators for this account has been reached";
                            //}
                            return createUser;
                        }
                    }

                    return createUser;
            });
        }

        // POST api/1.0/User/CreateExamOfficer
        [HttpPost("CreateExamOfficer", Name = "CreateExamOfficerRoute")]
        [Authorize(Roles = "Administrator,ExamOfficer")]
        public async Task<IActionResult> CreateExamOfficer(AddInvigilatorViewModel vm)
        {
            var principal = await GetCurrentUserAsync();

            if (string.IsNullOrEmpty(principal?.UserID))
            {
                //ModelState.AddModelError("ConfirmEmail", "Your login credential have become stale. Please logout and sign back in and try again.");
                //return BadRequest();

                return Ok(new GenericResult<string>
                {
                    Status = EnumStatusCode.UnexpectedError,
                    Message = "Your login credential have become stale. Please logout and sign back in and try again."
                });
            }

            if (!vm.Email.Equals(vm.ConfirmEmail))
            {
                //ModelState.AddModelError("ConfirmEmail", "Please ensure both emails match");
                //return BadRequest(ModelState);

                return Ok(new GenericResult<string>
                {
                    Status = EnumStatusCode.UnexpectedError,
                    Message = "Please ensure both emails match."
                });
            }

            if (!vm.CentreID.HasValue || vm.CentreID == 0)
            {
                var centreLookup = await CentreService.GetUserCentreAsync(principal.UserID);
                if (centreLookup.Status != EnumStatusCode.Ok)
                {
                    //ModelState.AddModelError("ConfirmEmail", "No matching centre record has been found");
                    //return BadRequest();

                    return Ok(new GenericResult<string>
                    {
                        Status = EnumStatusCode.UnexpectedError,
                        Message = "No matching centre record has been found."
                    });
                }
                vm.CentreID = centreLookup.KeyID;
            }

            vm.CreatorID = principal.UserID;
            vm.Enabled = false;

            return await TryActionAsync(async () =>
            {
                var createUser = await UserService.CreateExamOfficer<string>(vm);
                if (createUser.Status == EnumStatusCode.Ok)
                {
                    var createUserCentre = await CentreService.AddUserCentreAsync<int>(new AddUserCentreViewModel { CentreID = vm.CentreID ?? 0, UserID = createUser.KeyID });
                    if (createUserCentre.KeyID > 0)
                    {
                        return createUser;
                    }
                }
                return createUser;
            });
        }

        // PUT api/1.0/User/UpdateUser
        [HttpPut("UpdateUser", Name = "UpdateUserRoute")]
        [Authorize]
        public async Task<IActionResult> UpdateUser(UserViewModel vm)
        {
            return await TryActionAsync(async () => await UserService.UpdateUser<string>(vm));
        }

        // POST api/1.0/User/DeleteUser
        [HttpPost("DeleteUser/{id}", Name = "DeleteUserRoute")]
        [Authorize(Roles = "Administrator,ExamOfficer")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            return await TryActionAsync(async () => await UserService.DeleteUser<string>(id));
        }
    }
}