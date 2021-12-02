import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { GlobalSettingsService } from './global-settings.service';
import { IUserAssessmentAnswerService } from './i-user-assessment-answer.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AddUserAssessmentSectionAnswerViewModel } from '../models/add.user.assessment.section.answer.view.model';
import { GenericResult } from '../models/generic.result.model';
import { UpdateUserAssessmentSectionAnswerViewModel } from '../models/update.user.assessment.section.answer.view.model';

@Injectable()
export class UserAssessmentAnswerService extends ServiceBase implements IUserAssessmentAnswerService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getUserAssessmentAnswerById<T>(id: number): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentSectionAnswerEndpoints.getUserAssessmentAnswerById
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

  public getUserAssessmentAnswerByKeys<T>(sectid: number, questid: number): Observable<T> {
    // tslint:disable-next-line:max-line-length
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentSectionAnswerEndpoints.getUserAssessmentAnswerByKeys
      .replace('{sectid}', sectid.toString()).replace('{questid}', questid.toString())}`;
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

  public createUserAssessmentSectionAnswer(newItem: AddUserAssessmentSectionAnswerViewModel): Observable<GenericResult<number>> {
    // tslint:disable-next-line:max-line-length
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentSectionAnswerEndpoints.createUserAssessmentSectionAnswer}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AddUserAssessmentSectionAnswerViewModel>(endPoint, newItem, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateUserAssessmentSectionAnswer(item: UpdateUserAssessmentSectionAnswerViewModel): Observable<GenericResult<number>> {
    // tslint:disable-next-line:max-line-length
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentSectionAnswerEndpoints.updateUserAssessmentSectionAnswer}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<UpdateUserAssessmentSectionAnswerViewModel>(endPoint, item, options)
      .pipe(
        catchError(this.handleError)
      );
  }
}
