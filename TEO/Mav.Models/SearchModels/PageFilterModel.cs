namespace Mav.Models.SearchModels
{
    public class PageFilterModel
    {
        public int ParentID { get; set; }

        public int? NavTypeID { get; set; }

        public bool PublishedOnly { get; set; }

        public int PageNo { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string SearchField { get; set; }

        public string SearchTerm { get; set; }
    }
}
