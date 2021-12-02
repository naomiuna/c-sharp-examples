using AutoMapper;
using Mav.Common.Extensions;
using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Data.Repositories;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Mav.Services.Concrete
{
    public class OrganisationTypeService : IOrganisationTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OrganisationTypeService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // Task<T> GetById<T>(int id);
        public async Task<T> GetById<T>(int id)
        {
            var repo = _unitOfWork.GetRepositoryAsync<OrganisationType>();
            var r = await repo.SingleAsync(x => x.ID == id);
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        // Task<List<T>> GetList<T>();
        public async Task<List<T>> GetList<T>()
        {
            var repo = _unitOfWork.GetRepositoryAsync<OrganisationType>();
            var r = await repo.GetAsync(x => x.Deleted != true);
            var mR = _mapper.Map<List<T>>(r);
            return mR;
        }

        public async Task<GenericResult<T>> Create<T>(OrganisationTypeViewModel m)
        {
            var r = new GenericResult<T>();

            // Check if username already exists
            var repo = _unitOfWork.GetRepositoryAsync<OrganisationType>();
            var existing = await repo.SingleAsync(x => x.Name.ToLower() == m.Name.ToLower());

            if (existing != null)
            {
                r.Status = EnumStatusCode.NotUnique;
                r.Message = "An organisation type already exists with that name";
            }
            else
            {
                try
                {
                    var newOrgType = new OrganisationType()
                    {
                        CentreLimit = m.CentreLimit,
                        Name = m.Name,
                        Deleted = false
                    };
                    await repo.AddAsync(newOrgType);

                    await _unitOfWork.SaveChangesAsync();

                    r.Status = EnumStatusCode.Ok;
                    r.KeyID = newOrgType.ID.ConvertIntToTypeValue<T>();
                }
                catch (Exception ex)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
                }
            }

            return r;
        }

        // Task<GenericResult<T>> Update<T>(CentreTypeViewModel m);
        public async Task<GenericResult<T>> Update<T>(OrganisationTypeViewModel m)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<OrganisationType>();

            var existing = await repo.SingleAsync(x => x.ID == m.ID);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The centre type could not be found";
                return r;
            }

            try
            {
                existing.CentreLimit = m.CentreLimit;
                existing.Name = m.Name;
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

        // Task<GenericResult<T>> Delete<T>(int id);
        public async Task<GenericResult<T>> Delete<T>(int id)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<OrganisationType>();

            var existing = await repo.SingleAsync(x => x.ID == id);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The organisation type could not be found";
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
