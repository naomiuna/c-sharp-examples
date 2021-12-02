using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class AssessmentGrade
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public int AssessmentID { get; set; }

        public int PassScore { get; set; }

        public int MeritScore { get; set; }

        public int DistinctionScore { get; set; }

        [ForeignKey(nameof(AssessmentID))]
        public virtual Assessment Assessment { get; set; }
    }
}
