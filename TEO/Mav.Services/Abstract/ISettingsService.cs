using Mav.Common.Models;
using Mav.Models.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface ISettingsService
    {
        Task<T> GetSettingById<T>(int id);

        Task<T> GetSettingByName<T>(string name);

        Task<List<T>> GetSettings<T>();

        Task<GenericResult<T>> UpdateSetting<T>(SettingViewModel m);
    }
}
