import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalSettingsService } from '../global-settings.service';
import { AuthService } from '../auth.service';
import { ServiceBase } from '../service-base';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { GenericResult } from '../../models/generic.result.model';
import { IAssessmentYearService } from './i-assessment-year.service';
import { AssessmentYearViewModel } from '../../models/admin/assessment-year.view.model';

@Injectable()
export class AssessmentYearService extends ServiceBase implements IAssessmentYearService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getAssessmentYearById(id: number): Observable<AssessmentYearViewModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAssessmentYearEndpoints.getAssessmentYearById
      .replace('{id}', id.toString())}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<AssessmentYearViewModel>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getAssessmentYearList(): Observable<AssessmentYearViewModel[]> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAssessmentYearEndpoints.getAssessmentYearList}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<AssessmentYearViewModel[]>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public createAssessmentYear(type: AssessmentYearViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAssessmentYearEndpoints.createAssessmentYear}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AssessmentYearViewModel>(endPoint, type, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateAssessmentYear(type: AssessmentYearViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAssessmentYearEndpoints.updateAssessmentYear}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<AssessmentYearViewModel>(endPoint, type, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteAssessmentYear(id: number): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAssessmentYearEndpoints.deleteAssessmentYear
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
