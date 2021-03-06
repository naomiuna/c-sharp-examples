using AutoMapper;
using Mav.Common.Extensions;
using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Data.Repositories;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mav.Services.Concrete
{
    public class CentreTypeService : ICentreTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CentreTypeService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // Task<T> GetById<T>(int id);
        public async Task<T> GetById<T>(int id)
        {
            var repo = _unitOfWork.GetRepositoryAsync<CentreType>();
            var r = await repo.SingleAsync(x => x.ID == id);
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        // Task<List<T>> GetList<T>();
        public async Task<List<T>> GetList<T>()
        {
            var repo = _unitOfWork.GetRepositoryAsync<CentreType>();
            var r = await repo.GetAsync(x => x.Deleted != true);
            var mR = _mapper.Map<List<T>>(r);
            return mR;
        }

        public async Task<GenericResult<T>> Create<T>(CentreTypeViewModel m)
        {
            var r = new GenericResult<T>();

            // Check if username already exists
            var repo = _unitOfWork.GetRepositoryAsync<CentreType>();
            var existing = await repo.SingleAsync(x => x.Code.ToLower() == m.Code.ToLower());

            if (existing != null)
            {
                r.Status = EnumStatusCode.NotUnique;
                r.Message = "A centre type is already present with that code";
            }
            else
            {
                try
                {
                    var newCentreType = new CentreType()
                    {
                        Code = m.Code,
                        Name = m.Name,
                        MaxInvigilators = m.MaxInvigilators,
                        Deleted = false
                    };
                    await repo.AddAsync(newCentreType);

                    await _unitOfWork.SaveChangesAsync();

                    r.Status = EnumStatusCode.Ok;
                    r.KeyID = newCentreType.ID.ConvertIntToTypeValue<T>();
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
        public async Task<GenericResult<T>> Update<T>(CentreTypeViewModel m)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<CentreType>();

            var existing = await repo.SingleAsync(x => x.ID == m.ID);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The centre type could not be found";
                return r;
            }

            try
            {
                existing.Code = m.Code;
                existing.Name = m.Name;
                existing.MaxInvigilators = m.MaxInvigilators;
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

            var repo = _unitOfWork.GetRepositoryAsync<CentreType>();

            var existing = await repo.SingleAsync(x => x.ID == id);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The centre type could not be found";
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
