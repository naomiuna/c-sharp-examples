using AutoMapper;
using Mav.Common.Extensions;
using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Data.Repositories;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Mav.Services.Concrete
{
    public class QuestionService : IQuestionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserAssessmentAnswerService UserAssessmentAnswerService;

        public QuestionService(IUnitOfWork unitOfWork, IMapper mapper, IUserAssessmentAnswerService userAssessmentAnswerService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            UserAssessmentAnswerService = userAssessmentAnswerService;
        }

        // GetQuestionById
        public async Task<T> GetQuestionById<T>(int id)
        {
            var qRepo = _unitOfWork.GetRepositoryAsync<Question>();
            var r = await qRepo.SingleAsync(
                predicate: x => x.ID == id && x.Deleted != true,
                include: source => source
                    .Include(c1 => c1.QuestionGroup)
            );
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        // GetQuestionBySectionId
        public async Task<IEnumerable<T>> GetQuestionBySectionId<T>(int sectionId)
        {
            var qRepo = _unitOfWork.GetRepositoryAsync<Question>();
            var r = await qRepo.GetAsync(
                predicate: x => x.SectionID == sectionId && x.Deleted != true,
                include: source => source
                    .Include(c1 => c1.Answers)
            );
            var mR = _mapper.Map<IEnumerable<T>>(r);
            return mR;
        }

        // GetExamQuestionById
        public async Task<ExamQuestionViewModel> GetExamQuestionById(int id)
        {
            var qRepo = _unitOfWork.GetRepositoryAsync<Question>();
            var r = await qRepo.SingleAsync(
                predicate: x => x.ID == id && x.Active == true && x.Deleted != true,
                include: source => source
                    .Include(c1 => c1.QuestionGroup)
                    .Include(c2 => c2.Answers)
            );

            var answers = r.Answers.Where(x => x.Deleted != true && x.Active == true);

            var mR = _mapper.Map<ExamQuestionViewModel>(r);
            mR.Answers = _mapper.Map<List<ExamAnswerViewModel>>(answers);
            return mR;
        }

        // GetQuestionList
        public async Task<IEnumerable<T>> GetQuestionList<T>(int sectionId)
        {
            var qRepo = _unitOfWork.GetRepositoryAsync<Question>();

            Expression<Func<Question, bool>> whereExpr = x => (x.Deleted == null || x.Deleted == false) && x.SectionID == sectionId;

            Func<IQueryable<Question>, IOrderedQueryable<Question>> orderExpr = query => query.OrderBy(y => y.GroupID).ThenBy(y => y.Number);

            Func<IQueryable<Question>, IIncludableQueryable<Question, object>> include = source => source
                .Include(c1 => c1.QuestionGroup);

            var items = await qRepo.GetAsync(whereExpr, orderExpr, include);

            var mR = _mapper.Map<IEnumerable<Question>, IEnumerable<T>>(items);
            return mR;
        }

        // CreateQuestion
        public async Task<GenericResult<T>> CreateQuestion<T>(AddQuestionViewModel m)
        {
            var r = new GenericResult<T>();

            var qRepo = _unitOfWork.GetRepositoryAsync<Question>();

            try
            {
                var newQuestion = _mapper.Map<Question>(m);
                await qRepo.AddAsync(newQuestion);

                await _unitOfWork.SaveChangesAsync();

                r.Status = EnumStatusCode.Ok;
                r.KeyID = newQuestion.ID.ConvertIntToTypeValue<T>();
            }
            catch (Exception ex)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }

            return r;
        }

        // UpdateQuestion
        public async Task<GenericResult<T>> UpdateQuestion<T>(UpdateQuestionViewModel m)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<Question>();

            var existing = await repo.SingleAsync(x => x.ID == m.ID);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The question could not be found";
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

        // DeleteQuestion
        public async Task<GenericResult<T>> DeleteQuestion<T>(int id)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<Question>();

            var existing = await repo.SingleAsync(x => x.ID == id);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The question could not be found";
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
