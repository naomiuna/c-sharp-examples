using AutoMapper;
using Mav.Common.Extensions;
using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Data.Repositories;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Mav.Services.Concrete
{
    public class OrganisationService : IOrganisationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IIdentityUnitOfWork _identityUnitOfWork;
        private readonly IMapper _mapper;
        private readonly IOrganisationTypeService OrganisationTypeService;

        public OrganisationService(IUnitOfWork unitOfWork, IMapper mapper, IIdentityUnitOfWork identityUnitOfWork, IOrganisationTypeService organisationTypeService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _identityUnitOfWork = identityUnitOfWork;
            OrganisationTypeService = organisationTypeService;
        }

        //GetOrganisationById
        public async Task<T> GetOrganisationById<T>(int id)
        {
            var orgRepo = _unitOfWork.GetRepositoryAsync<Organisation>();
            var r = await orgRepo.SingleAsync(
                predicate: x => x.ID == id && x.Deleted != true,
                include: source => source.Include(c => c.Licence).Include(i => i.OrganisationType)
            );
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        //Get all licences and maps them to the OrganisationListingModel
        public async Task<IPaginate<OrganisationListingModel>> GetAllOrganisations(OrganisationSearchModel vm)
        {
            var orgRepo = _unitOfWork.GetRepositoryAsync<Organisation>();
            vm.SearchTerm = vm.SearchTerm?.ToLower() ?? "";

            Expression<Func<Organisation, bool>> whereExpr = x => (x.Deleted == null || x.Deleted == false)
                && ((vm.SearchTerm == "") || (vm.SearchField.Equals("OrganisationName") && x.OrganisationName.ToLower().Contains(vm.SearchTerm)));


            if (vm.FilterID == 0)
            {
                whereExpr = x => (x.Deleted == null || x.Deleted == false)
                && ((vm.SearchTerm == "") || (vm.SearchField.Equals("OrganisationName") && x.OrganisationName.ToLower().Contains(vm.SearchTerm)));
            }

            Func<IQueryable<Organisation>, IOrderedQueryable<Organisation>> orderExpr = query => query.OrderBy(y => y.OrganisationName);
            if (vm.OrderID == 1)
            {
                orderExpr = query => query.OrderBy(y => y.OrganisationName);
            }

            Func<IQueryable<Organisation>, IIncludableQueryable<Organisation, object>> include = query => query.Include(x => x.Licence);

            var items = await orgRepo.GetListAsync(whereExpr,
                orderExpr,
                include,
                vm.PageNo - 1,
                vm.PageSize,
                true);

            var mR = _mapper.Map<Paginate<Organisation>, Paginate<OrganisationListingModel>>(items);

            return mR;
        }

        //CreateOrganisation
        public async Task<GenericResult<T>> AddOrganisation<T>(AddOrganisationViewModel m)
        {
            var r = new GenericResult<T>();

            var organisationRepo = _unitOfWork.GetRepositoryAsync<Organisation>();

            try
            {
                var newOrg = _mapper.Map<Organisation>(m);
                // Get the relevant organisation type using the type id
                //newOrg.OrganisationType = await OrganisationTypeService.GetById<OrganisationType>(newOrg.TypeID);

                await organisationRepo.AddAsync(newOrg);

                await _unitOfWork.SaveChangesAsync();
                r.Status = EnumStatusCode.Ok;
                r.KeyID = newOrg.ID.ConvertIntToTypeValue<T>();

            }
            catch (Exception ex)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }

            return r;
        }

        //Update
        public async Task<GenericResult<T>> Update<T>(UpdateOrganisationViewModel m)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<Organisation>();

            var existing = await repo.SingleAsync(x => x.ID == m.ID);
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

        //Delete
        public async Task<GenericResult<T>> Delete<T>(int id)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<Organisation>();

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
    }
}
