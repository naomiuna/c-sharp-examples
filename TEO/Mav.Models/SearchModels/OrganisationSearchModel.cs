using System;
using System.Collections.Generic;
using System.Text;

namespace Mav.Models.SearchModels
{
    public class OrganisationSearchModel
    {
        public int PageNo { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string SearchField { get; set; }

        public string SearchTerm { get; set; }

        public int? FilterID { get; set; }

        public int OrderID { get; set; }
    }
}
