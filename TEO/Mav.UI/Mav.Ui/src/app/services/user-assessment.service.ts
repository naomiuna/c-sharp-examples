import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { IUserAssessmentService } from './i-user-assessment.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { GlobalSettingsService } from './global-settings.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { UserAssessmentSearchModel } from '../models/search/user.assessment.search.model';
import { UserAssessmentListingModel } from '../models/search/user.assessment.listing.model';
import { Paginate } from '../models/paginated.items';
import { GenericResult } from '../models/generic.result.model';
import { AddUserAssessmentViewModel } from '../models/add.user.assessment.view.model';
import { UpdateUserAssessmentViewModel } from '../models/update.user.assessment.view.model';
import { SubmitUserAssessmentViewModel } from '../models/submit.user.assessment.view.model';

@Injectable()
export class UserAssessmentService extends ServiceBase implements IUserAssessmentService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getUserAssessmentById<T>(id: number): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentEndpoints.getUserAssessmentById
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

  public getUserAssessmentListByUserId(filter: UserAssessmentSearchModel): Observable<Paginate<UserAssessmentListingModel>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentEndpoints.getUserAssessmentListByUserId}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<UserAssessmentSearchModel>(endPoint, filter, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getUserLatestAssessment(id: string): Observable<UserAssessmentListingModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentEndpoints.getUserLatestAssessment
      .replace('{id}', id)}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<UserAssessmentListingModel>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getUserHistory(filter: UserAssessmentSearchModel): Observable<Paginate<UserAssessmentListingModel>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentEndpoints.getUserHistory}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<UserAssessmentSearchModel>(endPoint, filter, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public createUserAssessment(newItem: AddUserAssessmentViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentEndpoints.createUserAssessment}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AddUserAssessmentViewModel>(endPoint, newItem, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateUserAssessment(item: UpdateUserAssessmentViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentEndpoints.updateUserAssessment}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<UpdateUserAssessmentViewModel>(endPoint, item, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public submitUserAssessment(item: SubmitUserAssessmentViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentEndpoints.submitUserAssessment}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<SubmitUserAssessmentViewModel>(endPoint, item, options)
      .pipe(
        catchError(this.handleError)
      );
  }
}
