import { Injectable } from '@angular/core';
import { ICentreServiceService } from './i-centre-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { GlobalSettingsService } from './global-settings.service';
import { Observable } from 'rxjs/Observable';
import { CentreViewModel } from '../models/centre.view.model';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { ServiceBase } from './service-base';
import { GenericResult } from '../models/generic.result.model';
import { CentreSearchModel } from '../models/search/centre.search.model';
import { CentreListingModel } from '../models/centre.listing.model';
import { Paginate } from '../models/paginated.items';
import { CentreTotalsViewModel } from '../models/centre-totals.view.model';
import { UpdateCentreContactViewModel } from '../models/update.centre.contact.view.model';

@Injectable()
export class CentreServiceService extends ServiceBase implements ICentreServiceService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public isCentreActive(id: number): Observable<GenericResult<boolean>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCentreEndpoints.isCentreActive.replace('{id}', id.toString())}`;
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

  public getCentreById(id: number): Observable<CentreViewModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCentreEndpoints.getCentreById.replace('{id}', id.toString())}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<CentreViewModel>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getCentreSearchByUserId(userId: string): Observable<CentreListingModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCentreEndpoints.getCentreSearchByUserId.replace('{userId}', userId)}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<CentreListingModel>(endPoint, options)
    .pipe(
      catchError(this.handleError)
    );
  }

  public getCentreByUserId(id: string): Observable<CentreViewModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCentreEndpoints.getCentreByUserId.replace('{id}', id)}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<CentreViewModel>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getMyCentre(): Observable<CentreViewModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCentreEndpoints.getMyCentre}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<CentreViewModel>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getCentreSearch(filter: CentreSearchModel): Observable<Paginate<CentreListingModel>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCentreEndpoints.getCentreSearch}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<CentreSearchModel>(endPoint, filter, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getCentreInvigilatorTotals(id: number): Observable<CentreTotalsViewModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCentreEndpoints.getCentreInvigilatorTotals
      .replace('{id}', id.toString())}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<CentreTotalsViewModel>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getCentreSLTTotals(id: number): Observable<CentreTotalsViewModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCentreEndpoints.getCentreSLTTotals
      .replace('{id}', id.toString())}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<CentreTotalsViewModel>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateCentre(centre: CentreViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCentreEndpoints.updateCentre}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<CentreViewModel>(endPoint, centre, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteCentre(id: number): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCentreEndpoints.deleteCentre
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

  public updateCentreContact(centre: UpdateCentreContactViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCentreEndpoints.updateCentreContact}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<UpdateCentreContactViewModel>(endPoint, centre, options)
      .pipe(
        catchError(this.handleError)
      );
  }
}
