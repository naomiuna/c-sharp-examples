namespace Mav.Models.SearchModels
{
    public class UserAssessmentSectionSearchModel
    {
        public int UserAssessmentID { get; set; }

        public int PageNo { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string SearchField { get; set; }

        public string SearchTerm { get; set; }
    }
}
