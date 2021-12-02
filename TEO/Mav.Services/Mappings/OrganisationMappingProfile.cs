using AutoMapper;
using Mav.Data.Entities;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mav.Services.Mappings
{
    public class OrganisationMappingProfile : Profile
    {
        public OrganisationMappingProfile()
        {
            CreateMap<AddOrganisationViewModel, Organisation>();

            CreateMap<UpdateOrganisationViewModel, Organisation>();

            CreateMap<Organisation, UpdateOrganisationViewModel>();

            CreateMap<Organisation, OrganisationViewModel>();

            CreateMap<OrganisationViewModel, Organisation>();

            CreateMap<Organisation, OrganisationListingModel>();

            ////
            
            CreateMap<AddLicenceViewModel, Licence>();

            CreateMap<UpdateLicenceViewModel, Licence>();

            CreateMap<Licence, UpdateLicenceViewModel>();

            CreateMap<Licence, LicenceViewModel>();

            CreateMap<LicenceViewModel, Licence>();
        }
    }
}
