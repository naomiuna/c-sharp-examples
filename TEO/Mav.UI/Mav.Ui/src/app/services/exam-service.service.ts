import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { IExamServiceService } from './i-exam-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalSettingsService } from './global-settings.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { AssessmentSectionSummary } from '../models/assessment.section.summary';

@Injectable()
export class ExamServiceService extends ServiceBase implements IExamServiceService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getExamQuestionById<T>(id: number): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiExamEndpoints.getExamQuestionById
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

  public getSectionSummaryDetails(id: number): Observable<AssessmentSectionSummary[]> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiExamEndpoints.getSectionSummaryDetails
      .replace('{id}', id.toString())}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<AssessmentSectionSummary[]>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getRecentScore(id: number): Observable<number> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiExamEndpoints.getRecentScore
      .replace('{id}', id.toString())}`;
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
}
