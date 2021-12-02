using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class PageInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        public int PageID { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime ModifiedOn { get; set; }

        [MaxLength(400)]
        public string Title { get; set; }

        [MaxLength(400)]
        public string Url { get; set; }

        public string Content { get; set; }

        [ForeignKey(nameof(PageID))]
        public virtual Page Page { get; set; }
    }
}
