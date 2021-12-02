using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Mav.Data.Entities
{
    public class UserSectionTimer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public double TimeLimit { get; set; }

        public double TimePassed { get; set; }

        public UserAssessmentSection UserAssessmentSection { get; set; }
    }
}
