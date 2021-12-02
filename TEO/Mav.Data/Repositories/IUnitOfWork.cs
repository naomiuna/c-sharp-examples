using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Mav.Data.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<TEntity> GetRepository<TEntity>() where TEntity : class;
        IRepositoryAsync<TEntity> GetRepositoryAsync<TEntity>() where TEntity : class;

        IViewAsync<TEntity> GetViewAsync<TEntity>() where TEntity : class;

        int SaveChanges();
        Task<int> SaveChangesAsync();
    }

    public interface IUnitOfWork<TContext> : IUnitOfWork where TContext : DbContext
    {
        TContext Context { get; }
    }
}
