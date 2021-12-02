import { Injectable } from '@angular/core';
import { ServiceBase } from '../service-base';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalSettingsService } from '../global-settings.service';
import { AuthService } from '../auth.service';
import { IPageServiceService } from './i-page-service.service';
import { Observable } from 'rxjs/Observable';
import { PageFilterModel } from '../../models/search/page.filter.model';
import { PageViewModel } from '../../models/admin/page.view.model';
import { GenericResult } from '../../models/generic.result.model';
import { Paginate } from '../../models/paginated.items';
import { PageListingViewModel } from '../../models/admin/page-listing.view.model';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PageServiceService extends ServiceBase implements IPageServiceService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getPageById<T>(id: number): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiPageEndpoints.getPageById
      .replace('{id}', id.toString())}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<T>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getPageList(filter: PageFilterModel): Observable<Paginate<PageListingViewModel>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiPageEndpoints.getPageList}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<PageFilterModel>(endPoint, filter, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updatePage(page: PageViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiPageEndpoints.updatePage}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<PageViewModel>(endPoint, page, options)
      .pipe(
        catchError(this.handleError)
      );
  }

}
