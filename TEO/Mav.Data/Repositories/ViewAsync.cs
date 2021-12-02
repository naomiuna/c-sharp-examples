using Mav.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Mav.Data.Repositories
{
    public class ViewAsync<T> : IViewAsync<T> where T : class
    {
        protected readonly DbContext _dbContext;
        protected readonly DbQuery<T> _dbQuery;

        protected readonly DbSet<Centre> _dbSetCentre;
        protected readonly DbSet<UserCentre> _dbSetUserCentre;
        protected readonly DbSet<UserAssessment> _dbSetUserAssessment;
        protected readonly DbSet<UserAssessmentSection> _dbSetUserAssessmentSection;

        public ViewAsync(DbContext dbContext)
        {
            _dbContext = dbContext;
            _dbQuery = _dbContext.Query<T>();
        }

        public async Task<IEnumerable<T>> ReturnView()
        {
            IQueryable<T> query = _dbQuery;
            return await query.ToListAsync();
        }

        public async Task<T> SingleAsync(Expression<Func<T, bool>> predicate = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            bool disableTracking = true)
        {
            IQueryable<T> query = _dbQuery;
            if (disableTracking)
            {
                query = query.AsNoTracking();
            }
            if(predicate != null)
            {
                query = query.Where(predicate);
            }
            if(orderBy != null)
            {
                return await orderBy(query).FirstOrDefaultAsync();
            }
            else
            {
                return await query.FirstOrDefaultAsync();
            }
        }

        public async Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> predicate,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            bool disableTracking = true)
        {
            IQueryable<T> query = _dbQuery;
            if (disableTracking)
            {
                query = query.AsNoTracking();
            }

            if (predicate != null)
            {
                query = query.Where(predicate);
            }

            if (orderBy != null)
            {
                return await orderBy(query).ToListAsync();
            }
            else
            {
                return await query.ToListAsync();
            }
        }
    }
}
