import { Injectable } from '@angular/core';
import { IStatementService } from './i-statement.service';
import { ServiceBase } from './service-base';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { GlobalSettingsService } from './global-settings.service';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../models/generic.result.model';
import { UpdateStatementViewModel } from '../models/admin/update-statement.view.model';
import { StatementAnswerViewModel } from '../models/statement.answer.view.model';


@Injectable()
export class StatementService extends ServiceBase implements IStatementService {


  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getStatementById<T>(id: number): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiStatementEndpoints.getStatementById
      .replace('{id}', id.toString())}`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<T>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  getStatementBySectionId<T>(id: number): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiStatementEndpoints.getStatementBySectionId
      .replace('{id}', id.toString())}`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<T>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }
  getStatementByAssessmentId<T>(id: number): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiStatementEndpoints.getStatementByAssessmentId
      .replace('{id}', id.toString())}`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<T>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  createStatement(newItem: UpdateStatementViewModel): Observable<GenericResult<number>> {
    console.log("Statement to save", newItem);

    const endPoint = `${environment.apiBase + this.globalSettingsService.apiStatementEndpoints.createStatement}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<UpdateStatementViewModel>(endPoint, newItem, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateStatement(item: UpdateStatementViewModel): Observable<GenericResult<number>> {

    console.log("Statement to save", item);

    const endPoint = `${environment.apiBase + this.globalSettingsService.apiStatementEndpoints.updateStatement}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<UpdateStatementViewModel>(endPoint, item, options)
      .pipe(
        catchError(this.handleError)
      );
  }


  deleteStatement(id: number): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiSectionEndpoints.deleteSection
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

  public getUserStatementAnswers<T>(id: number, userid: string): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiStatementEndpoints.getStatmentAnswersByUserId
      .replace('{id}', id.toString()).replace("{userid}", userid)}`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<T>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateUserStatementAnswers(item: UpdateStatementViewModel): Observable<GenericResult<number>> {

console.log("SENDING", item);

    const endPoint = `${environment.apiBase + this.globalSettingsService.apiStatementEndpoints.updateUserStatementAnswers}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<UpdateStatementViewModel>(endPoint, item, options)
      .pipe(
        catchError(this.handleError)
      );
  }

}
