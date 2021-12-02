using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Mav.Data.Entities
{
    public class Timer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        public double TimeLimit { get; set; }

        public bool? Deleted { get; set; }

        public virtual Section Section { get; set; }
    }
}
