using AutoMapper;
using System.Linq;
using Mav.Data.Entities;
using Mav.Models.PageModels;

namespace Mav.Services.Mappings
{
    public class PageMappingProfile : Profile
    {
        public PageMappingProfile()
        {
            CreateMap<Page, PageViewModel>()
                .ForMember(d => d.PageInfo, opt => opt.MapFrom(s => s.PageInfos.LastOrDefault()))
            ;

            CreateMap<PageViewModel, Page>()
                .ForMember(dest => dest.Parent, opt => opt.Ignore())
                .ForMember(dest => dest.Deleted, opt => opt.Ignore())
                .ForMember(dest => dest.PageInfos, opt => opt.Ignore())
            ;

            CreateMap<Page, PublicPageViewModel>()
                .ForMember(d => d.Title, opt => opt.MapFrom(s => s.PageInfos.LastOrDefault().Title))
                .ForMember(d => d.Url, opt => opt.MapFrom(s => s.PageInfos.LastOrDefault().Url))
                .ForMember(d => d.Content, opt => opt.MapFrom(s => s.PageInfos.LastOrDefault().Content))
            ;

            CreateMap<Page, PageListingViewModel>()
                .ForMember(d => d.Title, opt => opt.MapFrom(s => s.PageInfos.LastOrDefault().Title))
                .ForMember(d => d.Url, opt => opt.MapFrom(s => s.PageInfos.LastOrDefault().Url))
                .ForMember(d => d.ModifiedOn, opt => opt.MapFrom(s => s.PageInfos.LastOrDefault().ModifiedOn))
            ;

            CreateMap<PageInfo, PageInfoViewModel>();

            CreateMap<PageInfoViewModel, PageInfo>()
                .ForMember(dest => dest.CreatedOn, opt => opt.Ignore())
                .ForMember(dest => dest.Page, opt => opt.Ignore())
            ;
        }
    }
}