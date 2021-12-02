using System;
using System.Linq;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using Mav.Data.Entities;
using Mav.Data.Repositories;
using Mav.Services.Abstract;
using Mav.Common.Models;
using Mav.Models.ViewModels;
using Mav.Common.Extensions;
using Microsoft.EntityFrameworkCore.Query;
using Mav.Models.SearchModels;
using Microsoft.EntityFrameworkCore;

namespace Mav.Services.Concrete
{
    public class SectionService : ISectionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public SectionService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // GetSectionById
        public async Task<T> GetSectionById<T>(int id)
        {
            var sectRepo = _unitOfWork.GetRepositoryAsync<Section>();
            var r = await sectRepo.SingleAsync(
                predicate: x => x.ID == id && x.Deleted != true,
                include: source => source.Include(x => x.Timer)
            );
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        // GetSectionList
        public async Task<IEnumerable<T>> GetSectionList<T>(int assessmentId)
        {
            var sectRepo = _unitOfWork.GetRepositoryAsync<Section>();
            
            Expression<Func<Section, bool>> whereExpr = x => (x.Deleted == null || x.Deleted == false) && x.AssessmentID == assessmentId;

            Func<IQueryable<Section>, IOrderedQueryable<Section>> orderExpr = query => query.OrderBy(y => y.Number);

            var items = await sectRepo.GetAsync(whereExpr, orderExpr);

            var mR = _mapper.Map<IEnumerable<Section>, IEnumerable<T>>(items);
            return mR;
        }

        // GetSectionListPages
        public async Task<IPaginate<T>> GetSectionListPages<T>(SectionSearchModel vm)
        {
            var sectRepo = _unitOfWork.GetRepositoryAsync<Section>();

            Expression<Func<Section, bool>> whereExpr = x => (x.Deleted == null || x.Deleted == false) && x.AssessmentID == vm.AssessmentID;

            Func<IQueryable<Section>, IOrderedQueryable<Section>> orderExpr = query => query.OrderBy(y => y.Number);

            Func<IQueryable<Section>, IIncludableQueryable<Section, object>> include = null;

            var items = await sectRepo.GetListAsync(whereExpr,
                orderExpr,
                include,
                vm.PageNo - 1,
                vm.PageSize,
                true);

            var mR = _mapper.Map<Paginate<Section>, Paginate<T>>(items);
            return mR;
        }

        // CreateSection
        public async Task<GenericResult<T>> CreateSection<T>(AddSectionViewModel m)
        {
            var r = new GenericResult<T>();

            var sectRepo = _unitOfWork.GetRepositoryAsync<Section>();

            try
            {
                if(m.IsEoQualification == true) // if EoQual then add the timer aswell
                {
                    var newSection = _mapper.Map<Section>(m);
                    newSection.Timer = new Timer
                    {
                        TimeLimit = (double)m.TimeLimit
                    };
                    await sectRepo.AddAsync(newSection);
                    await _unitOfWork.SaveChangesAsync();
                    r.Status = EnumStatusCode.Ok;
                    r.KeyID = newSection.ID.ConvertIntToTypeValue<T>();
                }
                else
                {
                    var newSection = _mapper.Map<Section>(m);
                    await sectRepo.AddAsync(newSection);

                    await _unitOfWork.SaveChangesAsync();

                    r.Status = EnumStatusCode.Ok;
                    r.KeyID = newSection.ID.ConvertIntToTypeValue<T>();
                }
            }
            catch (Exception ex)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }

            return r;
        }

        // UpdateSection
        public async Task<GenericResult<T>> UpdateSection<T>(UpdateSectionViewModel m)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<Section>();

            var existing = await repo.SingleAsync(
                predicate: x => x.ID == m.ID,
                include: source => source.Include(x => x.Timer));

            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The section could not be found";
                return r;
            }

            try
            {
                _mapper.Map(m, existing);
                // ADD MAPPING PROFILE FOR TIMERVIEWMODEL AND TIMER

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

        // DeleteSection
        public async Task<GenericResult<T>> DeleteSection<T>(int id)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<Section>();

            var existing = await repo.SingleAsync(x => x.ID == id);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The section could not be found";
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

        // GetSectionCount
        public async Task<int> GetSectionCount(int assessmentId)
        {
            var sectRepo = _unitOfWork.GetRepositoryAsync<Section>();
            var r = await sectRepo.CountAsync(
                predicate: x => x.AssessmentID == assessmentId && x.Deleted != true
            );
            
            return r;
        }
    }
}
