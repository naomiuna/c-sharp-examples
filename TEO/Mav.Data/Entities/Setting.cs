using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class Setting
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(400)]
        public string Entry { get; set; }

        /// <summary>
        /// System.String | System.Int32 | System.Boolean
        /// </summary>
        [Required]
        [MaxLength(35)]
        public string DataType { get; set; }

        [MaxLength(200)]
        public string Description { get; set; }

    }
}
