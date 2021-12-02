namespace Mav.Models.SearchModels
{
    public class UserAssessmentSearchModel
    {
        public string UserID { get; set; }

        public int? YearID { get; set; }

        public int PageNo { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string SearchField { get; set; }

        public string SearchTerm { get; set; }

        public string Role { get; set; }
    }
}
