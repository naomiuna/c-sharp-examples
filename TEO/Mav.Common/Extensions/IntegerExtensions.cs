using System;
using System.Collections.Generic;

namespace Mav.Common.Extensions
{
    public static class IntegerExtensions
    {
        public static T ConvertIntToTypeValue<T>(this int value)
        {
            return (T)Convert.ChangeType(value, typeof(T));
        }

        public static int GetPagingIndex(this int pageNo, int pageSize)
        {
            return (pageNo - 1) * pageSize;
        }

        public static List<int> GetRandomIntCollection(List<int> options, int quantity)
        {
            var r = new List<int>();

            if (quantity > options.Count) { quantity = options.Count; }
            if (quantity == options.Count) { return options; }

            var rnd = new Random();
            while (r.Count < quantity)
            {
                var rndIdx = rnd.Next(1, options.Count);
                var rndId = options[rndIdx - 1];
                if (r.IndexOf(rndId) == -1) { r.Add(rndId); }
            }

            return r;
        }

        public static int GetCurrentAcademicYear(this int year)
        {
            var dtn = DateTime.UtcNow;
            return dtn.Month < 9 ? dtn.Year - 1 : dtn.Year;
        }
    }
}
