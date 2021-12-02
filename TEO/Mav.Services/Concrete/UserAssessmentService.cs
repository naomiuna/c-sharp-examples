using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using Mav.Common.Extensions;
using Mav.Common.Models;
using Mav.Common.Services;
using Mav.Data.Entities;
using Mav.Data.Enums;
using Mav.Data.Repositories;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using Mav.Services.Identity.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.Extensions.Configuration;

namespace Mav.Services.Concrete
{
    public class UserAssessmentService : IUserAssessmentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IUserSearchService _userSearchService;
        private readonly IUserService _userService;

        public UserAssessmentService(IUnitOfWork unitOfWork, IMapper mapper, IConfiguration configuration, IUserSearchService userSearchService, IUserService userService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configuration = configuration;
            _userSearchService = userSearchService;
            _userService = userService;
        }

        public async Task<T> GetById<T>(int id)
        {
            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessment>();
            var r = await assRepo.SingleAsync(
                predicate: x => x.ID == id,
                include: source => source.Include(a1 => a1.Assessment).ThenInclude(a2 => a2.AssessmentGrade)
            );
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        public async Task<IPaginate<UserAssessmentListingModel>> GetListByUserId(UserAssessmentSearchModel vm)
        {
            var assRepo = _unitOfWork.GetRepositoryAsync<Assessment>();
            var userType = await _userService.GetRoleNameByRole(vm.Role);
            vm.SearchTerm = vm.SearchTerm?.ToLower() ?? "";
            Expression<Func<Assessment, bool>> whereExpr;
            //EO need to see ALL assessments
            if (userType == EnumRoleType.ExamOfficer.ToString())
            {
                whereExpr = x => (x.Deleted == null || x.Deleted == false)
                       && x.Published == true
                       && (!vm.YearID.HasValue || vm.YearID == 0 || x.YearID == vm.YearID);
            }
            else
            {
                whereExpr = x => (x.Deleted == null || x.Deleted == false)
                        && x.Published == true
                        && (!vm.YearID.HasValue || vm.YearID == 0 || x.YearID == vm.YearID)
                        //check if assessment role matches role sent through from user OR if role is null AND user is invigilator
                        && (x.Role.RoleId == vm.Role || (x.Role.RoleId == null && userType == EnumRoleType.ExamInvigilator.ToString()))
                //if user is invigilator - show all that have no role

                //&& x.UserAssessments.Any(a1 => a1.UserID.Equals(vm.UserID, StringComparison.OrdinalIgnoreCase))
                ;
            }
            Func<IQueryable<Assessment>, IOrderedQueryable<Assessment>> orderExpr = query => query.OrderByDescending(y => y.PublishedOn);

            //Func<IQueryable<Assessment>, IIncludableQueryable<Assessment, object>> include = source => source
            //    .Include(a1 => a1.UserAssessments.FirstOrDefault(a2 => a2.AssessmentID == a1.ID 
            //                    && a2.UserID.Equals(vm.UserID, StringComparison.OrdinalIgnoreCase))
            //            );

            Func<IQueryable<Assessment>, IIncludableQueryable<Assessment, object>> include = null;

            var items = await assRepo.GetListAsync(whereExpr,
                orderExpr,
                include,
                vm.PageNo - 1,
                vm.PageSize,
                true);

            var mR = _mapper.Map<Paginate<Assessment>, Paginate<UserAssessmentListingModel>>(items);

            var userAssRepo = _unitOfWork.GetRepositoryAsync<UserAssessment>();
            foreach (var item in mR.Items)
            {
                item.TargetGroup = await _userService.GetRoleNameByRole(item.TargetGroup);
                item.UserAssessmentID = 0;
                item.StatusID = (int)EnumAssessmentStatus.NotStarted;

                var userAssessment = await userAssRepo.SingleAsync(x => x.AssessmentID == item.AssessmentID && x.UserID == vm.UserID);
                if (userAssessment != null)
                {
                    item.UserAssessmentID = userAssessment.ID;
                    item.StatusID = !userAssessment.SubmittedOn.HasValue ? (int)EnumAssessmentStatus.Started : (int)EnumAssessmentStatus.Submitted;
                    item.SubmittedOn = userAssessment.SubmittedOn ?? null;
                }
            }

            return mR;
        }

        public async Task<UserAssessmentListingModel> GetUserLatestAssessment(string id)
        {
            var userAssRepo = _unitOfWork.GetRepositoryAsync<UserAssessment>();

            Func<IQueryable<UserAssessment>, IOrderedQueryable<UserAssessment>> orderExpr = query => query.OrderByDescending(y => y.StartedOn);

            Func<IQueryable<UserAssessment>, IIncludableQueryable<UserAssessment, object>> include = source => source.Include(a1 => a1.Assessment);

            var top = (await userAssRepo.GetAsync(
                predicate: x => x.UserID == id,
                orderBy: orderExpr,
                include: include
            )).FirstOrDefault() ?? null;

            if (top == null) { return null; }

            var r = new UserAssessmentListingModel()
            {
                UserAssessmentID = top.ID,
                AssessmentID = top.AssessmentID,
                Title = top.Assessment.Title,
                StatusID = top.SubmittedOn.HasValue ? (int)EnumAssessmentStatus.Submitted : (int)EnumAssessmentStatus.Started,
                YearID = top.YearID,
                SubmittedOn = top.SubmittedOn ?? null
            };

            return r;
        }

        public async Task<IPaginate<UserAssessmentListingModel>> GetUserHistory(UserAssessmentSearchModel vm)
        {
            var userAssRepo = _unitOfWork.GetRepositoryAsync<UserAssessment>();

            Expression<Func<UserAssessment, bool>> whereExpr = x => x.UserID == vm.UserID
                    && (!vm.YearID.HasValue || vm.YearID == 0 || x.YearID == vm.YearID)
            ;

            Func<IQueryable<UserAssessment>, IOrderedQueryable<UserAssessment>> orderExpr = query => query.OrderByDescending(y => y.StartedOn);

            Func<IQueryable<UserAssessment>, IIncludableQueryable<UserAssessment, object>> include = source => source.Include(a1 => a1.Assessment);

            var items = await userAssRepo.GetListAsync(whereExpr,
                orderExpr,
                include,
                vm.PageNo - 1,
                vm.PageSize,
                true);

            var mR = _mapper.Map<Paginate<UserAssessment>, Paginate<UserAssessmentListingModel>>(items);
            return mR;
        }

        public async Task<GenericResult<T>> Add<T>(AddUserAssessmentViewModel vm)
        {
            var r = new GenericResult<T>();

            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessment>();

            var existingCount = await assRepo.CountAsync(x => x.AssessmentID == vm.AssessmentID && x.UserID == vm.UserID);
            if (existingCount > 0)
            {
                r.Status = EnumStatusCode.NotUnique;
                r.Message = "Assessment already created for this user";
                return r;
            }

            var newAss = _mapper.Map<UserAssessment>(vm);
            newAss.KeyID = Guid.NewGuid();
            newAss.StartedOn = DateTime.UtcNow;

            await assRepo.AddAsync(newAss);
            await _unitOfWork.SaveChangesAsync();

            r.Status = EnumStatusCode.Ok;
            r.KeyID = newAss.ID.ConvertIntToTypeValue<T>();

            return r;
        }

        public async Task<GenericResult<T>> Update<T>(UpdateUserAssessmentViewModel vm)
        {
            var r = new GenericResult<T>();

            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessment>();

            var existing = await assRepo.SingleAsync(x => x.ID == vm.ID);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The user assessment could not be found";
                return r;
            }

            try
            {
                _mapper.Map(vm, existing);

                assRepo.UpdateAsync(existing);

                await _unitOfWork.SaveChangesAsync();

                r.Status = EnumStatusCode.Ok;
                r.KeyID = existing.ID.ConvertIntToTypeValue<T>();
            }
            catch (Exception ex)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }

