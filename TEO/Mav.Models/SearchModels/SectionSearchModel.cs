namespace Mav.Models.SearchModels
{
    public class SectionSearchModel
    {
        public int PageNo { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public int AssessmentID { get; set; }

        public int SectionID { get; set; }
    }
}
