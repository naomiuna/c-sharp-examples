using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class AddUserCentreViewModel
    {
        [Required]
        public string UserID { get; set; }

        [Required]
        public int CentreID { get; set; }
    }
}
