using AutoMapper;
using Mav.Common.Extensions;
using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Data.Repositories;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Mav.Common;
using Mav.Services.Identity.Services;

namespace Mav.Services.Concrete
{
    public class CentreService : ICentreService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        private readonly ISettingsService SettingsService;
        private readonly IUserSearchService UserSearchService;
        private readonly IUserService UserService;

        public CentreService(
            IUnitOfWork unitOfWork, 
            IMapper mapper, 
            ISettingsService settingsService,
            IUserSearchService userSearchService,
            IUserService userService
        ) {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            SettingsService = settingsService;
            UserSearchService = userSearchService;
            UserService = userService;
        }

        public async Task<CentreViewModel> GetCentreByIdAsync(int id)
        {
            var centreRepo = _unitOfWork.GetRepositoryAsync<Centre>();
            var r = await centreRepo.SingleAsync(x => x.ID == id);
            var mR = _mapper.Map<CentreViewModel>(r);
            return mR;
        }

        public async Task<CentreViewModel> GetCentreByUserIdAsync(string id)
        {
            var userCentreRepo = _unitOfWork.GetRepositoryAsync<UserCentre>();
            var r = await userCentreRepo.SingleAsync(
                predicate: x => x.UserID == id, 
                include: source => source
                    .Include(c1 => c1.Centre)
            );
            if (r == null) { return null; }
            var mR = _mapper.Map<CentreViewModel>(r.Centre);
            return mR;
        }

        public async Task<CentreTotalsViewModel> GetCentreInvigilatorTotals(int id)
        {
            var globalMax = await SettingsService.GetSettingByName<SettingViewModel>(SystemConstants.SettingMaxCentreInvigilators);

            var centreRepo = _unitOfWork.GetRepositoryAsync<Centre>();
            var r = await centreRepo.SingleAsync(
                predicate: x => x.ID == id,
                include: source => source.Include(ct => ct.CentreType)
            );
            var mR = _mapper.Map<CentreTotalsViewModel>(r);

            mR.MaxAllowed = r.CentreType.MaxInvigilators.HasValue && r.CentreType.MaxInvigilators > 0 
                                ? r.CentreType.MaxInvigilators ?? Convert.ToInt32(globalMax.Entry)
                                : Convert.ToInt32(globalMax.Entry);

            mR.CurrentTotal = await UserSearchService.CountCentreUsers(id, EnumRoleType.ExamInvigilator.ToString());

            return mR;
        }

        public async Task<CentreTotalsViewModel> GetCentreSLTTotals(int id)
        {
           // var globalMax = await SettingsService.GetSettingByName<SettingViewModel>(SystemConstants.SettingMaxCentreInvigilators);

            var centreRepo = _unitOfWork.GetRepositoryAsync<Centre>();
            var r = await centreRepo.SingleAsync(
                predicate: x => x.ID == id,
                include: source => source.Include(ct => ct.CentreType)
            );
            var mR = _mapper.Map<CentreTotalsViewModel>(r);

            //mR.MaxAllowed = r.CentreType.MaxInvigilators.HasValue && r.CentreType.MaxInvigilators > 0
                              //  ? r.CentreType.MaxInvigilators ?? Convert.ToInt32(globalMax.Entry)
                               // : Convert.ToInt32(globalMax.Entry);

            mR.CurrentTotal = await UserSearchService.CountCentreUsers(id, EnumRoleType.SLT.ToString());

            return mR;
        }

        public async Task<GenericResult<bool>> IsCentreActive(int id)
        {
            var r = new GenericResult<bool>();

            var centreRepo = _unitOfWork.GetRepositoryAsync<Centre>();
            var centre = await centreRepo.SingleAsync(x => x.ID == id);

            if (centre == null)
            {
                r.KeyID = false;
                r.Status = EnumStatusCode.NotFound;
                return r;
            }

            if (centre.Deleted == true)
            {
                r.KeyID = false;
                r.Status = EnumStatusCode.Deleted;
                return r;
            }

            if (centre.Enabled == false)
            {
                r.KeyID = false;
                r.Status = EnumStatusCode.Disabled;
                return r;
            }

            r.Status = EnumStatusCode.Ok;
            return r;
        }

        public async Task<GenericResult<bool>> IsCentreActiveByUserId(string id)
        {
            var r = new GenericResult<bool>();

            var userCentreRepo = _unitOfWork.GetRepositoryAsync<UserCentre>();
            var centreLookup = await userCentreRepo.SingleAsync(
                predicate: x => x.UserID == id,
                include: source => source
                    .Include(c1 => c1.Centre)
            );

            if (centreLookup == null || centreLookup.Centre == null)
            {
                r.KeyID = false;
                r.Status = EnumStatusCode.NotFound;
                return r;
            }

            if (centreLookup.Centre.Deleted == true)
            {
                r.KeyID = false;
                r.Status = EnumStatusCode.Deleted;
                return r;
            }

            if (centreLookup.Centre.Enabled == false)
            {
                r.KeyID = false;
                r.Status = EnumStatusCode.Disabled;
                return r;
            }

            r.Status = EnumStatusCode.Ok;
            return r;
        }

