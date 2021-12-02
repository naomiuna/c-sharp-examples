namespace Mav.Models.SearchModels
{
    public class AssessmentSearchModel
    {
        public int PageNo { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string SearchField { get; set; }

        public string SearchTerm { get; set; }

        public int? YearID { get; set; }

        public int? StatusID { get; set; }

        public int OrderID { get; set; }
    }
}
