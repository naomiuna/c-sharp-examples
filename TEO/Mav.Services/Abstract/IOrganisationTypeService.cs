using Mav.Common.Models;
using Mav.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface IOrganisationTypeService
    {
        Task<T> GetById<T>(int id);

        Task<List<T>> GetList<T>();

        Task<GenericResult<T>> Create<T>(OrganisationTypeViewModel m);

        Task<GenericResult<T>> Update<T>(OrganisationTypeViewModel m);

        Task<GenericResult<T>> Delete<T>(int id);
    }
}
