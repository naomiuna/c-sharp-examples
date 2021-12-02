using System;
using System.Collections.Generic;
using System.Text;

namespace Mav.Models.ReportModels
{
    public class SectionReportModel
    {
        public int ID { get; set; }
        public int Number { get; set; }
        public string Title { get; set; }
        public int CorrectAnswers { get; set; }
        public int IncorrectAnswers { get; set; }
        public int SectionId { get; set; }
    }
}
