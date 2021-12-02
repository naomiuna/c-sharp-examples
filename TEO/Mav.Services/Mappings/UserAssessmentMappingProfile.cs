using AutoMapper;
using Mav.Data.Entities;
using Mav.Data.Enums;
using Mav.Models.ReportModels;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using System;
using System.Linq;

namespace Mav.Services.Mappings
{
    public class UserAssessmentMappingProfile : Profile
    {
        public UserAssessmentMappingProfile()
        {
            // UserAssessments
            CreateMap<Assessment, UserAssessmentListingModel>()
                .ForMember(dest => dest.AssessmentID, opt => opt.MapFrom(s => s.ID))
                //.ForMember(dest => dest.UserAssessmentID, opt => opt.ResolveUsing(s =>
                //{
                //    var t1 = s.UserAssessments.FirstOrDefault() ?? null;
                //    if (t1 != null) { return t1.ID; }
                //    return 0;
                //}))
                //.ForMember(dest => dest.StatusID, opt => opt.ResolveUsing(s =>
                //{
                //    var t1 = s.UserAssessments.FirstOrDefault() ?? null;
                //    if (t1 == null) { return (int)EnumAssessmentStatus.NotStarted; }
                //    var t2 = t1?.SubmittedOn ?? null;
                //    return t2 == null ? (int)EnumAssessmentStatus.Started : (int)EnumAssessmentStatus.Submitted;
                //}))
                .ForMember(dest => dest.UserAssessmentID, opt => opt.Ignore())
                .ForMember(dest => dest.StatusID, opt => opt.Ignore())
                .ForMember(dest => dest.YearDisplay, opt => opt.Ignore())
                .ForMember(dest => dest.KeyID, opt => opt.Ignore())
                .ForMember(dest => dest.SubmittedOn, opt => opt.Ignore())
                .ForMember(dest => dest.TargetGroup, opt => opt.ResolveUsing(s =>
                {
                    return s.Role.RoleId;
                }))
            ;

            CreateMap<UserAssessment, UserAssessmentListingModel>()
                .ForMember(dest => dest.UserAssessmentID, opt => opt.MapFrom(s => s.ID))
                .ForMember(dest => dest.AssessmentID, opt => opt.MapFrom(s => s.AssessmentID))
                .ForMember(dest => dest.KeyID, opt => opt.MapFrom(s => s.KeyID))
                .ForMember(dest => dest.YearID, opt => opt.MapFrom(s => s.YearID))
                .ForMember(dest => dest.SubmittedOn, opt => opt.MapFrom(s => s.SubmittedOn))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(s => s.Assessment.Title))
                .ForMember(dest => dest.StatusID, opt => opt.ResolveUsing(s =>
                {
                    var t2 = s?.SubmittedOn ?? null;
                    return t2 == null ? (int)EnumAssessmentStatus.Started : (int)EnumAssessmentStatus.Submitted;
                }))
                .ForMember(dest => dest.YearDisplay, opt => opt.Ignore())
            ;

            CreateMap<UserAssessment, UserAssessmentViewModel>()
                .ForMember(dest => dest.StatusID, opt => opt.ResolveUsing(s =>
                {
                    var t2 = s?.SubmittedOn ?? null;
                    return t2 == null ? (int)EnumAssessmentStatus.Started : (int)EnumAssessmentStatus.Submitted;
                }))
            ;

            CreateMap<AddUserAssessmentViewModel, UserAssessment>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.KeyID, opt => opt.Ignore())
                .ForMember(dest => dest.StartedOn, opt => opt.Ignore())
                .ForMember(dest => dest.Assessment, opt => opt.Ignore())
                .ForMember(dest => dest.SubmittedOn, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessmentSections, opt => opt.Ignore())
            ;

            CreateMap<UserAssessment, UpdateUserAssessmentViewModel>();

