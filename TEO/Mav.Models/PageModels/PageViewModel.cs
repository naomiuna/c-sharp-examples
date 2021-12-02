using System.ComponentModel.DataAnnotations;

namespace Mav.Models.PageModels
{
    public class PageViewModel
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public int TypeID { get; set; }

        [Required]
        public int OrderID { get; set; }

        public int? ParentID { get; set; }

        [Required]
        public int NavigationTypeID { get; set; }

        [Required]
        public bool Published { get; set; }

        public PageInfoViewModel PageInfo { get; set; }
    }
}
