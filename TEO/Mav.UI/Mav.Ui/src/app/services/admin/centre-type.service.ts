import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalSettingsService } from '../global-settings.service';
import { AuthService } from '../auth.service';
import { ServiceBase } from '../service-base';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { GenericResult } from '../../models/generic.result.model';
import { ICentreTypeService } from './i-centre-type.service';
import { CentreTypeViewModel } from '../../models/admin/centre-type.view.model';

@Injectable()
export class CentreTypeService extends ServiceBase implements ICentreTypeService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getCentreTypeById(id: number): Observable<CentreTypeViewModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCentreTypeEndpoints.getCentreTypeById
      .replace('{id}', id.toString())}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<CentreTypeViewModel>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getCentreTypeList(): Observable<CentreTypeViewModel[]> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCentreTypeEndpoints.getCentreTypeList}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<CentreTypeViewModel[]>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public createCentreType(type: CentreTypeViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCentreTypeEndpoints.createCentreType}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<CentreTypeViewModel>(endPoint, type, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateCentreType(type: CentreTypeViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCentreTypeEndpoints.updateCentreType}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<CentreTypeViewModel>(endPoint, type, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteCentreType(id: number): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCentreTypeEndpoints.deleteCentreType
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
