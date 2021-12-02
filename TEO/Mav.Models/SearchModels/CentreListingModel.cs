using System;

namespace Mav.Models.SearchModels
{
    public class CentreListingModel
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public string Number { get; set; }

        public string OfficerName { get; set; }

        public string OfficerEmail { get; set; }

        public int? Invigilators { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        public bool Enabled { get; set; }
    }
}
