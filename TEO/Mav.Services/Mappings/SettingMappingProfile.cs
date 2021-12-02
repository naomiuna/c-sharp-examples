using AutoMapper;
using Mav.Data.Entities;
using Mav.Models.ViewModels;

namespace Mav.Services.Mappings
{
    public class SettingMappingProfile : Profile
    {
        public SettingMappingProfile()
        {
            CreateMap<Setting, SettingViewModel>();

            CreateMap<SettingViewModel, Setting>();

            CreateMap<CentreType, CentreTypeViewModel>();

            CreateMap<CentreTypeViewModel, CentreType>()
                .ForMember(dest => dest.Deleted, opt => opt.Ignore())
            ;

            CreateMap<OrganisationType, OrganisationTypeViewModel>();

            CreateMap<OrganisationTypeViewModel, OrganisationType>()
                .ForMember(dest => dest.Deleted, opt => opt.Ignore())
            ;

            CreateMap<AssessmentYear, AssessmentYearViewModel>();

            CreateMap<AssessmentYearViewModel, AssessmentYear>()
                .ForMember(dest => dest.Deleted, opt => opt.Ignore())
            ;
        }
    }
}
