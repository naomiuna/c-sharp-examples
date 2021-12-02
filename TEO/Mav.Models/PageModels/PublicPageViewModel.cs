namespace Mav.Models.PageModels
{
    public class PublicPageViewModel
    {
        public int ID { get; set; }

        public int TypeID { get; set; }

        public int OrderID { get; set; }

        public int? ParentID { get; set; }

        public int NavigationTypeID { get; set; }

        public string Title { get; set; }

        public string Url { get; set; }

        public string Content { get; set; }
    }
}
