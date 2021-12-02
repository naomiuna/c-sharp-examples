using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class UserCentre
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        public int CentreID { get; set; }

        [Required]
        [MaxLength(450)]
        public string UserID { get; set; }

        [ForeignKey(nameof(CentreID))]
        public virtual Centre Centre { get; set; }
    }
}
