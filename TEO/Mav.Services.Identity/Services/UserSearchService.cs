using System;
using System.Linq;
using AutoMapper;
using Mav.Services.Identity.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Mav.Models.SearchModels;
using Mav.Data.Repositories;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Query;
using Mav.Common.Models;
using IdentityRole = Microsoft.AspNetCore.Identity.IdentityRole;
using System.Collections.Generic;
using Mav.Data.Entities;

namespace Mav.Services.Identity.Services
{
    public class UserSearchService : IUserSearchService
    {
        private readonly UserManager<ApplicationUser> UserManager;
        private readonly IIdentityUnitOfWork UnitOfWork;
        private readonly IUnitOfWork MavUnitOfWork;

        private readonly IConfiguration Configuration;
        private readonly IMapper Mapper;

        public UserSearchService(
            UserManager<ApplicationUser> userManager,
            IIdentityUnitOfWork unitOfWork,
            IUnitOfWork mavUnitOfWork,
            IConfiguration configuration,
            IMapper mapper
        )
        {
            UserManager = userManager;
            UnitOfWork = unitOfWork;
            MavUnitOfWork = mavUnitOfWork;
            Configuration = configuration;
            Mapper = mapper;
        }

        public async Task<IPaginate<T>> GetUserSearch<T>(UserSearchModel vm, EnumRoleType roleType)
        {
            // Lookup role type
            var roleRepo = UnitOfWork.GetRepositoryAsync<IdentityRole>();
            var roleTypeName = roleType.ToString();
            var roleLookup = await roleRepo.SingleAsync(x => x.Name.Equals(roleTypeName, StringComparison.OrdinalIgnoreCase));
            roleRepo = null;

            if (roleLookup == null) {
                throw new Exception($"{roleTypeName} role type missing");
            }
            
            List<string> usersFiltered = new List<string>();
            var userRoleRepo = UnitOfWork.GetRepositoryAsync<IdentityUserRole<string>>();
            var userCentreRepo = MavUnitOfWork.GetRepositoryAsync<UserCentre>();

            // Is this a Centre Search
            if (!vm.CentreID.HasValue)
            {
                // Find all userIds with the role
                usersFiltered = (await userRoleRepo.GetAsync(x => x.RoleId == roleLookup.Id)).Select(y => y.UserId).ToList();
                userCentreRepo = null;
            }
            else
            {
                // First trim users down to Centre
                var centreUserIds = (await userCentreRepo.GetAsync(x => x.CentreID == vm.CentreID)).Select(y => y.UserID).ToList();

                // Find all centreUserIds with the role
                usersFiltered = (await userRoleRepo.GetAsync(x => x.RoleId == roleLookup.Id
                                    && centreUserIds.Any(u1 => u1 == x.UserId))).Select(y => y.UserId).ToList();
                userCentreRepo = null;
            }

            // Perform user search
            var userRepo = UnitOfWork.GetRepositoryAsync<ApplicationUser>();
            vm.SearchTerm = vm.SearchTerm?.ToLower() ?? "";

            // x.EmailConfirmed == true
            Expression<Func<ApplicationUser, bool>> whereExpr = x => (x.Deleted == null || x.Deleted == false)
                && (usersFiltered.Any(r1 => r1 == x.Id))
                && ((vm.SearchTerm == "") || (
                        (vm.SearchField.Equals("Email") && x.Email.ToLower().Contains(vm.SearchTerm))
                        ||
                        (vm.SearchField.Equals("Surname") && x.Surname.ToLower().Contains(vm.SearchTerm))
                   ))
            ;

            Func<IQueryable<ApplicationUser>, IOrderedQueryable<ApplicationUser>> orderExpr = query => query.OrderBy(y => y.Surname).ThenBy(y => y.FirstName);

            Func<IQueryable<ApplicationUser>, IIncludableQueryable<ApplicationUser, object>> include = null;

            // vm.PageNo.GetPagingIndex(vm.PageSize), 
            var items = await userRepo.GetListAsync(whereExpr, 
                orderExpr, 
                include, 
                vm.PageNo - 1,
                vm.PageSize, 
                true);

            var mR = Mapper.Map<Paginate<ApplicationUser>, Paginate<T>>(items);
            return mR;
        }

