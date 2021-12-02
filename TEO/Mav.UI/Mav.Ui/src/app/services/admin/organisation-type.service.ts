import { Injectable } from '@angular/core';
import { IOrganisationTypeService } from './i-organisation-type.service';
import { ServiceBase } from '../service-base';
import { AuthService } from '../auth.service';
import { GlobalSettingsService } from '../global-settings.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrganisationTypeViewModel } from '../../models/admin/organisation-type.view.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { GenericResult } from '../../models/generic.result.model';

@Injectable()
export class OrganisationTypeService extends ServiceBase implements IOrganisationTypeService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) { 
    super();
  }

  public getOrganisationTypeById(id: number): Observable<OrganisationTypeViewModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiOrganisationTypeEndpoints.getOrganisationTypeById
      .replace('{id}', id.toString())}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<OrganisationTypeViewModel>(endPoint, options)
    .pipe(
      catchError(this.handleError)
    );
  }

  public getOrganisationTypeList(): Observable<OrganisationTypeViewModel[]> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiOrganisationTypeEndpoints.getOrganisationTypeList}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<OrganisationTypeViewModel[]>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public createOrganisationType(type: OrganisationTypeViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiOrganisationTypeEndpoints.createOrganisationType}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<OrganisationTypeViewModel>(endPoint, type, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateOrganisationType(type: OrganisationTypeViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiOrganisationTypeEndpoints.updateOrganisationType}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<OrganisationTypeViewModel>(endPoint, type, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteOrganisationType(id: number): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiOrganisationTypeEndpoints.deleteOrganisationType
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
