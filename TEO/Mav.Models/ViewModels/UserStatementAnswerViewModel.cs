using System;
using System.Collections.Generic;
using System.Text;

namespace Mav.Models.ViewModels
{
    public class UserStatementAnswerViewModel
    {
        public int ID { get; set; }
        public int StatementID { get; set; }
        public int QuestionID { get; set; }
        public string UserID { get; set; }
        public string Answer { get; set; }
    }
}
