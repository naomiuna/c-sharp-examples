import { Injectable } from '@angular/core';
import { IQuestionGroupService } from './i-question-group.service';
import { ServiceBase } from './service-base';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { GlobalSettingsService } from './global-settings.service';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../models/generic.result.model';
import { QuestionGroupViewModel } from '../models/question-group.viewmodel';
import { AddQuestionGroupViewModel } from '../models/admin/add-question-group.view.model';
import { UpdateQuestionGroupViewModel } from '../models/admin/update-question-group.view.model';

@Injectable()
export class QuestionGroupService extends ServiceBase implements IQuestionGroupService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getQuestionGroupById<T>(id: number): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiQuestionGroupEndpoints.getQuestionGroupById
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

  public getQuestionGroupList(sectionId: number): Observable<QuestionGroupViewModel[]> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiQuestionGroupEndpoints.getQuestionGroupList
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

  public createQuestionGroup(newItem: AddQuestionGroupViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiQuestionGroupEndpoints.createQuestionGroup}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AddQuestionGroupViewModel>(endPoint, newItem, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateQuestionGroup(item: UpdateQuestionGroupViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiQuestionGroupEndpoints.updateQuestionGroup}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<UpdateQuestionGroupViewModel>(endPoint, item, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteQuestionGroup(id: number): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiQuestionGroupEndpoints.deleteQuestionGroup
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
