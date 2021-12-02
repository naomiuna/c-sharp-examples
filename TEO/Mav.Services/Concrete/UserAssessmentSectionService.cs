using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using Mav.Common.Extensions;
using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Data.Enums;
using Mav.Data.Repositories;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Newtonsoft.Json;

namespace Mav.Services.Concrete
{
    public class UserAssessmentSectionService : IUserAssessmentSectionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserAssessmentService _userAssessmentService;

        public UserAssessmentSectionService(IUnitOfWork unitOfWork, IMapper mapper, IUserAssessmentService userAssessmentService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userAssessmentService = userAssessmentService;
        }

        public async Task<T> GetById<T>(int id)
        {
            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessmentSection>();
            var r = await assRepo.SingleAsync(
                predicate: x => x.ID == id,
                include: source => source.Include(x => x.Section).Include(x => x.UserSectionTimer)
            );
            var mR = _mapper.Map<T>(r);
            return mR;
        }
        
        public async Task<List<AssignQuestionItem>> GetUserAssessmentSectionQuestions(int id)
        {
            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessmentSection>();
            var r = await assRepo.SingleAsync(
                predicate: x => x.ID == id
            );

            return JsonConvert.DeserializeObject<List<AssignQuestionItem>>(r.QuestionSet);
        }

        public async Task<IPaginate<UserAssessmentSectionListingModel>> GetListByUserId(UserAssessmentSectionSearchModel vm)
        {
            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessment>();
            var sectionRepo = _unitOfWork.GetRepositoryAsync<Section>();
            vm.SearchTerm = vm.SearchTerm?.ToLower() ?? "";

            var userAssessmentRecord = await assRepo.SingleAsync(
                predicate: x => x.ID == vm.UserAssessmentID,
                include: source => source.Include(a1 => a1.Assessment)
            );

            if (userAssessmentRecord == null)
            {
                throw new Exception("UserAssessment not found");
            }

            var userAssessmentSubmitted = userAssessmentRecord.SubmittedOn.HasValue;
            var assessmentYear = userAssessmentRecord.Assessment.YearID;
            var currentAcademicYear = assessmentYear.GetCurrentAcademicYear();
            var actionAllowed = assessmentYear == currentAcademicYear && !userAssessmentSubmitted;
            
            Expression<Func<Section, bool>> whereExpr = x => (x.Deleted == null || x.Deleted == false)
                    && (x.AssessmentID == userAssessmentRecord.AssessmentID)
            ;

            Func<IQueryable<Section>, IOrderedQueryable<Section>> orderExpr = query => query.OrderBy(y => y.Number);

            //Func<IQueryable<Section>, IIncludableQueryable<Section, object>> include = source => source
            //    .Include(a1 => a1.UserAssessmentSections.FirstOrDefault(a2 => a2.SectionID == a1.ID
            //                    && a2.UserAssessmentID == vm.UserAssessmentID)
            //            );

            Func<IQueryable<Section>, IIncludableQueryable<Section, object>> include = source => source
                .Include(a1 => a1.Questions).Include(a2 => a2.Timer);

            var items = await sectionRepo.GetListAsync(whereExpr,
                orderExpr,
                include,
                vm.PageNo - 1,
                vm.PageSize,
                true);

            var mR = _mapper.Map<Paginate<Section>, Paginate<UserAssessmentSectionListingModel>>(items);

            var userAssSectionRepo = _unitOfWork.GetRepositoryAsync<UserAssessmentSection>();
            var allUuserAssSections = await userAssSectionRepo.GetAsync(predicate: x => x.UserAssessmentID == vm.UserAssessmentID, 
                                                                        include: source=>source.Include(a1 => a1.UserSectionTimer));

            foreach (var item in mR.Items)
            {
                item.UserAssessmentSectionID = 0;
                item.StatusID = (int)EnumAssessmentSectionStatus.NotStarted;
                item.TotalScore = 0;
                item.Attempts = 0;
                item.ActionAllowed = actionAllowed;

                // var userSection = await userAssSectionRepo.SingleAsync(x => x.UserAssessmentID == vm.UserAssessmentID
                //                     && x.SectionID == item.SectionID);
                var userSection = allUuserAssSections.FirstOrDefault(x => x.SectionID == item.SectionID);

                if (userSection != null)
                {
                    item.UserAssessmentSectionID = userSection.ID;
                    item.TotalScore = userSection.Score ?? 0;
                    item.Attempts = userSection.Attempts;
                    item.StatusID = userSection.PassedOn.HasValue
                                        ? userSection.QuestionSetSize > 0 && userSection.Score == userSection.QuestionSetSize 
                                            ? (int)EnumAssessmentSectionStatus.TopScore 
                                            : (int)EnumAssessmentSectionStatus.Passed 
                                        : (int)EnumAssessmentSectionStatus.Started;

                    // If the section was not passed/completed and all attempts have been used
                    if (item.MaxAttempts != 0 && item.Attempts == item.MaxAttempts && item.StatusID != 3)
                    {
                        item.StatusID = (int)EnumAssessmentSectionStatus.AttmeptsExceeded;
                    }

                    // Check user timer
                    if(userSection.UserSectionTimer != null)
                    {
                        if (userSection.UserSectionTimer.TimePassed >= userSection.UserSectionTimer.TimeLimit && item.StatusID != 3)
                        {
                            item.StatusID = (int)EnumAssessmentSectionStatus.TimerReached;
                        }
                        item.TimeRemaining = userSection.UserSectionTimer.TimeLimit - userSection.UserSectionTimer.TimePassed;
                    }
                }
                else if(item.IsEoQualification == true)// if a user has not yet begun this section then set the  time as the time limit
                {
                    var t = await sectionRepo.SingleAsync(predicate: x => x.ID == item.SectionID, include: source => source.Include(x => x.Timer));
                    item.TimeRemaining = t.Timer.TimeLimit;
                }
            }
            
            return mR;           
        }

