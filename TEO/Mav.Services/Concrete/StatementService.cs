using AutoMapper;
using Mav.Common.Extensions;
using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Data.Enums;
using Mav.Data.Repositories;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mav.Services.Concrete
{
    public class StatementService : IStatementService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IAssessmentService _assessmentService;
        private readonly ISectionService _sectionService;

        public StatementService(IUnitOfWork unitOfWork, IMapper mapper, IAssessmentService assessmentService, ISectionService sectionService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _assessmentService = assessmentService;
            _sectionService = sectionService;
        }


        public async Task<T> GetStatementById<T>(int id)
        {
            var repo = _unitOfWork.GetRepositoryAsync<Statement>();
            var questionRepo = _unitOfWork.GetRepositoryAsync<StatementQuestion>();
            var r = await repo.SingleAsync(
                predicate: x => x.ID == id && x.Deleted != true
            );
            r.Questions = (await questionRepo.GetAsync(x => x.StatementID == r.ID && x.Deleted != true)).ToList();
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        public async Task<T> GetStatementBySectionId<T>(int id)
        {
            var section = await _sectionService.GetSectionById<Section>(id);

            if (section != null && section.StatementID != null)
            {
                var repo = _unitOfWork.GetRepositoryAsync<Statement>();
                var questionRepo = _unitOfWork.GetRepositoryAsync<StatementQuestion>();
                var r = await repo.SingleAsync(predicate: x => x.ID == section.StatementID && x.Deleted != true);
                r.Questions = (await questionRepo.GetAsync(x => x.StatementID == r.ID && x.Deleted != true)).ToList();
                var mR = _mapper.Map<T>(r);
                return mR;
            }

            return default;

        }

        public async Task<T> GetStatementByAssessmentById<T>(int id)
        {
            var assessment = await _assessmentService.GetAssessmentById<Assessment>(id);

            if (assessment != null && assessment.StatementID != null)
            {
                var repo = _unitOfWork.GetRepositoryAsync<Statement>();
                var questionRepo = _unitOfWork.GetRepositoryAsync<StatementQuestion>();
                var r = await repo.SingleAsync(predicate: x => x.ID == assessment.StatementID && x.Deleted != true);
                r.Questions = (await questionRepo.GetAsync(x => x.StatementID == r.ID && x.Deleted != true)).ToList();
                var mR = _mapper.Map<T>(r);
                return mR;
            }

            return default;

        }

        public async Task<GenericResult<T>> CreateStatement<T>(AddStatementViewModel m)
        {
            var r = new GenericResult<T>();
            var repo = _unitOfWork.GetRepositoryAsync<Statement>();
            var questionRepo = _unitOfWork.GetRepositoryAsync<StatementQuestion>();

            try
            {
                var newStatement = _mapper.Map<Statement>(m);
                await repo.AddAsync(newStatement);

                await _unitOfWork.SaveChangesAsync();

                r.Status = EnumStatusCode.Ok;
                r.KeyID = newStatement.ID.ConvertIntToTypeValue<T>();

                //update parent with ID depending on type
                if (m.StatementType == EnumStatementType.Assessment)
                {
                    var assessment = await _assessmentService.GetAssessmentById<Assessment>(m.ParentID);
                    if (assessment != null)
                    {
                        assessment.StatementID = newStatement.ID;
                        var result = await _assessmentService.Update<int>(_mapper.Map<UpdateAssessmentViewModel>(assessment));
                        if (result.Status == EnumStatusCode.Ok)
                        {

                            foreach (var question in m.Questions)
                            {
                                question.StatementID = assessment.StatementID.Value;
                                //new question
                                await questionRepo.AddAsync(_mapper.Map<StatementQuestion>(question));

                            }

                            await _unitOfWork.SaveChangesAsync();


                            return r;
                        }
                        else
                        {
                            //todo: might need to rollback creation of statement to prevent orphans
                            r.Status = result.Status;
                            r.Message = result.Message;
                        }


                    }
                }

                if (m.StatementType == EnumStatementType.Section)
                {
                    var section = await _sectionService.GetSectionById<Section>(m.ParentID);
                    if (section != null)
                    {
                        section.StatementID = newStatement.ID;

                        var map = _mapper.Map<UpdateSectionViewModel>(section);
                        var result = await _sectionService.UpdateSection<int>(map);
                        if (result.Status == EnumStatusCode.Ok)
                        {
                            foreach (var question in m.Questions)
                            {
                                question.StatementID = section.StatementID.Value;
                                //new question
                                await questionRepo.AddAsync(_mapper.Map<StatementQuestion>(question));

                            }

                            await _unitOfWork.SaveChangesAsync();
                            return r;
                        }
                        else
                        {
                            //todo: might need to rollback creation of statement to prevent orphans
                            r.Status = result.Status;
                            r.Message = result.Message;
                        }


                        await _unitOfWork.SaveChangesAsync();
                    }
                }
            }
            catch (Exception ex)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }

            return r;
        }

        public async Task<GenericResult<T>> UpdateStatement<T>(UpdateStatementViewModel m)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<Statement>();

            var existing = await repo.SingleAsync(x => x.ID == m.ID);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The statement could not be found";
                return r;
            }

            try
            {
                _mapper.Map(m, existing);

                repo.UpdateAsync(existing);


                await _unitOfWork.SaveChangesAsync();

                r.Status = EnumStatusCode.Ok;
                r.KeyID = existing.ID.ConvertIntToTypeValue<T>();

                //update questions
                var questionRepo = _unitOfWork.GetRepositoryAsync<StatementQuestion>();
                var questions = await questionRepo.GetAsync(x => x.StatementID == existing.ID);

                foreach (var question in m.Questions)
                {
                    if (question.ID <= 0)
                    {
                        //new question
                        question.StatementID = existing.ID;
                        await questionRepo.AddAsync(_mapper.Map<StatementQuestion>(question));
                    }
                    else
                    {
                        var existingQuestion = await questionRepo.SingleAsync(x => x.ID == question.ID);
                        if (existingQuestion != null)
                        {
                            var map = _mapper.Map<StatementQuestion>(question);
                            map.ID = existingQuestion.ID;
                            questionRepo.UpdateAsync(map);
                        }
                    }
                }

                foreach (var question in questions)
                {
                    if (!m.Questions.Any(o => o.ID == question.ID))
                    {
                        //no longer present, mark as deleted
                        question.Deleted = true;
                        questionRepo.UpdateAsync(question);
                    }
                }

                await _unitOfWork.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }

            return r;
        }

        public async Task<GenericResult<T>> DeleteStatement<T>(int id)
        {
            var r = new GenericResult<T>();

            var repo = _unitOfWork.GetRepositoryAsync<Section>();

            var existing = await repo.SingleAsync(x => x.ID == id);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The statement could not be found";
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

        public async Task<T> GetStatementAnswers<T>(int statementId, string userId)
        {
            var repo = _unitOfWork.GetRepositoryAsync<UserStatementAnswer>();
            try
            {
                var r = await repo.GetAsync(o => o.StatementID == statementId && o.UserID == userId);

                return _mapper.Map<T>(r);
            } catch(Exception ex)
            {
                return default(T);
            }
           
        }

        public async Task<GenericResult<T>> CreateStatementAnswer<T>(UserStatementAnswerViewModel m)
        {
            var r = new GenericResult<T>();

            try
            {
                var repo = _unitOfWork.GetRepositoryAsync<UserStatementAnswer>();
                var newAnswer = _mapper.Map<UserStatementAnswer>(m);
                await repo.AddAsync(newAnswer);

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

        public async Task<GenericResult<T>> UpdateStatementAnswer<T>(UserStatementAnswerViewModel m)
        {
            var r = new GenericResult<T>();

            try
            {
                var repo = _unitOfWork.GetRepositoryAsync<UserStatementAnswer>();

                var existing = await repo.SingleAsync(o => o.ID == m.ID);
                if (existing == null)
                {
                    r.Status = EnumStatusCode.NotFound;
                    r.Message = "The statement could not be found";
                    return r;
                }


                 _mapper.Map(m,existing);
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
