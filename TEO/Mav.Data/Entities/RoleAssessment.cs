using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mav.Data.Entities
{
    public class RoleAssessment
    {
        public int Id { get; set; }

        public string RoleId { get; set; }

        public int AssessmentId { get; set; }

        public virtual Assessment Assessment { get; set; }
    }

}
