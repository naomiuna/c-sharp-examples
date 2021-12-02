namespace Mav.Models.SearchModels
{
    public class CentreSearchModel
    {
        public int PageNo { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string SearchField { get; set; }

        public string SearchTerm { get; set; }

        public int OrderId { get; set; }

        public int CentreId { get; set; }
    }
}
