import { Injectable } from '@angular/core';
import { IQuestionService } from './i-question.service';
import { ServiceBase } from './service-base';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { GlobalSettingsService } from './global-settings.service';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../models/generic.result.model';
import { QuestionViewModel } from '../models/question.view.model';
import { AddQuestionViewModel } from '../models/admin/add-question.view.model';
import { UpdateQuestionViewModel } from '../models/admin/update-question.view.model';

@Injectable()
export class QuestionService extends ServiceBase implements IQuestionService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getQuestionById<T>(id: number): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiQuestionEndpoints.getQuestionById
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

  public getQuestionList(sectionId: number): Observable<QuestionViewModel[]> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiQuestionEndpoints.getQuestionList
      .replace('{id}', sectionId.toString())}`;
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

  public createQuestion(newItem: AddQuestionViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiQuestionEndpoints.createQuestion}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AddQuestionViewModel>(endPoint, newItem, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateQuestion(item: UpdateQuestionViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiQuestionEndpoints.updateQuestion}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<UpdateQuestionViewModel>(endPoint, item, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteQuestion(id: number): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiQuestionEndpoints.deleteQuestion
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