        /*
        TotalSections = Count sections for assessment
        TotalSectionsCompleted = Count UserAssessmentSections for UserAssessmentID where Passed = true
        TotalScore = Sum Score from UserAssessmentSections for UserAssessmentID
        MaxScore = Sum Assessment.Sections (Quantity => Questions.Count || Questions.Count)
        */
        public async Task<AssessmentSectionTotals> GetUserAssessmentSectionTotals(int id)
        {
            var r = new AssessmentSectionTotals() { UserAssessmentID = id };

            var userAssRepo = _unitOfWork.GetRepositoryAsync<UserAssessment>();
            var userAssDetails = await userAssRepo.SingleAsync(
                predicate: x => x.ID == id,
                include: source => source.Include(a1 => a1.Assessment)
            );

            if (userAssDetails == null)
            {
                throw new Exception("UserAssessment not found");
            }

            var assessmentYear = userAssDetails.Assessment.YearID;
            var currentAcademicYear = assessmentYear.GetCurrentAcademicYear();
            var actionAllowed = assessmentYear == currentAcademicYear;

            var sectionRepo = _unitOfWork.GetRepositoryAsync<Section>();
            var sections = await sectionRepo.GetAsync(x => x.AssessmentID == userAssDetails.AssessmentID && x.Deleted != true,
                            null, source => source.Include(y => y.Questions));

            var userSection = _unitOfWork.GetRepositoryAsync<UserAssessmentSection>();

            var userSections = await userSection.GetAsync(predicate: x => x.UserAssessmentID == id, include: source => source.Include(x => x.UserSectionTimer));

            r.KeyID = userAssDetails.KeyID;
            r.TotalSections = sections.Count();
            r.TotalScore = userSections.Sum(x => x.Score ?? 0);
            r.ActionAllowed = actionAllowed;

            // Check whether the assessment if an eo qualification to determine the completed sections
            if (userAssDetails.Assessment.EoQualification == true)
            {
                r.TotalSectionsCompleted = userSections.Count(x => x.Passed == true || x.Attempts == x.MaxAttempts || x.UserSectionTimer.TimePassed >= x.UserSectionTimer.TimeLimit); //
            }
            else
            {
                r.TotalSectionsCompleted = userSections.Count(x => x.Passed == true); //
            }

            var maxScore = 0;
            foreach (var sect in sections)
            {
                var q1 = sect.Questions.Count(x => x.Deleted != true && x.Active == true);
                if (sect.IsRandom)
                {
                    var q2 = sect.Quantity ?? q1;
                    if (q2 > q1)
                    {
                        q2 = q1;
                    }
                    q1 = q2;
                }
                maxScore += q1;
            }
            r.MaxScore = maxScore;

            var assRepo = _unitOfWork.GetRepositoryAsync<Assessment>();
            var assDetails = await assRepo.SingleAsync(x => x.ID == userAssDetails.AssessmentID);
            var minScore = assDetails.MinScore;

            int scoreAsPct = 0;
            if(maxScore != 0)
            {
                scoreAsPct = Convert.ToInt32(Math.Round(decimal.Divide(r.TotalScore, maxScore) * 100));
            }
            else
            {
                scoreAsPct = 0;
            }
            r.RoundScore = scoreAsPct;
            r.PassRateReached = scoreAsPct >= minScore;
            r.SubmittedOn = userAssDetails.SubmittedOn ?? null;
            r.Submitted = userAssDetails.SubmittedOn.HasValue;

            // Get assessment grades for assessment
            var assessmentGrade = await _userAssessmentService.GetById<AssessmentGradeViewModel>(id);

            // Apply grade - maybe change to simplified if statement
            if(userAssDetails.Assessment.EoQualification)
            {
                if (scoreAsPct >= assessmentGrade.PassScore)
                {
                    if (scoreAsPct >= assessmentGrade.PassScore && scoreAsPct < assessmentGrade.MeritScore)
                    {
                        r.Grade = "Pass";
                    }
                    if (scoreAsPct >= assessmentGrade.MeritScore && scoreAsPct < assessmentGrade.DistinctionScore)
                    {
                        r.Grade = "Merit";
                    }
                    if (scoreAsPct >= assessmentGrade.DistinctionScore)
                    {
                        r.Grade = "Distinction";
                    }
                }
                else
                {
                    r.Grade = "Fail";
                }
            }

            return r;
        }

