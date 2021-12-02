using Mav.Common.Models;
using Mav.Models.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface ICentreTypeService
    {
        Task<T> GetById<T>(int id);

        Task<List<T>> GetList<T>();

        Task<GenericResult<T>> Create<T>(CentreTypeViewModel m);

        Task<GenericResult<T>> Update<T>(CentreTypeViewModel m);

        Task<GenericResult<T>> Delete<T>(int id);
    }
}
