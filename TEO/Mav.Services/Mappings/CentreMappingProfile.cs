using AutoMapper;
using Mav.Data.Entities;
using Mav.Models.ReportModels;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;

namespace Mav.Services.Mappings
{
    public class CentreMappingProfile : Profile
    {
        public CentreMappingProfile()
        {
            CreateMap<AddCentreViewModel, Centre>()
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(s => s.UserID))
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedOn, opt => opt.Ignore())
                .ForMember(dest => dest.Deleted, opt => opt.Ignore())
                .ForMember(dest => dest.Assessments, opt => opt.Ignore())
                .ForMember(dest => dest.CentreType, opt => opt.Ignore())
                .ForMember(dest => dest.Assessments, opt => opt.Ignore())
            ;

            CreateMap<Centre, CentreViewModel>();

            CreateMap<Centre, CentreTotalsViewModel>()
                .ForMember(dest => dest.MaxAllowed, opt => opt.Ignore())
                .ForMember(dest => dest.CurrentTotal, opt => opt.Ignore())
            ; 

            CreateMap<UpdateCentreViewModel, Centre>()
                .ForMember(dest => dest.CreatedOn, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.Deleted, opt => opt.Ignore())
                .ForMember(dest => dest.CentreType, opt => opt.Ignore())
                .ForMember(dest => dest.Assessments, opt => opt.Ignore())
            ;

            CreateMap<Centre, CentreListingModel>()
                .ForMember(dest => dest.Invigilators, opt => opt.Ignore())
                .ForMember(dest => dest.OfficerName, opt => opt.Ignore())
                .ForMember(dest => dest.OfficerEmail, opt => opt.Ignore())
            ;

            CreateMap<CentreViewModel, CentreReportModel>()
                .ForMember(dest => dest.UsersCount, opt => opt.Ignore())
                .ForMember(dest => dest.AssStartedCount, opt => opt.Ignore())
                .ForMember(dest => dest.AssNotStartedCount, opt => opt.Ignore())
                .ForMember(dest => dest.AssCompletedCount, opt => opt.Ignore())
                .ForMember(dest => dest.MinScoreGainedCount, opt => opt.Ignore())
                .ForMember(dest => dest.MinScoreNotGainedCount, opt => opt.Ignore())
            ;
        }
    }
}
