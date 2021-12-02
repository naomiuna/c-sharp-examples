import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { ILicenceService } from './i-licence.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalSettingsService } from './global-settings.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { LicenceViewModel } from '../models/admin/licence.view.model';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { AddLicenceViewModel } from '../models/admin/add-licence.view.model';
import { GenericResult } from '../models/generic.result.model';
import { UpdateLicenceViewModel } from '../models/admin/update-licence.view.model';

@Injectable()
export class LicenceService extends ServiceBase implements ILicenceService{

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) 
  { 
    super()
  }

  getLicenceById<T>(id: number): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiLicenceEndpoints.getLicenceById.replace('{id}', id.toString())}`;
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

  getLicenceByOrgId(orgId: number): Observable<LicenceViewModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiLicenceEndpoints.getLicenceByOrgId.replace('{orgId}', orgId.toString())}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<LicenceViewModel>(endPoint, options)
    .pipe(
      catchError(this.handleError)
    );
  }

  createLicence(licence: AddLicenceViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiLicenceEndpoints.createLicence}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AddLicenceViewModel>(endPoint, licence, options)
    .pipe(
      catchError(this.handleError)
    );
  }

  createLicenceDisabled(licence: AddLicenceViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiLicenceEndpoints.createLicenceDisabled}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AddLicenceViewModel>(endPoint, licence, options)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateLicence(licence: UpdateLicenceViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiLicenceEndpoints.updateLicence}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<UpdateLicenceViewModel>(endPoint, licence, options)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateLicenceDisabled(licence: UpdateLicenceViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiLicenceEndpoints.updateLicenceDisabled}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<UpdateLicenceViewModel>(endPoint, licence, options)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteLicence(id: number): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiLicenceEndpoints.deleteLicence.replace('{id}', id.toString())}`;
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

  enableAccount(orgId: number): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiLicenceEndpoints.enableAccount.replace('{orgId}', orgId.toString())}`;
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

  disableAccount(orgId: number): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiLicenceEndpoints.disableAccount.replace('{orgId}', orgId.toString())}`;
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
