using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Data.Repositories;
using Mav.Services.Abstract;
using Mav.Common.Extensions;
using Mav.Models.ViewModels;

namespace Mav.Services.Concrete
{
    public class SettingsService : ISettingsService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public SettingsService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // GetSettingById
        public async Task<T> GetSettingById<T>(int id)
        {
            var settingRepo = _unitOfWork.GetRepositoryAsync<Setting>();
            var r = await settingRepo.SingleAsync(x => x.Id == id);
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        // GetSettingByName
        public async Task<T> GetSettingByName<T>(string name)
        {
            var settingRepo = _unitOfWork.GetRepositoryAsync<Setting>();
            var r = await settingRepo.SingleAsync(x => x.Name.Equals(name));
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        // GetSettings
        public async Task<List<T>> GetSettings<T>()
        {
            var settingRepo = _unitOfWork.GetRepositoryAsync<Setting>();
            var r = await settingRepo.GetAsync(x => x.Name != null);
            var mR = _mapper.Map<List<T>>(r);
            return mR;
        }

        // UpdateSetting
        public async Task<GenericResult<T>> UpdateSetting<T>(SettingViewModel m)
        {
            var r = new GenericResult<T>();

            var settingRepo = _unitOfWork.GetRepositoryAsync<Setting>();

            var setting = await settingRepo.SingleAsync(x => x.Id == m.Id);
            if (setting == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The settings could not be found";
                return r;
            }

            try
            {
                setting.Entry = m.Entry;
                settingRepo.UpdateAsync(setting);

                await _unitOfWork.SaveChangesAsync();

                r.Status = EnumStatusCode.Ok;
                r.KeyID = setting.Id.ConvertIntToTypeValue<T>();
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
