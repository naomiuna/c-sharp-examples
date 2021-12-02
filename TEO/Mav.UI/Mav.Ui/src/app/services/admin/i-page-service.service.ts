import { Observable } from 'rxjs/Observable';
import { PageFilterModel } from '../../models/search/page.filter.model';
import { PageListingViewModel } from '../../models/admin/page-listing.view.model';
import { Paginate } from '../../models/paginated.items';
import { PageViewModel } from '../../models/admin/page.view.model';
import { GenericResult } from '../../models/generic.result.model';

export interface IPageServiceService {

    getPageById<T>(id: number): Observable<T>;

    getPageList(filter: PageFilterModel): Observable<Paginate<PageListingViewModel>>;

    updatePage(page: PageViewModel): Observable<GenericResult<number>>;

}
