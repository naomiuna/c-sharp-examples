using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class Answer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        public int QuestionID { get; set; }

        [Required]
        [MaxLength(500)]
        public string Title { get; set; }

        [Required]
        public bool IsCorrect { get; set; }

        public int? OrderID { get; set; }

        [Required]
        public bool Active { get; set; }

        public bool? Deleted { get; set; }

        [ForeignKey(nameof(QuestionID))]
        public virtual Question Question { get; set; }
    }
}
