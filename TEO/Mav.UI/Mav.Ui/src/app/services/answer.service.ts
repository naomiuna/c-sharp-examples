import { Injectable } from '@angular/core';
import { IAnswerService } from './i-answer.service';
import { ServiceBase } from './service-base';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { GlobalSettingsService } from './global-settings.service';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../models/generic.result.model';
import { AnswerViewModel } from '../models/answer.view.model';
import { AddAnswerViewModel } from '../models/admin/add-answer.view.model';
import { UpdateAnswerViewModel } from '../models/admin/update-answer.view.model';

@Injectable()
export class AnswerService extends ServiceBase implements IAnswerService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getAnswerById<T>(id: number): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAnswerEndpoints.getAnswerById
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

  public getAnswerList(questionId: number): Observable<UpdateAnswerViewModel[]> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAnswerEndpoints.getAnswerList
      .replace('{id}', questionId.toString())}`;
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

  public createAnswer(newItem: AddAnswerViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAnswerEndpoints.createAnswer}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AddAnswerViewModel>(endPoint, newItem, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateAnswer(item: UpdateAnswerViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAnswerEndpoints.updateAnswer}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<UpdateAnswerViewModel>(endPoint, item, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public insertUpdateAnswer(items: UpdateAnswerViewModel[]): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAnswerEndpoints.insertUpdateAnswer}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<UpdateAnswerViewModel[]>(endPoint, items, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteAnswer(id: number): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAnswerEndpoints.deleteAnswer
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
