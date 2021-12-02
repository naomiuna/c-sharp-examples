using System;
using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class AddCentreViewModel
    {
        [Required]
        public string UserID { get; set; }

        [Required]
        public int TypeID { get; set; }

        [Required]
        public string Name { get; set; }

        public string Number { get; set; }

        public bool Enabled { get; set; }
    }
}
