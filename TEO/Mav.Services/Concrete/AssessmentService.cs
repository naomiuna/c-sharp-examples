using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using AutoMapper;
using Mav.Common.Extensions;
using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Data.Repositories;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using Mav.Services.Identity.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace Mav.Services.Concrete
{
    public class AssessmentService : IAssessmentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IIdentityUnitOfWork _identityUnitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public AssessmentService(IUnitOfWork unitOfWork, IMapper mapper, IIdentityUnitOfWork identityUnitOfWork, IUserService userService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _identityUnitOfWork = identityUnitOfWork;
            _userService = userService;
        }

        // GetAssessmentById
        public async Task<T> GetAssessmentById<T>(int id)
        {
            var assRepo = _unitOfWork.GetRepositoryAsync<Assessment>();
            var r = await assRepo.SingleAsync(
                predicate: x => x.ID == id && x.Deleted != true || x.Deleted == null,
                include: source => source.Include(x => x.AssessmentGrade)
            );
            r.Role = await _unitOfWork.GetRepositoryAsync<RoleAssessment>().SingleAsync(predicate: x => x.AssessmentId == r.ID);
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        // GetAssessmentList
        /// <summary>
        /// StatusID of 0 = all, StatusID of 1 = Published only, StatusID of 2 = Unpublished only
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="vm"></param>
        /// <returns></returns>
        public async Task<IPaginate<AssessmentListingModel>> GetAllAssessments(AssessmentSearchModel vm)
        {
            var assRepo = _unitOfWork.GetRepositoryAsync<Assessment>();
            vm.SearchTerm = vm.SearchTerm?.ToLower() ?? "";

            Expression<Func<Assessment, bool>> whereExpr = x => (x.Deleted == null || x.Deleted == false)
                    && ((!vm.YearID.HasValue || vm.YearID == 0) || (x.YearID == vm.YearID))
                    && ((!vm.StatusID.HasValue || vm.StatusID == 0) 
                            || (vm.StatusID == 1 && x.Published == true) 
                            || (vm.StatusID == 2 && x.Published == false)
                       )
                    && ((vm.SearchTerm == "") || (vm.SearchField.Equals("Title") && x.Title.ToLower().Contains(vm.SearchTerm)))
                    
            ;

            Func<IQueryable<Assessment>, IOrderedQueryable<Assessment>> orderExpr = query => query.OrderByDescending(y => y.CreatedOn);
            if (vm.OrderID == 2)
            {
                orderExpr = query => query.OrderByDescending(y => y.CreatedOn);
            }
            if (vm.OrderID == 3)
            {
                orderExpr = query => query.OrderBy(y => y.CreatedOn);
            }
            if(vm.OrderID == 4)
            {
                orderExpr = query => query.OrderBy(y => y.Title);
            }

            Func<IQueryable<Assessment>, IIncludableQueryable<Assessment, object>> include = source => source.Include(x => x.Role);

            var items = await assRepo.GetListAsync(whereExpr,
                orderExpr,
                include,
                vm.PageNo - 1,
                vm.PageSize,
                true);

            var mR = _mapper.Map<Paginate<Assessment>, Paginate<AssessmentListingModel>>(items);

            // Assign the target user group
            foreach(var item in mR.Items)
            {
                item.TargetGroup = await _userService.GetRoleNameByRole(item.TargetGroup);
            }

            return mR;
        }

        public async Task<IEnumerable<T>> GetAllAssessmentsEnum<T>(AssessmentSearchModel vm)
        {
            var assRepo = _unitOfWork.GetRepositoryAsync<Assessment>();
            vm.SearchTerm = vm.SearchTerm?.ToLower() ?? "";

            Expression<Func<Assessment, bool>> whereExpr = x => (x.Deleted == null || x.Deleted == false)
                    && ((!vm.YearID.HasValue || vm.YearID == 0) || (x.YearID == vm.YearID))
                    && ((!vm.StatusID.HasValue || vm.StatusID == 0)
                            || (vm.StatusID == 1 && x.Published == true)
                            || (vm.StatusID == 2 && x.Published == false)
                       )
                    && ((vm.SearchTerm == "") || (vm.SearchField.Equals("Title") && x.Title.ToLower().Contains(vm.SearchTerm)))

            ;

            Func<IQueryable<Assessment>, IOrderedQueryable<Assessment>> orderExpr = query => query.OrderByDescending(y => y.CreatedOn);
            if (vm.OrderID == 2)
            {
                orderExpr = query => query.OrderByDescending(y => y.CreatedOn);
            }
            if (vm.OrderID == 3)
            {
                orderExpr = query => query.OrderBy(y => y.CreatedOn);
            }
            if (vm.OrderID == 4)
            {
                orderExpr = query => query.OrderBy(y => y.Title);
            }

            Func<IQueryable<Assessment>, IIncludableQueryable<Assessment, object>> include = null;

            var items = await assRepo.GetAsync(whereExpr,
                orderExpr,
                include,
                true);

            var mR = _mapper.Map<IEnumerable<T>>(items);
            return mR;
        }

        // CreateAssessment
        public async Task<GenericResult<T>> AddAssessment<T>(AddAssessmentViewModel m)
        {
            var r = new GenericResult<T>();

            var assessmentRepo = _unitOfWork.GetRepositoryAsync<Assessment>();
            var roleassRepo = _unitOfWork.GetRepositoryAsync<RoleAssessment>();

            try
            {
                var newAss = _mapper.Map<Assessment>(m);
                newAss.CreatedOn = DateTime.UtcNow;

                await assessmentRepo.AddAsync(newAss);                
                var newRoleLink = new RoleAssessment
                {
                    AssessmentId = newAss.ID,
                    RoleId = m.RoleID
                };
                await roleassRepo.AddAsync(newRoleLink);
                await _unitOfWork.SaveChangesAsync();
                r.Status = EnumStatusCode.Ok;
                r.KeyID = newAss.ID.ConvertIntToTypeValue<T>();
               
            }
            catch (Exception ex)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }
            //TODO - not sure if here or somewhere else - add an entry to a table linking the assessment with the role (look up table? - Not made yet)
            return r;
        }

        // Adding assessment as an EO Qualification
        public async Task<GenericResult<T>> AddAssessment<T>(AddAssessmentEoViewModel m)
        {
            var r = new GenericResult<T>();

            var assessmentRepo = _unitOfWork.GetRepositoryAsync<Assessment>();
            var roleassRepo = _unitOfWork.GetRepositoryAsync<RoleAssessment>();
            var assGradeRepo = _unitOfWork.GetRepositoryAsync<AssessmentGrade>();

            try
            {
                var newAss = _mapper.Map<Assessment>(m);
                newAss.CreatedOn = DateTime.UtcNow;
                newAss.MinScore = m.PassScore;

                // Mark this assessment as an EO Qualification
                newAss.EoQualification = true;

                newAss.AssessmentGrade = new AssessmentGrade
                {
                    PassScore = m.PassScore,
                    MeritScore = m.MeritScore,
                    DistinctionScore = m.DistinctionScore
                };

                await assessmentRepo.AddAsync(newAss);
                var newRoleLink = new RoleAssessment
                {
                    AssessmentId = newAss.ID,
                    RoleId = m.RoleID
                };

                
                await roleassRepo.AddAsync(newRoleLink);
                await _unitOfWork.SaveChangesAsync();

                r.Status = EnumStatusCode.Ok;
                r.KeyID = newAss.ID.ConvertIntToTypeValue<T>();

            }
            catch (Exception ex)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }
            //TODO - not sure if here or somewhere else - add an entry to a table linking the assessment with the role (look up table? - Not made yet)
            return r;
        }

        // UpdateAssessment
        public async Task<GenericResult<T>> Update<T>(UpdateAssessmentViewModel m)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<Assessment>();
            var roleassRepo = _unitOfWork.GetRepositoryAsync<RoleAssessment>();

            var existing = await repo.SingleAsync(predicate: x => x.ID == m.ID, include: source => source.Include(y => y.AssessmentGrade));
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The assessment could not be found";
                return r;
            }

            try
            {
                _mapper.Map(m, existing);

                repo.UpdateAsync(existing);

                var currLink = await roleassRepo.SingleAsync(x => x.AssessmentId == m.ID);
                if (currLink == null)
                {

                    var newRoleLink = new RoleAssessment
                    {
                        AssessmentId = existing.ID,
                        RoleId = m.RoleID
                    };
                    await roleassRepo.AddAsync(newRoleLink);
                }
                else
                {
                    currLink.RoleId = m.RoleID;
                    roleassRepo.UpdateAsync(currLink);
                }
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

        // ActivateAssessment


        // DeleteAssessment
        public async Task<GenericResult<T>> Delete<T>(int id)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<Assessment>();

            var existing = await repo.SingleAsync(x => x.ID == id);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The assessment could not be found";
                return r;
            }

            try
            {
                existing.Deleted = true;
                repo.UpdateAsync(existing);

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

        public async Task<List<T>> GetAssessmentRoles<T>()
        {
            var repo = _identityUnitOfWork.GetRepositoryAsync<IdentityRole>();
            var r = await repo.GetAsync(x => x.Name != "");
            var mR = _mapper.Map<List<T>>(r);
            return mR;
        }

        public async Task<bool> IsEOQualification(int id)
        {
            var assRepo = _unitOfWork.GetRepositoryAsync<Assessment>();
            var r = await assRepo.SingleAsync(
                predicate: x => x.ID == id && x.Deleted != true || x.Deleted == null,
                include: source => source.Include(x => x.AssessmentGrade)
            );

            return r.EoQualification;
        }


        // Duplicate Assessment
        /// <summary>
        /// Gets the assessment of AssessmentID and adds a new entry with matching details
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="vm"></param>
        /// <returns></returns>
        public async Task<GenericResult<T>> DuplicateAssessment<T>(DuplicateAssessmentViewModel vm)
        {
            var r = new GenericResult<T>();

            var assRepo = _unitOfWork.GetRepositoryAsync<Assessment>();

            // Get the entire assessment
            var existingAssessment = await assRepo.SingleAsync(
                predicate: x => x.ID == vm.AssessmentID,
                include: source => source
                .Include(x => x.Role)
                .Include(x => x.AssessmentGrade)
                .Include(x => x.Statement).ThenInclude(x2 => x2.Questions)
                .Include(x => x.Sections).ThenInclude(x2 => x2.Timer)
                .Include(x => x.Sections).ThenInclude(x2 => x2.QuestionGroups)
                .Include(x => x.Sections).ThenInclude(x2 => x2.Questions).ThenInclude(x3 => x3.Answers)
                .Include(x => x.Sections).ThenInclude(x2 => x2.Statement).ThenInclude(x3 => x3.Questions)
                );

            // get the assessment
            // get the section
            // get the attached things

            if (existingAssessment == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The assessment could not be found";
                return r;
            }

            try
            {
                // Add assessment
                Assessment duplicated = new Assessment();
                duplicated = existingAssessment;

                #region Setting IDs to 0 to avoid identiy contraints
                // Set all IDs to zero as auto incremnt is enabled for all database entities
                duplicated.ID = 0;
                // Role
                if (duplicated.Role != null)
                {
                    duplicated.Role.Id = 0;
                }
                // Assessment grade
                if (duplicated.AssessmentGrade != null)
                {
                    duplicated.AssessmentGrade.ID = 0;
                }
                // Assessment Statement and statmen questions
                if (duplicated.Statement != null)
                {
                    duplicated.Statement.ID = 0;
                    if (duplicated.Statement.Questions != null)
                    {
                        foreach (var statementQ in duplicated.Statement.Questions)
                        {
                            statementQ.ID = 0;
                        }
                    }
                }

                if (duplicated.Sections != null)
                {
                    foreach (var section in duplicated.Sections)
                    {
                        section.ID = 0;

                        if (section.Timer != null)
                        {
                            section.Timer.ID = 0;
                        }

                        // Question groups
                        if (section.QuestionGroups != null)
                        {
                            foreach (var group in section.QuestionGroups)
                            {
                                group.ID = 0;
                            }
                        }

                        // Section questions
                        if (section.Questions != null)
                        {
                            foreach (var question in section.Questions)
                            {
                                question.ID = 0;
                                // Answers
                                if (question.Answers != null)
                                {
                                    foreach (var answers in question.Answers)
                                    {
                                        answers.ID = 0;
                                    }
                                }
                            }
                        }

                        // Statements
                        if (section.Statement != null)
                        {
                            section.Statement.ID = 0;
                            // Statement questions
                            if (section.Statement.Questions != null)
                            {
                                foreach (var statementQ in section.Statement.Questions)
                                {
                                    statementQ.ID = 0;
                                }
                            }
                        }
                    }
                }
                #endregion

                // Edit the main assessment details
                duplicated.Title = vm.Title;
                duplicated.YearID = vm.YearID;
                duplicated.Role.RoleId = vm.RoleID;
                duplicated.Published = false;
                duplicated.CreatedOn = DateTime.UtcNow;

                await assRepo.AddAsync(duplicated);
                await _unitOfWork.SaveChangesAsync();

                r.Status = EnumStatusCode.Ok;
                r.KeyID = duplicated.ID.ConvertIntToTypeValue<T>();
            }
            catch (Exception ex)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }
            return r;
        }
    }
}
