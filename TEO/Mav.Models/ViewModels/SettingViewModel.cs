using System.ComponentModel.DataAnnotations;

namespace Mav.Models.ViewModels
{
    public class SettingViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Please enter your setting name")]
        [StringLength(100, ErrorMessage = "Setting name is too long")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter your setting value")]
        [StringLength(400, ErrorMessage = "Setting value is too long")]
        public string Entry { get; set; }

        [Required(ErrorMessage = "Please enter your setting data type")]
        [StringLength(35, ErrorMessage = "Setting data type is too long")]
        public string DataType { get; set; }

        [Required(ErrorMessage = "Please enter your setting description")]
        [StringLength(200, ErrorMessage = "Setting description is too long")]
        public string Description { get; set; }
    }
}
