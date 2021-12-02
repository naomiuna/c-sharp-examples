using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class AssessmentYear
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public int YearID { get; set; }

        public bool? Deleted { get; set; }

        [Required]
        [MaxLength(10)]
        public string Display { get; set; }
    }
}