        public async Task<List<AssessmentSectionSummary>> GetSectionSummaryDetails(int id)
        {
            var r = new List<AssessmentSectionSummary>();

            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessmentSection>();
            var questionGroupsRepo = _unitOfWork.GetRepositoryAsync<QuestionGroup>();
            var questionRepo = _unitOfWork.GetRepositoryAsync<Question>();

            var userAssessmentSection = await assRepo.SingleAsync(
                predicate: x => x.ID == id,
                include: source => source.Include(a1 => a1.UserAssessmentSectionAnswers)
            );

            var questionSet = JsonConvert.DeserializeObject<List<AssignQuestionItem>>(userAssessmentSection.QuestionSet);
            var distinctGroupIDs = questionSet.Select(x => x.GroupID).Distinct().ToList();
            var distinctQuestionIDs = userAssessmentSection.UserAssessmentSectionAnswers.Select(x => x.QuestionID).ToList();
            var questionItems = (await questionRepo.GetAsync(x => distinctQuestionIDs.Any(y => y == x.ID))).ToList();

            if (distinctGroupIDs.Count == 1 && distinctGroupIDs[0] == 0)
            {
                // No groups
                var groupSummary = new AssessmentSectionSummary()
                {
                    GroupID = 0,
                    OrderID = 1,
                    GroupName = "",
                    Questions = new List<AssessmentSectionSummaryItem>(),
                    RecentScore = 0
                };

                foreach (var q in questionSet)
                {
                    var qItem = new AssessmentSectionSummaryItem();
                    var lookupQuestion = questionItems.FirstOrDefault(x => x.ID == q.QuestionID);
                    var lookupAnswer = userAssessmentSection.UserAssessmentSectionAnswers.FirstOrDefault(x => x.QuestionID == q.QuestionID);

                    if (lookupQuestion != null && lookupAnswer != null)
                    {
                        qItem.QuestionNumber = lookupQuestion.Number;
                        qItem.QuestionTitle = lookupQuestion.Title;
                        qItem.QuestionTypeID = lookupQuestion.TypeID;
                        qItem.QuestionHintText = lookupQuestion.HintText ?? "";

                        qItem.MyAnswerCorrect = lookupAnswer.Correct;
                        qItem.MyAnswerText = lookupQuestion.TypeID == (int)EnumQuestionType.Multiple
                                                                        ? "* Multi"
                                                                        : lookupAnswer.AnswerID == 1 ? "Yes" : "No";

                        groupSummary.Questions.Add(qItem);
                        if(qItem.MyAnswerCorrect == 1)
                        {
                            groupSummary.RecentScore++;
                        }
                    }
                }

                r.Add(groupSummary);
            }
            else
            {
                // Multiple groups
                var groupItems = (await questionGroupsRepo.GetAsync(x => distinctGroupIDs.Any(y => y == x.ID))).OrderBy(x => x.OrderId).ToList();
                
                foreach (var group in groupItems)
                {
                    var groupSummary = new AssessmentSectionSummary()
                    {
                        GroupID = group.ID,
                        OrderID = group.OrderId,
                        GroupName = group.Title,
                        Questions = new List<AssessmentSectionSummaryItem>()
                    };

                    foreach (var q in questionSet.Where(x => x.GroupID == group.ID))
                    {
                        var qItem = new AssessmentSectionSummaryItem();
                        var lookupQuestion = questionItems.FirstOrDefault(x => x.ID == q.QuestionID);
                        var lookupAnswer = userAssessmentSection.UserAssessmentSectionAnswers.FirstOrDefault(x => x.QuestionID == q.QuestionID);

                        if (lookupQuestion != null && lookupAnswer != null)
                        {
                            qItem.QuestionNumber = lookupQuestion.Number;
                            qItem.QuestionTitle = lookupQuestion.Title;
                            qItem.QuestionTypeID = lookupQuestion.TypeID;
                            qItem.QuestionHintText = lookupQuestion.HintText ?? "";

                            qItem.MyAnswerCorrect = lookupAnswer.Correct;
                            qItem.MyAnswerText = lookupQuestion.TypeID == (int)EnumQuestionType.Multiple
                                                                            ? "* Multi"
                                                                            : lookupAnswer.AnswerID == 1 ? "Yes" : "No";

                            groupSummary.Questions.Add(qItem);
                            if (qItem.MyAnswerCorrect == 1)
                            {
                                groupSummary.RecentScore++;
                            }
                        }
                    }

                    r.Add(groupSummary);
                }
            }
            
            return r;
        }

