using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class Question
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public int? SectionID { get; set; }

        public int? GroupID { get; set; }

        [Required]
        [MaxLength(500)]
        public string Title { get; set; }

        [Required]
        [MaxLength(500)]
        public string HintText { get; set; }

        [Required]
        public int Number { get; set; }

        [Required]
        public int TypeID { get; set; }

        public int? Selections { get; set; }

        public int? YesNoCorrectID { get; set; }

        [Required]
        public bool Active { get; set; }

        public bool? Deleted { get; set; }

        [ForeignKey(nameof(SectionID))]
        public virtual Section Section { get; set; }

        [ForeignKey(nameof(GroupID))]
        public virtual QuestionGroup QuestionGroup { get; set; }

        public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();
    }
}
