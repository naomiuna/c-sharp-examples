using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Mav.Data.Repositories
{
    public class IdentityUnitOfWork<TContext> : IRepositoryFactory, IIdentityUnitOfWork<TContext>, IIdentityUnitOfWork where TContext : DbContext
    {
        private Dictionary<Type, object> _repositories;
        private Dictionary<Type, object> _views;

        public IdentityUnitOfWork(TContext context)
        {
            Context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public IRepository<TEntity> GetRepository<TEntity>() where TEntity : class
        {
            if (_repositories == null) _repositories = new Dictionary<Type, object>();

            var type = typeof(TEntity);
            if (!_repositories.ContainsKey(type)) _repositories[type] = new Repository<TEntity>(Context);
            return (IRepository<TEntity>)_repositories[type];
        }

        public IRepositoryAsync<TEntity> GetRepositoryAsync<TEntity>() where TEntity : class
        {
            if (_repositories == null) _repositories = new Dictionary<Type, object>();

            var type = typeof(TEntity);
            if (!_repositories.ContainsKey(type)) _repositories[type] = new RepositoryAsync<TEntity>(Context);
            return (IRepositoryAsync<TEntity>)_repositories[type];
        }

        public IViewAsync<TEntity> GetViewAsync<TEntity>() where TEntity : class
        {
            if (_views == null) _views = new Dictionary<Type, object>();

            var type = typeof(TEntity);
            if (!_views.ContainsKey(type)) _views[type] = new ViewAsync<TEntity>(Context);
            return (IViewAsync<TEntity>)_views[type];
        }

        public TContext Context { get; }

        public int SaveChanges()
        {
            return Context.SaveChanges(true);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await Context.SaveChangesAsync(true);
        }

        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    Context.Dispose();
                }
            }
            disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
