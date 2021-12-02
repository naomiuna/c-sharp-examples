using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class Certificate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        public int AssessmentID { get; set; }

        [Required]
        public bool Active { get; set; }

        public bool? Deleted { get; set; }

        [ForeignKey(nameof(AssessmentID))]
        public virtual Assessment Assessment { get; set; }
    }
}
