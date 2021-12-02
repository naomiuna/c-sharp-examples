namespace Mav.Models.SearchModels
{
    public class SectionListingModel
    {
        public int ID { get; set; }

        public int Number { get; set; }

        public string Title { get; set; }

        public string Reference { get; set; }

        public bool IsRandom { get; set; }

        public int? Quantity { get; set; }
    }
}
