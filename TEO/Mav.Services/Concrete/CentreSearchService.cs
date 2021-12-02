using AutoMapper;
using Mav.Common.Extensions;
using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Data.Repositories;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using Mav.Services.Identity.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Mav.Services.Concrete
{
    public class CentreSearchService : ICentreSearchService
    {
        private readonly IUnitOfWork UnitOfWork;
        private readonly IUserService UserService;
        private readonly IUserSearchService UserSearchService;

        private readonly IConfiguration Configuration;
        private readonly IMapper Mapper;

        public CentreSearchService(
            IConfiguration configuration,
            IMapper mapper,
            IUnitOfWork unitOfWork,
            IUserService userService,
            IUserSearchService userSearchService
        ) {
            Configuration = configuration;
            Mapper = mapper;
            UnitOfWork = unitOfWork;
            UserService = userService;
            UserSearchService = userSearchService;
        }

        public async Task<IPaginate<T>> GetCentreSearch<T>(CentreSearchModel vm)
        {
            // Perform user search
            var centreRepo = UnitOfWork.GetRepositoryAsync<Centre>();
            vm.SearchTerm = vm.SearchTerm?.ToLower() ?? "";

            Expression<Func<Centre, bool>> whereExpr = x => (x.Deleted == null || x.Deleted == false)
                    && ((vm.SearchTerm == "") || (
                        (vm.SearchField.Equals("Name") && x.Name.ToLower().Contains(vm.SearchTerm))
                        ||
                        (vm.SearchField.Equals("Number") && x.Number.ToLower().Contains(vm.SearchTerm))
                   ))
            ;

            Func<IQueryable<Centre>, IOrderedQueryable<Centre>> orderExpr = query => query.OrderBy(y => y.Name);
            if (vm.OrderId == 2)
            {
                orderExpr = query => query.OrderByDescending(y => y.CreatedOn);
            }
            if (vm.OrderId == 3)
            {
                orderExpr = query => query.OrderBy(y => y.CreatedOn);
            }

            Func<IQueryable<Centre>, IIncludableQueryable<Centre, object>> include = null;

            // vm.PageNo.GetPagingIndex(vm.PageSize), 
            var items = await centreRepo.GetListAsync(whereExpr,
                orderExpr,
                include,
                vm.PageNo - 1,
                vm.PageSize,
                true);

            var mR = Mapper.Map<Paginate<Centre>, Paginate<T>>(items);
            var userCentreRepo = UnitOfWork.GetRepositoryAsync<UserCentre>();

            if (typeof(T) == typeof(CentreListingModel))
            {
                foreach (var item in mR.Items as IList<CentreListingModel>)
                {
                    // Get Officer Details
                    var userDetails = await UserService.GetUserById<UserViewModel>(item.CreatedBy);
                    if (userDetails != null)
                    {
                        item.OfficerName = $"{userDetails.FirstName} {userDetails.Surname}";
                        item.OfficerEmail = userDetails.Email;
                    }

                    // Get Count of Invigilators
                    item.Invigilators = await UserSearchService.CountCentreUsers(item.ID, EnumRoleType.ExamInvigilator.ToString());
                }
            }            

            return mR;
        }

        public async Task<IEnumerable<CentreListingModel>> GetCentres()
        {
            // Perform user search
            var centreRepo = UnitOfWork.GetRepositoryAsync<Centre>();

            var r = await centreRepo.GetAsync(
                predicate: x => x.Deleted == null || x.Deleted == false);

            var mR = Mapper.Map<IEnumerable<CentreListingModel>>(r);

            return mR;
        }

        public async Task<IEnumerable<CentreListingModel>> GetCentresEnum(CentreSearchModel vm)
        {
            // Perform user search
            var centreRepo = UnitOfWork.GetRepositoryAsync<Centre>();
            vm.SearchTerm = vm.SearchTerm?.ToLower() ?? "";

            Expression<Func<Centre, bool>> whereExpr = x => (x.Deleted == null || x.Deleted == false)
                    && ((vm.SearchTerm == "") || (
                        (vm.SearchField.Equals("Name") && x.Name.ToLower().Contains(vm.SearchTerm))
                        ||
                        (vm.SearchField.Equals("Number") && x.Number.ToLower().Contains(vm.SearchTerm))
                   ))
            ;

            Func<IQueryable<Centre>, IOrderedQueryable<Centre>> orderExpr = query => query.OrderBy(y => y.Name);
            if (vm.OrderId == 2)
            {
                orderExpr = query => query.OrderByDescending(y => y.CreatedOn);
            }
            if (vm.OrderId == 3)
            {
                orderExpr = query => query.OrderBy(y => y.CreatedOn);
            }

            Func<IQueryable<Centre>, IIncludableQueryable<Centre, object>> include = null;

            var items = await centreRepo.GetAsync(whereExpr,
                orderExpr,
                include,
                true);

            return Mapper.Map<IEnumerable<CentreListingModel>>(items);
        }

        public async Task<CentreListingModel> GetCentreSearchByUserId(string userId)
        {
            var userCentreRepo = UnitOfWork.GetRepositoryAsync<UserCentre>();
            var r = await userCentreRepo.SingleAsync(
                predicate: x => x.UserID == userId,
                include: source => source
                    .Include(c1 => c1.Centre)
            );
            if (r == null) { return null; }
            var mR = Mapper.Map<CentreListingModel>(r.Centre);

            // Get Officer details
            var userDetails = await UserService.GetUserById<UserViewModel>(mR.CreatedBy);
            if (userDetails != null)
            {
                mR.OfficerName = $"{userDetails.FirstName} {userDetails.Surname}";
                mR.OfficerEmail = userDetails.Email;
            }

            return mR;
        }

        public async Task<GenericResult<T>> UpdateCentreContact<T>(UpdateCentreContactViewModel vm)
        {
            var r = new GenericResult<T>();
            var repo = UnitOfWork.GetRepositoryAsync<Centre>();

            var existing = await repo.SingleAsync(x => x.ID == vm.CentreId);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The centre could not be found";
                return r;
            }

            try
            {
                existing.CreatedBy = vm.NewContact;
                repo.UpdateAsync(existing);
                await UnitOfWork.SaveChangesAsync();
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
    }
}
