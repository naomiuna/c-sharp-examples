using Mav.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Mav.Data.Repositories
{
    public interface IViewAsync<T> where T : class
    {
        Task<IEnumerable<T>> ReturnView();

        Task<T> SingleAsync(Expression<Func<T, bool>> predicate = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            bool disableTracking = true);

        Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> predicate,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            bool disableTracking = true);
    }
}
