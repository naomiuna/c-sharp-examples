using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Mav.Common.Extensions;
using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Data.Repositories;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;

namespace Mav.Services.Concrete
{
    public class UserAssessmentAnswerService : IUserAssessmentAnswerService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserAssessmentAnswerService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<T> GetById<T>(int id)
        {
            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessmentSectionAnswer>();
            var r = await assRepo.SingleAsync(
                predicate: x => x.ID == id
            );
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        public async Task<T> GetByKeys<T>(int assessmentSectionID, int questionID)
        {
            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessmentSectionAnswer>();
            var r = await assRepo.SingleAsync(
                predicate: x => x.UserAssessmentSectionID == assessmentSectionID 
                                && x.QuestionID == questionID
            );
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        // GetByQuestionId
        public async Task<IEnumerable<T>> GetByQuestionId<T>(int questionId)
        {
            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessmentSectionAnswer>();
            var r1 = await assRepo.GetAsync(
                predicate: x => x.QuestionID == questionId
            );
            var mR = _mapper.Map<IEnumerable<T>>(r1);
            return mR;
         }

        public async Task<GenericResult<T>> Add<T>(AddUserAssessmentSectionAnswerViewModel vm)
        {
            var r = new GenericResult<T>();

            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessmentSectionAnswer>();

            // Check if exists, UserAssessmentSectionID and QuestionID
            var existingAnswer = await assRepo.SingleAsync(x => x.UserAssessmentSectionID == vm.UserAssessmentSectionID
                                                && x.QuestionID == vm.QuestionID);

            if (existingAnswer != null)
            {
                var updateModel = _mapper.Map<UpdateUserAssessmentSectionAnswerViewModel>(vm);
                updateModel.ID = existingAnswer.ID;

                var r1 = await Update<int>(updateModel);

                r.Status = EnumStatusCode.Ok;
                r.KeyID = existingAnswer.ID.ConvertIntToTypeValue<T>();
            }
            else
            {
                try
                {
                    var newAss = _mapper.Map<UserAssessmentSectionAnswer>(vm);
                    newAss.ModifiedOn = DateTime.UtcNow;

                    await assRepo.AddAsync(newAss);

                    await _unitOfWork.SaveChangesAsync();

                    r.Status = EnumStatusCode.Ok;
                    r.KeyID = newAss.ID.ConvertIntToTypeValue<T>();
                }
                catch (Exception ex)
                {
                    r.Status = EnumStatusCode.UnexpectedError;
                    r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
                }
            }

            return r;
        }

        public async Task<GenericResult<T>> Update<T>(UpdateUserAssessmentSectionAnswerViewModel vm)
        {
            var r = new GenericResult<T>();

            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessmentSectionAnswer>();

            var existing = await assRepo.SingleAsync(x => x.ID == vm.ID);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The user assessment section answer could not be found";
                return r;
            }

            try
            {
                _mapper.Map(vm, existing);
                existing.ModifiedOn = DateTime.UtcNow;

                assRepo.UpdateAsync(existing);

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
