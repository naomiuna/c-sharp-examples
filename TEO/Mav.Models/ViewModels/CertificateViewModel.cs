using Mav.Models.SearchModels;
using System;
using System.Collections.Generic;

namespace Mav.Models.ViewModels
{
    public class CertificateViewModel
    {
        public int ID { get; set; }

        public Guid KeyID { get; set; }

        public string UserID { get; set; }

        public string UserName { get; set; }

        public string CentreName { get; set; }

        public string AssessmentName { get; set; }

        public int YearID { get; set; }

        public string YearDisplay { get; set; }

        public int TotalScore { get; set; }

        public int MaxScore { get; set; }

        public DateTime? SubmittedOn { get; set; }

        public string Grade { get; set; }

        public IList<UserAssessmentSectionListingModel> Sections { get; set; }
    }
}
