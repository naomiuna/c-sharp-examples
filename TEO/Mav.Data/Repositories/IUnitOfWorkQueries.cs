using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mav.Data.Repositories
{
    public interface IUnitOfWorkQueries : IDisposable
    {
        IViewAsync<TEntity> GetViewAsync<TEntity>() where TEntity : class;
    }

    public interface IUnitOfWorkQueries<TContext> : IUnitOfWork where TContext : DbContext
    {
        TContext Context { get; }
    }
}
