using Mav.Common.Models;
using Mav.Data.Repositories;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Mav.Services.Abstract
{
    public interface IOrganisationService
    {
        Task<T> GetOrganisationById<T>(int id);

        Task<IPaginate<OrganisationListingModel>> GetAllOrganisations(OrganisationSearchModel vm);

        Task<GenericResult<T>> AddOrganisation<T>(AddOrganisationViewModel m);

        Task<GenericResult<T>> Update<T>(UpdateOrganisationViewModel m);

        Task<GenericResult<T>> Delete<T>(int id);
    }
}
