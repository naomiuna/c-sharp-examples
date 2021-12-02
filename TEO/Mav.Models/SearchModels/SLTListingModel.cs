namespace Mav.Models.SearchModels
{
    public class SLTListingModel
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }
        
        public bool Enabled { get; set; }

        public UserAssessmentListingModel LatestAssessment { get; set; }
    }
}