        /// <summary>
        /// Lookup UserAssessmentSections with UserAssessmentID and NextSectionID
        /// </summary>
        /// <param name="id">UserAssessmentSectionID</param>
        /// <returns></returns>
        public async Task<int> GetRecentScore(int id)
        {
            var r = await GetSectionSummaryDetails(id);
            var correct = r.Select(x => x.RecentScore);
            var recentScore = correct.Sum();
            return recentScore;
        }

        /// <summary>
        /// Lookup UserAssessmentSections with UserAssessmentID and NextSectionID
        /// </summary>
        /// <param name="id">UserAssessmentSectionID</param>
        /// <returns></returns>
        public async Task<ExamSectionStepViewModel> LookupNextSectionStep(int id)
        {
            var r = new ExamSectionStepViewModel() {
                CurrentSectionID = 0,
                UserAssessmentID = 0,
                NextSectionID = 0,
                NextSectionStatusID = 0,
                NextUserAssessmentSectionID = 0
            };

            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessmentSection>();
            var sectionRepo = _unitOfWork.GetRepositoryAsync<Section>();

            var userAssessmentSection = await assRepo.SingleAsync(
                predicate: x => x.ID == id
            );

            if (userAssessmentSection == null)
            {
                throw new Exception("UserAssessmentSection not found");
            }
            
            var currentSection = await sectionRepo.SingleAsync(x => x.ID == userAssessmentSection.SectionID);
            var nextSection = (await sectionRepo.GetAsync(
                predicate: x => x.AssessmentID == currentSection.AssessmentID && x.Deleted != true 
                                && x.ID != currentSection.ID 
                                && x.Number > currentSection.Number,
                orderBy: query => query.OrderBy(y => y.Number)
            )).FirstOrDefault() ?? null;

            r.CurrentSectionID = currentSection.ID;
            r.UserAssessmentID = userAssessmentSection.UserAssessmentID;

            // Is there a section to go to?
            if (nextSection == null)
            {
                return r;
            }

            r.NextSectionID = nextSection.ID;
            r.NextSectionStatusID = (int)EnumAssessmentSectionStatus.NotStarted;

            // Have I started the section before?
            var nextAssessmentSection = await assRepo.SingleAsync(
                predicate: x => x.UserAssessmentID == userAssessmentSection.UserAssessmentID
                                && x.SectionID == nextSection.ID,
                include: source => source.Include(x => x.UserSectionTimer)
            );

            if (nextAssessmentSection == null) // Not started
            {
                return r;
            }

            r.NextUserAssessmentSectionID = nextAssessmentSection.ID;
            r.NextSectionStatusID = nextAssessmentSection.PassedOn.HasValue
                                        ? nextAssessmentSection.QuestionSetSize > 0 && nextAssessmentSection.Score == nextAssessmentSection.QuestionSetSize
                                            ? (int)EnumAssessmentSectionStatus.TopScore
                                            : (int)EnumAssessmentSectionStatus.Passed
                                        : (int)EnumAssessmentSectionStatus.Started;
            if (nextAssessmentSection.MaxAttempts != 0 && nextAssessmentSection.Attempts == nextAssessmentSection.MaxAttempts) // if the section was not passed/completed and all attempts have been used
            {
                r.NextSectionStatusID = (int)EnumAssessmentSectionStatus.AttmeptsExceeded;
            }

            // Check user timer
            if (nextAssessmentSection.UserSectionTimer != null)
            {
                if (nextAssessmentSection.UserSectionTimer.TimePassed >= nextAssessmentSection.UserSectionTimer.TimeLimit && r.NextSectionStatusID != 3)
                {
                    r.NextSectionStatusID = (int)EnumAssessmentSectionStatus.TimerReached;
                }
            }

            return r;
        }