            return r;
        }

        public async Task<GenericResult<T>> Submit<T>(SubmitUserAssessmentViewModel vm, InvigilatorViewModel userModel)
        {
            var r = new GenericResult<T>();

            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessment>();

            var existing = await assRepo.SingleAsync(
                x => x.ID == vm.UserAssessmentID
            );

            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The user assessment could not be found";
                return r;
            }

            //try
            //{
                existing.SubmittedOn = DateTime.UtcNow;

                assRepo.UpdateAsync(existing);

                await _unitOfWork.SaveChangesAsync();

                r.Status = EnumStatusCode.Ok;
                r.KeyID = existing.ID.ConvertIntToTypeValue<T>();

                // Email settings
                var emailConfigSection = _configuration.GetSection("EmailConfigModel");
                var emailConfig = emailConfigSection.Get<EmailConfigModel>();

                if (emailConfig == null)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = "Email settings missing";
                    return r;
                }

                // Send email to exam officers
                var emailConfigModel = new EmailConfigModel
                {
                    SiteName = emailConfig.SiteName,
                    SiteUrl = emailConfig.SiteUrl,
                    SenderEmailAddress = emailConfig.SenderEmailAddress,
                    SupportRcptEmailAddress = emailConfig.SupportRcptEmailAddress,
                    DebugMode = emailConfig.DebugMode
                };

                var examOfficerFilter = new UserSearchModel {
                    CentreID = userModel.CentreID,
                    PageNo = 1,
                    PageSize = 10,
                    Role = ""
                };
                var examOfficers = await _userSearchService.GetUserSearch<UserListingModel>(examOfficerFilter, EnumRoleType.ExamOfficer);
                var Recipients = examOfficers.Items.Select(y => y.Email).ToArray();

                var assessmentRepo = _unitOfWork.GetRepositoryAsync<Assessment>();
                var assessment = await assessmentRepo.SingleAsync(x => x.ID == existing.AssessmentID);

                var verifyLink = string.Format(Common.SystemConstants.ViewAssessmentCertificate, vm.UserAssessmentID, userModel.Id);
                var userRole = _userService.GetUserRoles(userModel.Id).Result.First().ToString();
                var role = userRole == "ExamInvigilator" ? "Invigilator" : userRole == "SLT" ? "SLT/Line manager" : "Exam Officer";
                var emailParams = new EmailParam[] {
                            new EmailParam("[USER_TYPE]", /*get user type here*/ role),
                            new EmailParam("[INVIGILATOR_NAME]", $"{userModel.FirstName} {userModel.Surname}"),
                            new EmailParam("[ASSESSMENT_NAME]", assessment.Title),
                            new EmailParam("[VIEW_ASSESSMENT_LINK]", $"{emailConfigModel.SiteUrl}{verifyLink}"),
                            new EmailParam("[SUBMITTED_ON]", existing.SubmittedOn.Value.ToString("dd/MM/yyyy"))
                        };

                var emailResult = EmailService.SendEmail(emailConfigModel,
                                    Recipients,
                                    new string[] { "" },
                                    EnumEmailType.AssessmentSubmitted.ToString(),
                                    EnumHelperService.GetDescription(EnumEmailType.AssessmentSubmitted),
                                    null,
                                    emailParams);

                if (!emailResult)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = "An error occurred sending the assessment submission email";
                    return r;
                }

            //}
            //catch (Exception ex)
            //{
            //    r.Status = EnumStatusCode.UnexpectedError;
            //    r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            //}
            
            return r;
        }
    }
}
