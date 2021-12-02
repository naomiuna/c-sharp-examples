using System;
using System.Collections.Generic;
using System.Text;

namespace Mav.Models.ViewModels
{
    public class StatementQuestionViewModel
    {
        public int ID { get; set; }

        public int StatementID { get; set; }
        public string Title { get; set; }

        public bool Active { get; set; }

    }
}
