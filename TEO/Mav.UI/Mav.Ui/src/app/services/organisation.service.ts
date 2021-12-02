import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { IOrganisationService } from './i-organisation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalSettingsService } from './global-settings.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { OrganisationViewModel } from '../models/admin/organisation.view.model';
import { OrganisationSearchModel } from '../models/search/organisation.search.model';
import { Paginate } from '../models/paginated.items';
import { OrganisationListingModel } from '../models/admin/organisation.listing.model';
import { AddOrganisationViewModel } from '../models/admin/add-organisation.view.model';
import { GenericResult } from '../models/generic.result.model';
import { UpdateOrganisationViewModel } from '../models/admin/update-organisation.view.model';

@Injectable()
export class OrganisationService extends ServiceBase implements IOrganisationService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) 
  { 
    super()
  }

  getOrganisationById<T>(id: number): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiOrganisationEndpoints.getOrganisationById.replace('{id}', id.toString())}`;
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

  getAllOrganisations(filter: OrganisationSearchModel): Observable<Paginate<OrganisationListingModel>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiOrganisationEndpoints.getAllOrganisations}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<OrganisationSearchModel>(endPoint, filter, options)
    .pipe(
      catchError(this.handleError)
    );
  }

  createOrganisation(org: AddOrganisationViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiOrganisationEndpoints.createOrganisation}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AddOrganisationViewModel>(endPoint, org, options)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateOrganisation(org: UpdateOrganisationViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiOrganisationEndpoints.updateOrganisation}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<UpdateOrganisationViewModel>(endPoint, org, options)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteOrganisation(id: number): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiOrganisationEndpoints.deleteOrganisation.replace('{id}', id.toString())}`;
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
