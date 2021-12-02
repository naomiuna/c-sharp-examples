using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class QuestionGroup
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public int? SectionID { get; set; }

        [Required]
        public int OrderId { get; set; }

        [Required]
        [MaxLength(400)]
        public string Title { get; set; }

        public bool? Deleted { get; set; }

        [ForeignKey(nameof(SectionID))]
        public virtual Section Section { get; set; }

        public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
    }
}
