using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class UpdateCentreViewModel
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public int TypeID { get; set; }

        [Required]
        public string Name { get; set; }

        public string Number { get; set; }

        [Required]
        public bool Enabled { get; set; }
    }
}