            CreateMap<UpdateUserAssessmentViewModel, UserAssessment>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.KeyID, opt => opt.Ignore())
                .ForMember(dest => dest.AssessmentID, opt => opt.Ignore())
                .ForMember(dest => dest.UserID, opt => opt.Ignore())
                .ForMember(dest => dest.YearID, opt => opt.Ignore())
                .ForMember(dest => dest.StartedOn, opt => opt.Ignore())
                .ForMember(dest => dest.Assessment, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessmentSections, opt => opt.Ignore())
            ;

            CreateMap<UserAssessment, CertificateViewModel>()
                .ForMember(dest => dest.AssessmentName, opt => opt.MapFrom(s => s.Assessment.Title))
                .ForMember(dest => dest.UserName, opt => opt.Ignore())
                .ForMember(dest => dest.CentreName, opt => opt.Ignore())
                .ForMember(dest => dest.YearDisplay, opt => opt.Ignore())
                .ForMember(dest => dest.TotalScore, opt => opt.Ignore())
                .ForMember(dest => dest.MaxScore, opt => opt.Ignore())
                .ForMember(dest => dest.Sections, opt => opt.Ignore())
            ;

            CreateMap<UserAssessment, AssessmentGradeViewModel>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.PassScore , opt => opt.MapFrom(s => s.Assessment.AssessmentGrade.PassScore))
                .ForMember(dest => dest.MeritScore, opt => opt.MapFrom(s => s.Assessment.AssessmentGrade.MeritScore))
                .ForMember(dest => dest.DistinctionScore, opt => opt.MapFrom(s => s.Assessment.AssessmentGrade.DistinctionScore))
             ;

            // UserAssessmentSections
            CreateMap<Section, UserAssessmentSectionListingModel>()
                .ForMember(dest => dest.SectionID, opt => opt.MapFrom(s => s.ID))
                //.ForMember(dest => dest.UserAssessmentSectionID, opt => opt.ResolveUsing(s =>
                //{
                //    var t1 = s.UserAssessmentSections.FirstOrDefault() ?? null;
                //    if (t1 != null) { return t1.ID; }
                //    return 0;
                //}))
                //.ForMember(dest => dest.StatusID, opt => opt.ResolveUsing(s =>
                //{
                //    var t1 = s.UserAssessmentSections.FirstOrDefault() ?? null;
                //    if (t1 == null) { return (int)EnumAssessmentSectionStatus.NotStarted; }
                //    var t2 = t1?.PassedOn ?? null;
                //    return t2 == null ? (int)EnumAssessmentSectionStatus.Started : (int)EnumAssessmentSectionStatus.Completed;
                //}))
                //.ForMember(dest => dest.TotalScore, opt => opt.ResolveUsing(s =>
                //{
                //    var t1 = s.UserAssessmentSections.FirstOrDefault() ?? null;
                //    if (t1 != null) { return t1.Score; }
                //    return 0;
                //}))
                .ForMember(dest => dest.TotalQuestions, opt => opt.ResolveUsing(s => 
                {
                    var total = s.Questions.Count(q1 => q1.Deleted != true && q1.Active == true);
                    if (s.IsRandom && s.Quantity < total) { total = s.Quantity.Value; }
                    return total;
                }))
                .ForMember(dest => dest.UserAssessmentSectionID, opt => opt.Ignore())
                .ForMember(dest => dest.StatusID, opt => opt.Ignore())
                .ForMember(dest => dest.TotalScore, opt => opt.Ignore())
                .ForMember(dest => dest.Attempts, opt => opt.Ignore())
                .ForMember(dest => dest.ActionAllowed, opt => opt.Ignore())
            ;

            CreateMap<UserAssessmentSection, UserAssessmentSectionViewModel>()
                .ForMember(dest => dest.SectionNumber, opt => opt.MapFrom(s => s.Section.Number))
                .ForMember(dest => dest.SectionTitle, opt => opt.MapFrom(s => s.Section.Title))
                .ForMember(dest => dest.StatusID, opt => opt.ResolveUsing(s =>
                {
                    var t2 = s?.PassedOn ?? null;
                    var str =  s.PassedOn.HasValue
                                ? s.QuestionSetSize > 0 && s.Score == s.QuestionSetSize
                                    ? (int)EnumAssessmentSectionStatus.TopScore
                                    : (int)EnumAssessmentSectionStatus.Passed
                                : (int)EnumAssessmentSectionStatus.Started;
                    if(s.MaxAttempts != 0 && s.Attempts == s.MaxAttempts && str != 3)
                    {
                        str = (int)EnumAssessmentSectionStatus.AttmeptsExceeded;
                    }
                    // Check user timer
                    if(s.UserSectionTimer != null)
                    {
                        if (s.UserSectionTimer.TimePassed >= s.UserSectionTimer.TimeLimit && str != 3)
                        {
                            str = (int)EnumAssessmentSectionStatus.TimerReached;
                        }
                    }
                    
                    return str;
                }))
                .ForMember(dest => dest.ActionAllowed, opt => opt.Ignore())
            ;

            CreateMap<AddUserAssessmentSectionViewModel, UserAssessmentSection>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.StartedOn, opt => opt.Ignore())
                .ForMember(dest => dest.Score, opt => opt.UseValue(0))
                .ForMember(dest => dest.Attempts, opt => opt.UseValue(0))
                .ForMember(dest => dest.Passed, opt => opt.UseValue(false))
                .ForMember(dest => dest.PassedOn, opt => opt.Ignore())
                .ForMember(dest => dest.QuestionSet, opt => opt.Ignore())
                .ForMember(dest => dest.QuestionSetSize, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessment, opt => opt.Ignore())
                .ForMember(dest => dest.Section, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessmentSectionAnswers, opt => opt.Ignore())
            ;

            CreateMap<UserAssessmentSection, UpdateUserAssessmentSectionViewModel>();

            CreateMap<UpdateUserAssessmentSectionViewModel, UserAssessmentSection>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessmentID, opt => opt.Ignore())
                .ForMember(dest => dest.StartedOn, opt => opt.Ignore())
                .ForMember(dest => dest.Passed, opt => opt.Ignore())
                .ForMember(dest => dest.PassedOn, opt => opt.Ignore())
                .ForMember(dest => dest.SectionID, opt => opt.Ignore())
                .ForMember(dest => dest.QuestionSet, opt => opt.Ignore())
                .ForMember(dest => dest.QuestionSetSize, opt => opt.Ignore())
                .ForMember(dest => dest.Section, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessment, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessmentSectionAnswers, opt => opt.Ignore())
            ;

            CreateMap<SubmitUserAssessmentSectionViewModel, UserAssessmentSection>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessmentID, opt => opt.Ignore())
                .ForMember(dest => dest.StartedOn, opt => opt.Ignore())
                .ForMember(dest => dest.Score, opt => opt.Ignore())
                .ForMember(dest => dest.Attempts, opt => opt.Ignore())
                .ForMember(dest => dest.SectionID, opt => opt.Ignore())
                .ForMember(dest => dest.QuestionSet, opt => opt.Ignore())
                .ForMember(dest => dest.QuestionSetSize, opt => opt.Ignore())
                .ForMember(dest => dest.Section, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessment, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessmentSectionAnswers, opt => opt.Ignore())
            ;

            // UserAssessmentSectionAnswers
            CreateMap<AddUserAssessmentSectionAnswerViewModel, UserAssessmentSectionAnswer>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.ModifiedOn, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessmentSection, opt => opt.Ignore())
            ;

            CreateMap<UserAssessmentSectionAnswer, UpdateUserAssessmentSectionAnswerViewModel>()
                .ForMember(dest => dest.AnswerIDs, opt => opt.Ignore())
            ;

            CreateMap<UpdateUserAssessmentSectionAnswerViewModel, UserAssessmentSectionAnswer>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessmentSectionID, opt => opt.Ignore())
                .ForMember(dest => dest.QuestionID, opt => opt.Ignore())
                .ForMember(dest => dest.ModifiedOn, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessmentSection, opt => opt.Ignore())
            ;

            CreateMap<AddUserAssessmentSectionAnswerViewModel, UpdateUserAssessmentSectionAnswerViewModel>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
            ;

            CreateMap<UserAssessmentSectionAnswer, UserAssessmentSectionAnswerReportModel>();

            CreateMap<UserCentre, CentrePolicyViewModel>()
                .ForMember(dest => dest.UserName, opt => opt.Ignore())
                ;

            CreateMap<UserSectionTimer, UserSectionTimerViewModel>();
        }
    }
}
