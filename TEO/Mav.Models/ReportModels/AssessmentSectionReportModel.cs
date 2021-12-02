namespace Mav.Models.ReportModels
{
    public class AssessmentSectionReportModel
    {
        public int ID { get; set; }

        public int AssessmentID { get; set; }

        public int Number { get; set; }

        public string Title { get; set; }

        public int Attempts { get; set; }
    }
}