        public async Task<UserCentre> AddCentreAsync(AddCentreViewModel m)
        {
            var userCentreRepo = _unitOfWork.GetRepositoryAsync<UserCentre>();

            var newItem = new UserCentre {
                UserID = m.UserID,
                Centre  = _mapper.Map<Centre>(m)
            };
            newItem.Centre.CreatedOn = DateTime.UtcNow;
            newItem.Centre.Deleted = false;

            await userCentreRepo.AddAsync(newItem);

            await _unitOfWork.SaveChangesAsync();
            return newItem;
        }

        public async Task<GenericResult<T>> AddUserCentreAsync<T>(AddUserCentreViewModel m)
        {
            var userCentreRepo = _unitOfWork.GetRepositoryAsync<UserCentre>();

            var newItem = new UserCentre
            {
                UserID = m.UserID,
                CentreID = m.CentreID
            };
            await userCentreRepo.AddAsync(newItem);

            await _unitOfWork.SaveChangesAsync();
            return new GenericResult<T> {
                KeyID = newItem.ID.ConvertIntToTypeValue<T>(),
                Status = EnumStatusCode.Ok
            };
        }

        public async Task<GenericResult<T>> UpdateCentreAsync<T>(UpdateCentreViewModel m)
        {
            var r = new GenericResult<T>();

            var centreRepo = _unitOfWork.GetRepositoryAsync<Centre>();

            var centre = await centreRepo.SingleAsync(x => x.ID == m.ID);
            if (centre == null) {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The centre could not be found";
                return r;
            }

            try
            {
                _mapper.Map(m, centre);
                centreRepo.UpdateAsync(centre);

                await _unitOfWork.SaveChangesAsync();

                r.Status = EnumStatusCode.Ok;
                r.KeyID = centre.ID.ConvertIntToTypeValue<T>();
            }
            catch (Exception ex)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }

            return r;
        }

        public async Task<GenericResult<T>> Delete<T>(int id)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<Centre>();
            var userCentreRepo = _unitOfWork.GetRepositoryAsync<UserCentre>();

            var existing = await repo.SingleAsync(x => x.ID == id);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The centre could not be found";
                return r;
            }
            
            try
            {
                // Mark all linked users as deleted
                var linkedUsers = await userCentreRepo.GetAsync(x => x.CentreID == id);
                foreach (var user in linkedUsers)
                {
                    var deleted = await UserService.DeleteUser<string>(user.UserID);
                }

                // Mark centre as deleted
                existing.Enabled = false;
                existing.Deleted = true;

                // Update centre name and number with a deleted timestamp
                existing.Name = existing.Name + "D" + DateTime.UtcNow.ToShortDateString();
                existing.Number = existing.Number + "D" + DateTime.UtcNow.ToShortDateString();

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

        public async Task<GenericResult<int>> GetUserCentreAsync(string userId)
        {
            var userCentreRepo = _unitOfWork.GetRepositoryAsync<UserCentre>();

            var r = await userCentreRepo.SingleAsync(x => x.UserID.Equals(userId));

            if (r == null) { return new GenericResult<int> { KeyID = 0, Status = EnumStatusCode.NotFound }; }

            return new GenericResult<int> { KeyID = r.CentreID, Status = EnumStatusCode.Ok };
        }

        public async Task<List<string>> GetCentreUsers(int id)
        {
            var userCentreRepo = _unitOfWork.GetRepositoryAsync<UserCentre>();

            var r = await userCentreRepo.GetAsync(x => x.CentreID == id);
            return r.Select(x => x.UserID).ToList();
        }

        public async Task<List<CentrePolicyViewModel>> GetUserCentres()
        {
            var userCentreRepo = _unitOfWork.GetRepositoryAsync<UserCentre>();

            var userCentres = await userCentreRepo.GetAsync(null);

            var userNames = new List<ExamUserViewModel>();

            foreach (var user in userCentres)
            {
                userNames.Add(await UserService.GetExamUserById(user.UserID));
            }

            var mR = _mapper.Map<IEnumerable<CentrePolicyViewModel>>(userCentres);

            foreach (var user in mR)
            {
                foreach (var name in userNames)
                {
                    if (user.UserID == name.Id)
                    {
                        user.UserName = name.Email;
                    }
                }
            }

            return mR.ToList();
        }

        public async Task<CentreViewModel> GetCentreByName(string centreName)
        {
            var centreRepo = _unitOfWork.GetRepositoryAsync<Centre>();
            centreName = centreName?.ToLower() ?? "";
            var centre = await centreRepo.SingleAsync(x => x.Name.ToLower() == centreName);
            var mR = _mapper.Map<CentreViewModel>(centre);
            return mR;
        }

        public async Task<CentreViewModel> GetCentreByNumber(string centreNumber)
        {
            var centreRepo = _unitOfWork.GetRepositoryAsync<Centre>();
            centreNumber = centreNumber?.ToLower() ?? "";
            var centre = await centreRepo.SingleAsync(x => x.Number.ToLower() == centreNumber);
            var mR = _mapper.Map<CentreViewModel>(centre);
            return mR;
        }
    }
}
