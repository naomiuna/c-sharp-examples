import { Injectable } from '@angular/core';
import { IUserServiceService } from './i-user-service.service';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { GenericResult } from '../models/generic.result.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GlobalSettingsService } from './global-settings.service';
import { AuthService } from './auth.service';
import { InvigilatorViewModel } from '../models/invigilator.view.model';
import { ExamUserViewModel } from '../models/user.exam.view.model';
import { ServiceBase } from './service-base';
import { Paginate } from '../models/paginated.items';
import { InvigilatorListingModel } from '../models/invigilator.listing.model';
import { SLTListingModel } from '../models/SLT.listing.model';
import { UserSearchModel } from '../models/search/user.search.model';
import { UserListingModel } from '../models/user.listing.model';
import { UserViewModel } from '../models/user.view.model';
import { AddUserViewModel } from '../models/add.user.view.model';
import { AddInvigilatorViewModel } from '../models/add.invigilator.view.model';

@Injectable()
export class UserServiceService extends ServiceBase implements IUserServiceService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getCurrentUser<T>(): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserEndpoints.getMyDetails}`;
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

  public getUser(): Observable<UserViewModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserEndpoints.getCurrentUser}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<UserViewModel>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getUserById<T>(id: string): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserEndpoints.getUserById
      .replace('{id}', id)}`;
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

  public getExamInvigilatorDetails(id: string): Observable<InvigilatorViewModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserEndpoints.getExamInvigilatorDetails
      .replace('{id}', id)}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<InvigilatorViewModel>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getInvigilatorSearch(filter: UserSearchModel): Observable<Paginate<InvigilatorListingModel>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserEndpoints.getInvigilatorSearch}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<UserSearchModel>(endPoint, filter, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getSLTSearch(filter: UserSearchModel): Observable<Paginate<SLTListingModel>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserEndpoints.getSLTSearch}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<UserSearchModel>(endPoint, filter, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getOfficerSearch(filter: UserSearchModel): Observable<Paginate<UserListingModel>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserEndpoints.getOfficerSearch}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<UserSearchModel>(endPoint, filter, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getAdminUserSearch(filter: UserSearchModel): Observable<Paginate<UserListingModel>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserEndpoints.getAdminUserSearch}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<UserSearchModel>(endPoint, filter, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public createUser(user: AddUserViewModel): Observable<GenericResult<string>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserEndpoints.createUser}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AddUserViewModel>(endPoint, user, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public createExamOfficer(user: AddInvigilatorViewModel): Observable<GenericResult<string>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserEndpoints.createExamOfficer}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AddInvigilatorViewModel>(endPoint, user, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateUser(user: UserViewModel): Observable<GenericResult<string>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserEndpoints.updateUser}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<UserViewModel>(endPoint, user, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateInvigilator(user: InvigilatorViewModel): Observable<GenericResult<string>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserEndpoints.updateUser}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<InvigilatorViewModel>(endPoint, user, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateProfile(user: ExamUserViewModel): Observable<GenericResult<string>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserEndpoints.updateUser}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<ExamUserViewModel>(endPoint, user, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteUser(id: string): Observable<GenericResult<string>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserEndpoints.deleteUser
      .replace('{id}', id)}`;
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
