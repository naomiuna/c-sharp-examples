using AutoMapper;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using Mav.Services.Identity.Models;

namespace Mav.Services.Identity.Mappings
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<ApplicationUser, UserViewModel>()
                .ForMember(dest => dest.Role, opt => opt.Ignore())
            ;

            CreateMap<ApplicationUser, ExamUserViewModel>()
                .ForMember(dest => dest.CanEditCentre, opt => opt.Ignore())
            ;

            CreateMap<ApplicationUser, ExamOfficerViewModel>()
                .ForMember(dest => dest.CentreID, opt => opt.Ignore())
            ;

            CreateMap<ApplicationUser, InvigilatorViewModel>()
                .ForMember(dest => dest.CentreID, opt => opt.Ignore())
            ;

            CreateMap<ApplicationUser, InvigilatorListingModel>()
                .ForMember(dest => dest.LatestAssessment, opt => opt.Ignore())
            ;

            CreateMap<ApplicationUser, SLTListingModel>()
               .ForMember(dest => dest.LatestAssessment, opt => opt.Ignore())
           ;

            CreateMap<ApplicationUser, UserListingModel>()
                .ForMember(dest => dest.Role, opt => opt.Ignore())
            ;
        }
    }
}
