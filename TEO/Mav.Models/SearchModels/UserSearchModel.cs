namespace Mav.Models.SearchModels
{
    public class UserSearchModel
    {
        public string CreatorID { get; set; }

        public int? CentreID { get; set; }

        public int PageNo { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string SearchField { get; set; }

        public string SearchTerm { get; set; }

        public string Role { get; set; }

        public int? Year { get; set; }
    }
}
