using System;

namespace Mav.Models.PageModels
{
    public class PageListingViewModel
    {
        public int ID { get; set; }

        public int TypeID { get; set; }

        public int OrderID { get; set; }

        public int? ParentID { get; set; }

        public int NavigationTypeID { get; set; }

        public bool Published { get; set; }

        public string Title { get; set; }

        public string Url { get; set; }

        public DateTime ModifiedOn { get; set; }
    }
}
