using Mav.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mav.Models.SearchModels
{
    public class OrganisationListingModel //Actually LicenceModel details
    {
        public string ID { get; set; }

        public string OrganisationName { get; set; }

        public int AcademicYear { get; set; }

        public bool Status { get; set; }

        public bool Paid { get; set; }

        public LicenceViewModel Licence { get; set; }
    }
}
