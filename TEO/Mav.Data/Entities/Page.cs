using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class Page
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        public int TypeID { get; set; }

        public int? ParentID { get; set; }

        public int NavigationTypeID { get; set; }

        public int? OrderID { get; set; }

        public bool Published { get; set; }

        public bool Deleted { get; set; }

        [ForeignKey(nameof(ParentID))]
        public virtual Page Parent { get; set; }

        public virtual ICollection<PageInfo> PageInfos { get; set; } = new List<PageInfo>();
    }
}
