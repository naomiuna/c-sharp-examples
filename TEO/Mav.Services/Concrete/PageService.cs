using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using Mav.Common.Extensions;
using Mav.Common.Models;
using Mav.Data.Entities;
using Mav.Data.Repositories;
using Mav.Models.PageModels;
using Mav.Models.SearchModels;
using Mav.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace Mav.Services.Concrete
{
    public class PageService : IPageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PageService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<T> GetPageById<T>(int id)
        {
            var pageRepo = _unitOfWork.GetRepositoryAsync<Page>();
            var r = await pageRepo.SingleAsync(
                predicate: x => x.ID == id && x.Deleted != true,
                include: source => source
                    .Include(c1 => c1.PageInfos)
            );
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        public async Task<T> GetPublicPageById<T>(int id)
        {
            var pageRepo = _unitOfWork.GetRepositoryAsync<Page>();
            var r = await pageRepo.SingleAsync(
                predicate: x => x.ID == id && x.Deleted != true && x.Published == true,
                include: source => source
                    .Include(c1 => c1.PageInfos)
            );
            var mR = _mapper.Map<T>(r);
            return mR;
        }

        public async Task<IPaginate<T>> GetPageList<T>(PageFilterModel filter)
        {
            var pageRepo = _unitOfWork.GetRepositoryAsync<Page>();
            Expression<Func<Page, bool>> whereExpr = x => x.Deleted != true
                && ((filter.ParentID == 0 && !x.ParentID.HasValue) || x.ParentID == filter.ParentID)
                && (!filter.NavTypeID.HasValue || x.NavigationTypeID == filter.NavTypeID)
                && (!filter.PublishedOnly || x.Published == true)
            ;

            Func<IQueryable<Page>, IOrderedQueryable<Page>> orderExpr = query => query.OrderBy(y => y.OrderID);

            Func<IQueryable<Page>, IIncludableQueryable<Page, object>> include = source => source.Include(c1 => c1.PageInfos);
            
            var items = await pageRepo.GetListAsync(whereExpr,
                orderExpr,
                include,
                filter.PageNo - 1,
                filter.PageSize,
                true);

            var mR = _mapper.Map<Paginate<Page>, Paginate<T>>(items);
            return mR;
        }

        public async Task<GenericResult<T>> UpdatePage<T>(PageViewModel m)
        {
            var r = new GenericResult<T>();

            var pageRepo = _unitOfWork.GetRepositoryAsync<Page>();
            var pageInfoRepo = _unitOfWork.GetRepositoryAsync<PageInfo>();

            var page = await pageRepo.SingleAsync(x => x.ID == m.ID);
            if (page == null) {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The page record could not be found";
                return r;
            }

            var pageInfo = await pageInfoRepo.SingleAsync(x => x.ID == m.PageInfo.ID);
            if (pageInfo == null) {
                r.Status = EnumStatusCode.NotFound;
                r.Message = "The page info record could not be found";
                return r;
            }

            try {
                _mapper.Map(m, page);
                _mapper.Map(m.PageInfo, pageInfo);

                pageRepo.UpdateAsync(page);
                pageInfoRepo.UpdateAsync(pageInfo);

                await _unitOfWork.SaveChangesAsync();

                r.Status = EnumStatusCode.Ok;
                r.KeyID = page.ID.ConvertIntToTypeValue<T>();
            } catch (Exception ex) {
                r.Status = EnumStatusCode.UnexpectedError;
                r.Message = ex?.InnerException.Message ?? ex.Message ?? "";
            }

            return r;
        }
    }
}
