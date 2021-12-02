using System;
using System.Collections.Generic;
using System.Text;

namespace Mav.Models.ViewModels
{
    public class UserCentreViewModel
    {
        public int ID { get; set; }

        public int CentreID { get; set; }

        public string UserID { get; set; }

        public virtual CentreViewModel Centre { get; set; }
    }
}
