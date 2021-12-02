using System;

namespace Mav.Models.SearchModels
{
    public class AssessmentListingModel
    {
        public int ID { get; set; }

        public int YearID { get; set; }

        public string RoleID { get; set; }

        public string Title { get; set; }

        public DateTime? CreatedOn { get; set; }

        public bool Active { get; set; }

        public bool Published { get; set; }

        public string TargetGroup { get; set; }
    }
}
