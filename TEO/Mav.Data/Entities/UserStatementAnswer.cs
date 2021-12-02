using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Mav.Data.Entities
{
    public class UserStatementAnswer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        [MaxLength(450)]
        public string UserID { get; set; }

        [Required]
        public int StatementID { get; set; }

        [Required]
        public int QuestionID { get; set; }

        public string Answer { get; set; }


        [ForeignKey(nameof(StatementID))]
        public virtual Statement Statement { get; set; }


        [ForeignKey(nameof(QuestionID))]
        public virtual StatementQuestion StatementQuestion { get; set; }
    }
}
