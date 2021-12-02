using AutoMapper;
using Mav.Common.Extensions;
using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Data.Enums;
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
    public class AnswerService : IAnswerService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AnswerService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // GetAnswerById
        public async Task<T> GetAnswerById<T>(int id)
        {
            var answerRepo = _unitOfWork.GetRepositoryAsync<Answer>();
            var r = await answerRepo.SingleAsync(
                predicate: x => x.ID == id && x.Deleted != true
            );
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        // GetAnswerList
        public async Task<IEnumerable<T>> GetAnswerList<T>(int questionId)
        {
            var answerRepo = _unitOfWork.GetRepositoryAsync<Answer>();

            Expression<Func<Answer, bool>> whereExpr = x => (x.Deleted == null || x.Deleted == false) && x.QuestionID == questionId;

            Func<IQueryable<Answer>, IOrderedQueryable<Answer>> orderExpr = query => query.OrderBy(y => y.OrderID);

            Func<IQueryable<Answer>, IIncludableQueryable<Answer, object>> include = null;

            var items = await answerRepo.GetAsync(whereExpr, orderExpr, include);

            var mR = _mapper.Map<IEnumerable<Answer>, IEnumerable<T>>(items);
            return mR;
        }

        // CreateAnswer
        public async Task<GenericResult<T>> CreateAnswer<T>(AddAnswerViewModel m)
        {
            var r = new GenericResult<T>();

            var answerRepo = _unitOfWork.GetRepositoryAsync<Answer>();

            try
            {
                var newAnswer = _mapper.Map<Answer>(m);
                await answerRepo.AddAsync(newAnswer);

                await _unitOfWork.SaveChangesAsync();

                r.Status = EnumStatusCode.Ok;
                r.KeyID = newAnswer.ID.ConvertIntToTypeValue<T>();
            }
            catch (Exception ex)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }

            return r;
        }

        // UpdateAnswer
        public async Task<GenericResult<T>> UpdateAnswer<T>(UpdateAnswerViewModel m)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<Answer>();

            var existing = await repo.SingleAsync(x => x.ID == m.ID);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The answer could not be found";
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

        // InsertUpdate
        public async Task<GenericResult<T>> InsertUpdateAnswer<T>(List<UpdateAnswerViewModel> models)
        {
            var r = new GenericResult<T>();

            var answerRepo = _unitOfWork.GetRepositoryAsync<Answer>();
                        
            try
            {
                foreach (var m in models)
                {
                    if (m.ID == 0)
                    {
                        var newAnswer = _mapper.Map<Answer>(m);
                        await answerRepo.AddAsync(newAnswer);
                    }
                    else
                    {
                        var existing = await answerRepo.SingleAsync(x => x.ID == m.ID);
                        if (existing != null)
                        {
                            _mapper.Map(m, existing);
                            answerRepo.UpdateAsync(existing);
                        }
                    }
                }

                await _unitOfWork.SaveChangesAsync();

                r.Status = EnumStatusCode.Ok;
            }
            catch (Exception ex)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }

            return r;
        }

        // DeleteAnswer
        public async Task<GenericResult<T>> DeleteAnswer<T>(int id)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<Answer>();

            var existing = await repo.SingleAsync(x => x.ID == id);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The answer could not be found";
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

        public async Task<AddUserAssessmentSectionAnswerViewModel> MarkAnswers(AddUserAssessmentSectionAnswerViewModel vm)
        {
            vm.Correct = 0;

            // Question Type
            var questionRepo = _unitOfWork.GetRepositoryAsync<Question>();
            var question = await questionRepo.SingleAsync(
                predicate: x => x.ID == vm.QuestionID,
                include: source => source
                    .Include(c2 => c2.Answers)
            );

            if (question.TypeID == (int)EnumQuestionType.YesNo)
            {
                // Yes / No
                // Does it match?
                vm.Correct = vm.AnswerID == question.YesNoCorrectID ? 1 : 0;
            }
            else
            {
                // Multi
                // Selections needed
                // List int of correct answers
                var correctAnswers = question.Answers
                                        .Where(x => x.Active == true 
                                            && x.Deleted != true 
                                            && x.IsCorrect == true).Select(y => y.ID)
                                            .ToList();

                var nonMatching = vm.AnswerIDs.Except(correctAnswers);
                vm.Correct = correctAnswers.Count == vm.AnswerIDs.Count 
                                && nonMatching.Count() == 0 ? 1 : 0;

                vm.AnswerAsString = string.Join(",", vm.AnswerIDs);
            }

            return vm;
        }
    }
}
