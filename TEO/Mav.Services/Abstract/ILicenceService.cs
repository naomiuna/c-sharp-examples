using Mav.Common.Models;
using Mav.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface ILicenceService
    {
        Task<T> GetLicenceById<T>(int id);

        Task<T> GetLicenceByOrgId<T>(int orgId);

        Task<GenericResult<T>> AddLicence<T>(AddLicenceViewModel m, bool enable);

        Task<GenericResult<T>> Update<T>(UpdateLicenceViewModel m, bool enable);

        Task<GenericResult<T>> Delete<T>(int id);

        Task<GenericResult<T>> EnableAccount<T>(int orgId);

        Task<GenericResult<T>> DisableAccount<T>(int orgId);
    }
}
