using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Mav.Data.Repositories
{
    public interface IIdentityUnitOfWork : IDisposable
    {
        IRepository<TEntity> GetRepository<TEntity>() where TEntity : class;
        IRepositoryAsync<TEntity> GetRepositoryAsync<TEntity>() where TEntity : class;

        int SaveChanges();
        Task<int> SaveChangesAsync();
    }

    public interface IIdentityUnitOfWork<TContext> : IUnitOfWork where TContext : DbContext
    {
        TContext Context { get; }
    }
}
