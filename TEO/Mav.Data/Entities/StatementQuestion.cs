using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Mav.Data.Entities
{
    public class StatementQuestion
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public int StatementID { get; set; }

        [Required]
        [MaxLength(500)]
        public string Title { get; set; }

        [Required]
        public bool Active { get; set; }

        public bool? Deleted { get; set; }

        [ForeignKey(nameof(StatementID))]
        public virtual Statement Statement { get; set; }
    }
}
