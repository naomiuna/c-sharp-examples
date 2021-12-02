using AutoMapper;
using Mav.Common.Extensions;
using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Data.Repositories;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Mav.Services.Concrete
{
    public class QuestionGroupService: IQuestionGroupService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public QuestionGroupService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // GetQuestionGroupById
        public async Task<T> GetQuestionGroupById<T>(int id)
        {
            var grpRepo = _unitOfWork.GetRepositoryAsync<QuestionGroup>();
            var r = await grpRepo.SingleAsync(
                predicate: x => x.ID == id && x.Deleted != true
            );
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        // GetQuestionGroupList
        public async Task<IEnumerable<T>> GetQuestionGroupList<T>(int sectionId)
        {
            var grpRepo = _unitOfWork.GetRepositoryAsync<QuestionGroup>();

            Expression<Func<QuestionGroup, bool>> whereExpr = x => (x.Deleted == null || x.Deleted == false) && x.SectionID == sectionId;

            Func<IQueryable<QuestionGroup>, IOrderedQueryable<QuestionGroup>> orderExpr = query => query.OrderBy(y => y.OrderId);

            var items = await grpRepo.GetAsync(whereExpr, orderExpr);

            var mR = _mapper.Map<IEnumerable<QuestionGroup>, IEnumerable<T>>(items);
            return mR;
        }

        // CreateQuestionGroup
        public async Task<GenericResult<T>> CreateQuestionGroup<T>(AddQuestionGroupViewModel m)
        {
            var r = new GenericResult<T>();

            var grpRepo = _unitOfWork.GetRepositoryAsync<QuestionGroup>();

            try
            {
                var newQuestionGroup = _mapper.Map<QuestionGroup>(m);
                await grpRepo.AddAsync(newQuestionGroup);

                await _unitOfWork.SaveChangesAsync();

                r.Status = EnumStatusCode.Ok;
                r.KeyID = newQuestionGroup.ID.ConvertIntToTypeValue<T>();
            }
            catch (Exception ex)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }

            return r;
        }

        // UpdateQuestionGroup
        public async Task<GenericResult<T>> UpdateQuestionGroup<T>(UpdateQuestionGroupViewModel m)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<QuestionGroup>();

            var existing = await repo.SingleAsync(x => x.ID == m.ID);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The category could not be found";
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

        // DeleteQuestionGroup
        public async Task<GenericResult<T>> DeleteQuestionGroup<T>(int id)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<QuestionGroup>();

            var existing = await repo.SingleAsync(x => x.ID == id);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The category could not be found";
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
