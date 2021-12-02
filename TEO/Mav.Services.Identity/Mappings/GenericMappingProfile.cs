using AutoMapper;
using Mav.Data.Repositories;

namespace Mav.Services.Identity.Mappings
{
    public class GenericMappingProfile : Profile
    {
        public GenericMappingProfile()
        {
            CreateMap(typeof(IPaginate<>), typeof(IPaginate<>));
            CreateMap(typeof(Paginate<>), typeof(Paginate<>));
        }
    }
}
