using Mav.Data.Entities;
using Mav.Models.SearchModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mav.Models.ViewModels
{
    public class OrganisationViewModel
    {
        public int ID { get; set; }

        public int TypeID { get; set; }

        public int LicenceID { get; set; }

        public string OrganisationName { get; set; }

        public string AddressLine1 { get; set; }

        public string AddressLine2 { get; set; }

        public string AddressLine3 { get; set; }

        public string MainContactName { get; set; }

        public string MainContactEmail { get; set; }

        public string LeadFinancialName { get; set; }

        public string LeadFinancialEmail { get; set; }

        public string LeadFinancialNumber { get; set; }

        public int CentreLimit { get; set; }

        public LicenceViewModel Licence { get; set; }

        public OrganisationTypeViewModel OrganisationType { get; set; }
    }
}
