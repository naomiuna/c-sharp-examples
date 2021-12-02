using System;
using System.Collections.Generic;
using System.Text;

namespace Mav.Models.ReportModels
{
    public class CentreReportModel
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public string Number { get; set; }

        public int UsersCount { get; set; }

        public int AssStartedCount { get; set; }

        public int AssNotStartedCount { get; set; }

        public int AssCompletedCount { get; set; }

        public int MinScoreGainedCount { get; set; }

        public int MinScoreNotGainedCount { get; set; }
    }
}
