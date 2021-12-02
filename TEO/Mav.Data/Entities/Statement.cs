using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class Statement
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        public int Number { get; set; }

        [Required]
        [MaxLength(4000)]
        public string Content { get; set; }
        
        public bool? Deleted { get; set; }
        
        public virtual ICollection<StatementQuestion> Questions { get; set; } = new List<StatementQuestion>();
    }
}