        public async Task<GenericResult<T>> Add<T>(AddUserAssessmentSectionViewModel vm)
        {
            var r = new GenericResult<T>();

            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessmentSection>();
            var secRepo = _unitOfWork.GetRepositoryAsync<Section>();
            var section = await secRepo.SingleAsync(predicate: x => x.ID == vm.SectionID, include: source => source.Include(x => x.Timer));

            try
            {
                var existing = await assRepo.SingleAsync(
                    predicate: x => x.UserAssessmentID == vm.UserAssessmentID && x.SectionID == vm.SectionID
                );

                if (existing != null)
                {
                    r.Status = EnumStatusCode.NotUnique;
                    r.Message = "Assessment section already created";
                    return r;
                }

                var newAss = _mapper.Map<UserAssessmentSection>(vm);
                newAss.MaxAttempts = section.MaxAttempts;
                newAss.StartedOn = DateTime.UtcNow;

                var questions = await AssignSectionQuestions(vm.SectionID);
                newAss.QuestionSet = JsonConvert.SerializeObject(questions.QuestionSet);
                newAss.QuestionSetSize = questions.QuestionSetSize;

                // Add the user section timer
                if(section.Timer != null)
                {
                    newAss.UserSectionTimer = new UserSectionTimer
                    {
                        TimeLimit = section.Timer.TimeLimit,
                        TimePassed = 0
                    };
                }

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

            return r;
        }

        public async Task<GenericResult<T>> Restart<T>(int id)
        {
            var r = new GenericResult<T>();

            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessmentSection>();
            var answerRepo = _unitOfWork.GetRepository<UserAssessmentSectionAnswer>();

            try
            {
                var existing = await assRepo.SingleAsync(
                    predicate: x => x.ID == id,
                    include: source => source.Include(a1 => a1.UserAssessmentSectionAnswers)
                );
                var sectionID = existing.SectionID ?? 0;

                var questions = await AssignSectionQuestions(sectionID);
                existing.QuestionSet = JsonConvert.SerializeObject(questions.QuestionSet);
                existing.QuestionSetSize = questions.QuestionSetSize;
                existing.Passed = false;
                existing.PassedOn = null;
                //existing.Score = 0;

                answerRepo.Delete(existing.UserAssessmentSectionAnswers);

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

        public async Task<GenericResult<T>> Update<T>(UpdateUserAssessmentSectionViewModel vm)
        {
            var r = new GenericResult<T>();

            var assRepo = _unitOfWork.GetRepositoryAsync<UserAssessmentSection>();

            var existing = await assRepo.SingleAsync(x => x.ID == vm.ID);
            if (existing == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The user assessment section could not be found";
                return r;
            }

            try
            {
                _mapper.Map(vm, existing);

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

        public async Task<GenericResult<T>> Submit<T>(SubmitUserAssessmentSectionViewModel vm)
        {
            var r = new GenericResult<T>();

            var userAssRepo = _unitOfWork.GetRepositoryAsync<UserAssessmentSection>();

            var assessmentSection = await userAssRepo.SingleAsync(
                predicate: x => x.ID == vm.ID,
                include: source => source
                            .Include(a1 => a1.UserAssessment)
                            .Include(a2 => a2.UserAssessmentSectionAnswers)
                            .Include(a3 => a3.UserSectionTimer)
            );

            if (assessmentSection == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The user assessment section could not be found";
                return r;
            }

            try
            {
                var assRepo = _unitOfWork.GetRepositoryAsync<Assessment>();
                var assDetails = await assRepo.SingleAsync(x => x.ID == assessmentSection.UserAssessment.AssessmentID);
                var minScore = assDetails.MinScore;

                // Update Attempts
                assessmentSection.Attempts++;

                // Update Score if the nnew score exceeds the most recent user score
                var score = assessmentSection.UserAssessmentSectionAnswers.Sum(x => x.Correct);
                if (score > assessmentSection.Score)
                {
                    assessmentSection.Score = score;
                }

                // Update Passed / PassedOn
                var totalQuestions = assessmentSection.UserAssessmentSectionAnswers.Count();
                var scoreAsPct = totalQuestions > 0 && score > 0 ? Convert.ToInt32(Math.Round(decimal.Divide(score, totalQuestions) * 100)) : 0;
                if (scoreAsPct >= minScore)
                {
                    assessmentSection.Passed = true;
                    assessmentSection.PassedOn = DateTime.UtcNow;
                }

                // Update timer
                //if(assessmentSection.UserSectionTimer != null)
                //{
                //    assessmentSection.UserSectionTimer.TimePassed = (double)vm.TimePassed;
                //}

                userAssRepo.UpdateAsync(assessmentSection);

                await _unitOfWork.SaveChangesAsync();

                r.Status = EnumStatusCode.Ok;
                r.KeyID = assessmentSection.ID.ConvertIntToTypeValue<T>();
            }
            catch (Exception ex)
            {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }

            return r;
        }

        public async Task<AssignSectionQuestionsViewModel> AssignSectionQuestions(int sectionID)
        {
            var r = new AssignSectionQuestionsViewModel() { SectionID = sectionID };

            var sectionRepo = _unitOfWork.GetRepositoryAsync<Section>();
            var sectionDetails = await sectionRepo.SingleAsync(x => x.ID == sectionID,
                                    null,
                                    source => source.Include(s => s.Questions)
                                                        .ThenInclude(s => s.QuestionGroup)
                                );

            if (sectionDetails == null)
            {
                throw new Exception("SectionDetails not found");
            }

            // If Random, use quantity || Or, use all questions
            var availableQuestions = sectionDetails.Questions.Where(x => x.Deleted != true && x.Active == true);
            var availableQuestionsGrouped = availableQuestions.GroupBy(x => x.GroupID, (key, quest) => new { GroupId = key, Items = quest.ToList() })
                .SelectMany(x => x.Items).OrderBy(x => x.GroupID).ThenBy(x => x.Number);

            var questionSetSize = sectionDetails.IsRandom ? sectionDetails.Quantity ?? availableQuestionsGrouped.Count() : availableQuestionsGrouped.Count();
            var questionSet = availableQuestionsGrouped.Select(y => new AssignQuestionItem() {
                GroupID = y.GroupID ?? 0,
                GroupOrderID = y.QuestionGroup?.OrderId ?? 0,
                QuestionID = y.ID,
                QuestionOrderID = y.Number
            }).ToList();

            if (sectionDetails.IsRandom)
            {
                var tmpItems = GetRandomQuestiobCollection(questionSet, questionSetSize);
                questionSet = tmpItems;
            }

            r.QuestionSet = questionSet;
            r.QuestionSetSize = questionSet.Count();

            return r;
        }

        private List<AssignQuestionItem> GetRandomQuestiobCollection(List<AssignQuestionItem> options, int quantity)
        {
            var r = new List<AssignQuestionItem>();

            if (quantity > options.Count) { quantity = options.Count; }
            if (quantity == options.Count) { return options; }

            var rnd = new Random();
            while (r.Count < quantity)
            {
                var rndIdx = rnd.Next(0, options.Count);
                var rndId = options[rndIdx];
                if (r.IndexOf(rndId) == -1) { r.Add(rndId); }
            }

            return r.OrderBy(x => x.GroupOrderID).ThenBy(x => x.QuestionOrderID).ToList();
        }

        public async Task<GenericResult<T>> UpdateUserSectionStats<T>(UpdateUserSectionStatsViewModel vm)
        {
            var r = new GenericResult<T>();

            var userAssRepo = _unitOfWork.GetRepositoryAsync<UserAssessmentSection>();
            var assessmentSection = await userAssRepo.SingleAsync(
              predicate: x => x.ID == vm.UserAssessmentSectionID,
              include: source => source.Include(x => x.UserSectionTimer)
            );

            if (assessmentSection == null)
            {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The user assessment section could not be found";
                return r;
            }

            try
            {
                assessmentSection.Attempts++;

                if (assessmentSection.UserSectionTimer != null)
                {
                    assessmentSection.UserSectionTimer.TimePassed += vm.TimePassed;
                }

                userAssRepo.UpdateAsync(assessmentSection);

                await _unitOfWork.SaveChangesAsync();

                r.Status = EnumStatusCode.Ok;
                r.KeyID = assessmentSection.ID.ConvertIntToTypeValue<T>();
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
