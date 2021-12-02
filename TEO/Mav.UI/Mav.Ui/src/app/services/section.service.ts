import { Injectable } from '@angular/core';
import { ISectionService } from './i-section.service';
import { ServiceBase } from './service-base';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { GlobalSettingsService } from './global-settings.service';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../models/generic.result.model';
import { SectionListingModel } from '../models/search/section.listing.model';
import { AddSectionViewModel } from '../models/admin/add-section.view.model';
import { UpdateSectionViewModel } from '../models/admin/update-section.view.model';
import { SectionSearchModel } from '../models/search/section.search.model';
import { Paginate } from '../models/paginated.items';

@Injectable()
export class SectionService extends ServiceBase implements ISectionService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getSectionById<T>(id: number): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiSectionEndpoints.getSectionById
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

 

  public getSectionList(assessmentId: number): Observable<SectionListingModel[]> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiSectionEndpoints.getSectionList
      .replace('{id}', assessmentId.toString())}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getSectionListPages(filter: SectionSearchModel): Observable<Paginate<SectionListingModel>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiSectionEndpoints.getSectionListPages}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<SectionListingModel>(endPoint, filter, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public createSection(newItem: AddSectionViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiSectionEndpoints.createSection}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AddSectionViewModel>(endPoint, newItem, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateSection(item: UpdateSectionViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiSectionEndpoints.updateSection}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<UpdateSectionViewModel>(endPoint, item, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteSection(id: number): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiSectionEndpoints.deleteSection
      .replace('{id}', id.toString())}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post(endPoint, null, options)
      .pipe(
        catchError(this.handleError)
      );
  }

 

}
