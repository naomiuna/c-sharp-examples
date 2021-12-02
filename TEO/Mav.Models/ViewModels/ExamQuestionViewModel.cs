using System.Collections.Generic;

namespace Mav.Models.ViewModels
{
    public class ExamQuestionViewModel
    {
        public int ID { get; set; }

        public string GroupName { get; set; }

        public int Number { get; set; }

        public int TypeID { get; set; }

        public int? Selections { get; set; }

        public string Title { get; set; }

        public List<ExamAnswerViewModel> Answers { get; set; }
    }

    public class ExamAnswerViewModel
    {
        public int ID { get; set; }

        public string Title { get; set; }

        public int OrderID { get; set; }
    }
}