        public async Task<IPaginate<T>> GetUserSearch<T>(UserSearchModel vm, List<EnumRoleType> allowableRoleTypes)
        {
            // Lookup role type
            var allowableRoleIds = new List<string>();
            var roleItems = new List<IdentityRole>();
            var roleRepo = UnitOfWork.GetRepositoryAsync<IdentityRole>();

            foreach (var role in allowableRoleTypes)
            {
                var roleTypeName = role.ToString();
                var roleLookup = await roleRepo.SingleAsync(x => x.Name.Equals(roleTypeName, StringComparison.OrdinalIgnoreCase));
                if (roleLookup != null)
                {
                    roleItems.Add(roleLookup);
                    allowableRoleIds.Add(roleLookup.Id);
                }
            }            
            roleRepo = null;

            List<string> usersFiltered = new List<string>();
            var userRoleRepo = UnitOfWork.GetRepositoryAsync<IdentityUserRole<string>>();
            var userCentreRepo = MavUnitOfWork.GetRepositoryAsync<UserCentre>();

            // Is this a Centre Search
            if (!vm.CentreID.HasValue)
            {
                // Find all userIds with the role
                usersFiltered = (await userRoleRepo.GetAsync(x => allowableRoleIds.Any(y => y == x.RoleId)))
                                    .Select(y => y.UserId).ToList();
                userCentreRepo = null;
            }
            else
            {
                // First trim users down to Centre
                var centreUserIds = (await userCentreRepo.GetAsync(x => x.CentreID == vm.CentreID)).Select(y => y.UserID).ToList();

                // Find all centreUserIds with the role
                usersFiltered = (await userRoleRepo.GetAsync(x => allowableRoleIds.Any(y => y == x.RoleId)
                                    && centreUserIds.Any(u1 => u1 == x.UserId))).Select(y => y.UserId).ToList();
                userCentreRepo = null;
            }

            // Perform user search
            var userRepo = UnitOfWork.GetRepositoryAsync<ApplicationUser>();
            vm.SearchTerm = vm.SearchTerm?.ToLower() ?? "";

            // x.EmailConfirmed == true
            Expression<Func<ApplicationUser, bool>> whereExpr = x => (x.Deleted == null || x.Deleted == false)
                && (usersFiltered.Any(r1 => r1 == x.Id))
                && ((vm.SearchTerm == "") || (
                        (vm.SearchField.Equals("Email") && x.Email.ToLower().Contains(vm.SearchTerm))
                        ||
                        (vm.SearchField.Equals("Surname") && x.Surname.ToLower().Contains(vm.SearchTerm))
                   ))
            ;

            Func<IQueryable<ApplicationUser>, IOrderedQueryable<ApplicationUser>> orderExpr = query => query.OrderBy(y => y.Surname).ThenBy(y => y.FirstName);

            Func<IQueryable<ApplicationUser>, IIncludableQueryable<ApplicationUser, object>> include = null;

            // vm.PageNo.GetPagingIndex(vm.PageSize), 
            var items = await userRepo.GetListAsync(whereExpr,
                orderExpr,
                include,
                vm.PageNo - 1,
                vm.PageSize,
                true);

            var mR = Mapper.Map<Paginate<ApplicationUser>, Paginate<T>>(items);
            
            foreach (var item in mR.Items as IList<UserListingModel>)
            {
                var role = await userRoleRepo.SingleAsync(x => x.UserId == item.Id);
                if (role != null)
                {
                    var index = roleItems.FindIndex(x => x.Id == role.RoleId);
                    if (index != -1)
                    {
                        item.Role = roleItems.ElementAt(index).Name;
                    }
                }
            }

            return mR;
        }

        public async Task<int> CountCentreUsers(int id, string role)
        {
            // Lookup role type
            var roleRepo = UnitOfWork.GetRepositoryAsync<IdentityRole>();
            var roleLookup = await roleRepo.SingleAsync(x => x.Name.Equals(role, StringComparison.OrdinalIgnoreCase));
            roleRepo = null;

            if (roleLookup == null)
            {
                throw new Exception($"{roleLookup} role type missing");
            }

            // Find all the userIds associated with the centre
            var userCentreRepo = MavUnitOfWork.GetRepositoryAsync<UserCentre>();
            var usersInCentre = (await userCentreRepo.GetAsync(x => x.CentreID == id)).Select(y => y.UserID).ToList();
            userCentreRepo = null;

            // Find all userIds with the correct role
            var userRoleRepo = UnitOfWork.GetRepositoryAsync<IdentityUserRole<string>>();
            var userIds = (await userRoleRepo.GetAsync(x => x.RoleId == roleLookup.Id 
                            && usersInCentre.Any(y => y == x.UserId)))
                            .Select(y => y.UserId).ToList();
            userRoleRepo = null;

            // Check for deleted accounts
            var userRepo = UnitOfWork.GetRepositoryAsync<ApplicationUser>();
            // var deletedOrNonVerified = await userRepo.GetAsync(x => userIds.Any(y => y == x.Id) && (x.Deleted == true || x.EmailConfirmed == false));
            // var correction = deletedOrNonVerified.Count();
            // taken off || x.EmailConfirmed == false
            var correction = await userRepo.CountAsync(x => userIds.Any(y => y == x.Id) && (x.Deleted == true));
            userRepo = null;

            var result = userIds.Count() - correction;
            return result;
        }
    }
}
