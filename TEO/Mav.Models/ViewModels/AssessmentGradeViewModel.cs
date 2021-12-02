using System;
using System.Collections.Generic;
using System.Text;

namespace Mav.Models.ViewModels
{
    public class AssessmentGradeViewModel
    {
        public int ID { get; set; }

        public int AssessmentID { get; set; }

        public int PassScore { get; set; }

        public int MeritScore { get; set; }

        public int DistinctionScore { get; set; }
    }
}
