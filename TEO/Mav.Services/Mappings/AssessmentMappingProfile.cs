using AutoMapper;
using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Data.Enums;
using Mav.Models.ReportModels;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using System;

namespace Mav.Services.Mappings
{
    public class AssessmentMappingProfile : Profile
    {
        public AssessmentMappingProfile()
        {
            CreateMap<AddAssessmentViewModel, Assessment>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.CentreID, opt => opt.Ignore())
                .ForMember(dest => dest.Guide, opt => opt.Ignore())
                .ForMember(dest => dest.Objectives, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedOn, opt => opt.Ignore())
                .ForMember(dest => dest.Active, opt => opt.UseValue(false))
                .ForMember(dest => dest.Published, opt => opt.UseValue(false))
                .ForMember(dest => dest.PublishedOn, opt => opt.Ignore())
                .ForMember(dest => dest.Deleted, opt => opt.UseValue(false))
                .ForMember(dest => dest.Centre, opt => opt.Ignore())
                .ForMember(dest => dest.Sections, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessments, opt => opt.Ignore())
                .ForMember(dest => dest.Role, opt => opt.Ignore())

            ;

            CreateMap<AddAssessmentEoViewModel, Assessment>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.CentreID, opt => opt.Ignore())
                .ForMember(dest => dest.Guide, opt => opt.Ignore())
                .ForMember(dest => dest.Objectives, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedOn, opt => opt.Ignore())
                .ForMember(dest => dest.Active, opt => opt.UseValue(false))
                .ForMember(dest => dest.Published, opt => opt.UseValue(false))
                .ForMember(dest => dest.PublishedOn, opt => opt.Ignore())
                .ForMember(dest => dest.Deleted, opt => opt.UseValue(false))
                .ForMember(dest => dest.Centre, opt => opt.Ignore())
                .ForMember(dest => dest.Sections, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessments, opt => opt.Ignore())
                .ForMember(dest => dest.Role, opt => opt.Ignore())

;

            CreateMap<Assessment, AssessmentListingModel>()
                .ForMember(dest => dest.TargetGroup, opt => opt.ResolveUsing(s =>
                {
                    return s.Role.RoleId;
                }))
                ;

            CreateMap<Assessment, UpdateAssessmentViewModel>()
                .ForMember(dest => dest.RoleID, opt=> opt.ResolveUsing(s =>
                {
                    return s.Role?.RoleId ?? "";
                }));

