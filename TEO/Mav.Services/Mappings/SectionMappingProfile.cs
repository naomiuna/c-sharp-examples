using AutoMapper;
using Mav.Data.Entities;
using Mav.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mav.Services.Mappings
{
    public class SectionMappingProfile : Profile
    {
        public SectionMappingProfile()
        {
            CreateMap<TimerViewModel, Timer>();
        }
    }
}
