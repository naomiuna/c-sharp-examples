using System;
using System.ComponentModel.DataAnnotations;

namespace Mav.Models.PageModels
{
    public class PageInfoViewModel
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public int PageID { get; set; }

        public DateTime ModifiedOn { get; set; }

        [Required(ErrorMessage = "Please enter a page title")]
        [Display(Name = "Page Title")]
        [StringLength(400, ErrorMessage = "Page title value is too long")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Please enter a page Url")]
        [Display(Name = "Page Url")]
        [StringLength(400, ErrorMessage = "Page Url value is too long")]
        public string Url { get; set; }

        public string Content { get; set; }
    }
}
