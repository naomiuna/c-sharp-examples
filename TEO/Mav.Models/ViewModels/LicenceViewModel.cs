using System;
using System.Collections.Generic;
using System.Text;

namespace Mav.Models.ViewModels
{
    public class LicenceViewModel
    {
        public int ID { get; set; }

        public int OrganisationID { get; set; }

        public int MaxCentres { get; set; }

        public double Cost { get; set; }

        public int AcademicYear { get; set; }

        public bool Paid { get; set; }

        public OrganisationViewModel Organisation { get; set; }
    }
}