            CreateMap<UpdateAssessmentViewModel, Assessment>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.CentreID, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedOn, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.PublishedOn, opt => opt.Ignore())
                .ForMember(dest => dest.Active, opt => opt.Ignore())
                .ForMember(dest => dest.Deleted, opt => opt.Ignore())
                .ForMember(dest => dest.Centre, opt => opt.Ignore())
                .ForMember(dest => dest.Sections, opt => opt.Ignore())
                .ForMember(dest => dest.Statement, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessments, opt => opt.Ignore())
                .ForMember(dest => dest.Role, opt => opt.Ignore())

            ;

            CreateMap<AssessmentGradeViewModel, AssessmentGrade>();

            CreateMap<Section, SectionListingModel>();
            
            CreateMap<AddSectionViewModel, Section>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.Deleted, opt => opt.UseValue(false))
                .ForMember(dest => dest.Information, opt => opt.UseValue(""))
                .ForMember(dest => dest.ImageUri, opt => opt.UseValue(""))
                .ForMember(dest => dest.Assessment, opt => opt.Ignore())
                .ForMember(dest => dest.QuestionGroups, opt => opt.Ignore())
                .ForMember(dest => dest.Questions, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessmentSections, opt => opt.Ignore())
            ;

            CreateMap<Section, UpdateSectionViewModel>()
                .ForMember(dest => dest.SectionCount, opt => opt.Ignore());

            CreateMap<UpdateSectionViewModel, Section>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.Deleted, opt => opt.Ignore())
                .ForMember(dest => dest.ImageUri, opt => opt.Ignore())
                .ForMember(dest => dest.Assessment, opt => opt.Ignore())
                .ForMember(dest => dest.QuestionGroups, opt => opt.Ignore())
                .ForMember(dest => dest.Questions, opt => opt.Ignore())
                .ForMember(dest => dest.Statement, opt => opt.Ignore())
                .ForMember(dest => dest.UserAssessmentSections, opt => opt.Ignore())
                
            ;

            CreateMap<Statement, AddStatementViewModel>()
                .ForMember(dest => dest.ParentID, opt => opt.Ignore())
                .ForMember(dest => dest.StatementType, opt => opt.Ignore());

            CreateMap<AddStatementViewModel, Statement>()
                 .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.Deleted, opt => opt.UseValue(false))
                .ForMember(dest => dest.Questions, opt => opt.Ignore()); ;

            CreateMap<Statement, UpdateStatementViewModel>()
                .ForMember(dest => dest.Answers, opt => opt.Ignore());

            CreateMap<UpdateStatementViewModel, Statement>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.Deleted, opt => opt.Ignore())
                .ForMember(dest => dest.Questions, opt => opt.Ignore());
                

            CreateMap<StatementQuestion, StatementQuestionViewModel>();
            CreateMap<StatementQuestionViewModel, StatementQuestion>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.Statement, opt => opt.Ignore());

            CreateMap<UserStatementAnswer,UserStatementAnswerViewModel>();
            CreateMap<UserStatementAnswerViewModel,UserStatementAnswer>()
                .ForMember(dest => dest.Statement, opt => opt.Ignore())
                .ForMember(dest => dest.StatementQuestion, opt => opt.Ignore());

            CreateMap<QuestionGroup, QuestionGroupViewModel>();

            CreateMap<AddQuestionGroupViewModel, QuestionGroup>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.Deleted, opt => opt.UseValue(false))
                .ForMember(dest => dest.Section, opt => opt.Ignore())
                .ForMember(dest => dest.Questions, opt => opt.Ignore())
            ;

            CreateMap<QuestionGroup, UpdateQuestionGroupViewModel>();

            CreateMap<UpdateQuestionGroupViewModel, QuestionGroup>()
                .ForMember(dest => dest.Deleted, opt => opt.Ignore())
                .ForMember(dest => dest.Section, opt => opt.Ignore())
                .ForMember(dest => dest.Questions, opt => opt.Ignore())
            ;

            CreateMap<Question, QuestionViewModel>()
                .ForMember(dest => dest.TypeName, opt => opt.ResolveUsing(s =>
                {
                    var t1 = s.TypeID;
                    return ((EnumQuestionType)t1).ToString();
                }))
                .ForMember(dest => dest.GroupName, opt => opt.ResolveUsing(s =>
                {
                    return s.QuestionGroup?.Title ?? "";
                }))
            ;

            CreateMap<AddQuestionViewModel, Question>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.Active, opt => opt.UseValue(true))
                .ForMember(dest => dest.Deleted, opt => opt.UseValue(false))
                .ForMember(dest => dest.Answers, opt => opt.Ignore())
                .ForMember(dest => dest.Section, opt => opt.Ignore())
                .ForMember(dest => dest.QuestionGroup, opt => opt.Ignore())
            ;

            CreateMap<Question, UpdateQuestionViewModel>();

            CreateMap<UpdateQuestionViewModel, Question>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.Deleted, opt => opt.Ignore())
                .ForMember(dest => dest.Answers, opt => opt.Ignore())
                .ForMember(dest => dest.Section, opt => opt.Ignore())
                .ForMember(dest => dest.QuestionGroup, opt => opt.Ignore())
            ;

            CreateMap<Answer, AnswerViewModel>();

            CreateMap<AddAnswerViewModel, Answer>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.Active, opt => opt.UseValue(true))
                .ForMember(dest => dest.Deleted, opt => opt.UseValue(false))
                .ForMember(dest => dest.Question, opt => opt.Ignore())
            ;

            CreateMap<Answer, UpdateAnswerViewModel>();

            CreateMap<UpdateAnswerViewModel, Answer>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.Question, opt => opt.Ignore())
            ;

            CreateMap<Question, ExamQuestionViewModel>()
                .ForMember(dest => dest.GroupName, opt => opt.ResolveUsing(s =>
                {
                    return s.QuestionGroup?.Title ?? "";
                }))
                .ForMember(dest => dest.Answers, opt => opt.Ignore())
            ;

            CreateMap<Answer, ExamAnswerViewModel>();

            CreateMap<IdentityRole, AssessmentRoleViewModel>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.RoleID, opt => opt.ResolveUsing(s =>
                {
                    return s.Id;
                }))
                .ForMember(dest => dest.Name, opt => opt.ResolveUsing(s =>
                {
                    return s.Name;
                }))
            ;

            CreateMap<Question, SectionReportModel>()
                .ForMember(dest => dest.CorrectAnswers, opt => opt.Ignore())
                .ForMember(dest => dest.IncorrectAnswers, opt => opt.Ignore());
        }
    }
}
