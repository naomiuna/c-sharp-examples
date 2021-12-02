using AutoMapper;
using Mav.Common.Extensions;
using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Data.Repositories;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Mav.Services.Concrete
{
    public class LicenceService : ILicenceService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IOrganisationService OrganisationService;

        public LicenceService(IUnitOfWork unitOfWork, IMapper mapper, IOrganisationService organisationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            OrganisationService = organisationService;
        }

        public async Task<T> GetLicenceById<T>(int id)
        {
            var licenceRepo = _unitOfWork.GetRepositoryAsync<Licence>();
            var r = await licenceRepo.SingleAsync(
                predicate: x => x.ID == id && x.Deleted != true
            );
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        public async Task<T> GetLicenceByOrgId<T>(int orgId)
        {
            var licenceRepo = _unitOfWork.GetRepositoryAsync<Licence>();
            var r = await licenceRepo.SingleAsync(
                predicate: x => x.OrganisationID == orgId && x.Deleted != true
            );
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        public async Task<GenericResult<T>> AddLicence<T>(AddLicenceViewModel m, bool enable)
        {
            var r = new GenericResult<T>();

            var licenceRepo = _unitOfWork.GetRepositoryAsync<Licence>();
            var orgRepo = _unitOfWork.GetRepositoryAsync<Organisation>();

            var existingOrg = await orgRepo.SingleAsync(
                predicate: x => x.ID == m.OrganisationID,
                include: source => source.Include(c => c.Licence));
            if (existingOrg.Licence != null && existingOrg.Licence.Deleted != true)
            {
                r.Status = EnumStatusCode.NotUnique;
                r.Message = "This organisation already has an active licence";
                return r;
            }

            try
            {
                var newLicence = _mapper.Map<Licence>(m);
                newLicence.Enabled = enable;

                // Add Licence
                await licenceRepo.AddAsync(newLicence);
                await _unitOfWork.SaveChangesAsync();

                // Get the licence and assign the organisations licenceID then update
                var licence = await GetLicenceByOrgId<LicenceViewModel>(existingOrg.ID);
                existingOrg.LicenceID = licence.ID;
                existingOrg.Enabled = enable;
                orgRepo.UpdateAsync(existingOrg);

                await _unitOfWork.SaveChangesAsync();

                if(enable == true)
                {
                    Console.WriteLine("SENDING EMAIL");
                }

                r.Status = EnumStatusCode.Ok;
                r.KeyID = newLicence.ID.ConvertIntToTypeValue<T>();
            }
            catch(Exception ex)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }

            return r;
        }

        // Update
        public async Task<GenericResult<T>> Update<T>(UpdateLicenceViewModel m, bool enable)
        {
            var r = new GenericResult<T>();
            var repo = _unitOfWork.GetRepositoryAsync<Licence>();

            var existing = await repo.SingleAsync(x => x.ID == m.ID);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The assessment could not be found";
                return r;
            }

            try
            {
                m.Enabled = enable;
                _mapper.Map(m, existing);
                repo.UpdateAsync(existing);

                await _unitOfWork.SaveChangesAsync();

                if (enable == true)
                {
                    Console.WriteLine("SENDING EMAIL");
                }

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

        public async Task<GenericResult<T>> Delete<T>(int id)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<Licence>();

            var existing = await repo.SingleAsync(predicate: x => x.ID == id, include: source => source.Include(x => x.Organisation));
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The licence could not be found";
                return r;
            }

            try
            {
                existing.Deleted = true;
                existing.Organisation.LicenceID = null;
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

        public async Task<GenericResult<T>> EnableAccount<T>(int orgId)
        {
            var r = new GenericResult<T>();

            var oRepo = _unitOfWork.GetRepositoryAsync<Organisation>();
            var lRepo = _unitOfWork.GetRepositoryAsync<Licence>();

            var existing = await oRepo.SingleAsync(predicate: x => x.ID == orgId);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The organisation could not be found";
                return r;
            }

            var licence = await lRepo.SingleAsync(x => x.ID == existing.LicenceID);
            if (licence == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The licence could not be found";
                return r;
            }

            try
            {
                existing.Enabled = true;
                licence.Enabled = true;
                oRepo.UpdateAsync(existing);
                lRepo.UpdateAsync(licence);

                await _unitOfWork.SaveChangesAsync();

                r.Status = EnumStatusCode.Ok;
                r.KeyID = existing.ID.ConvertIntToTypeValue<T>();

                // Send email
            }
            catch (Exception ex)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }

            return r;
        }

        public async Task<GenericResult<T>> DisableAccount<T>(int orgId)
        {
            var r = new GenericResult<T>();

            var oRepo = _unitOfWork.GetRepositoryAsync<Organisation>();
            var lRepo = _unitOfWork.GetRepositoryAsync<Licence>();

            var existing = await oRepo.SingleAsync(predicate: x => x.ID == orgId);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The organisation could not be found";
                return r;
            }

            var licence = await lRepo.SingleAsync(x => x.ID == existing.LicenceID);
            if (licence == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The organisation does not have a licence or an account";
                return r;
            }

            try
            {
                existing.Enabled = false;
                licence.Enabled = false;
                oRepo.UpdateAsync(existing);
                lRepo.UpdateAsync(licence);

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
