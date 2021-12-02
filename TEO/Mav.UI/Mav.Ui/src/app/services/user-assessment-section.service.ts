import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { GlobalSettingsService } from './global-settings.service';
import { IUserAssessmentSectionService } from './i-user-assessment-section.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { UserAssessmentSectionSearchModel } from '../models/search/user.assessment.section.search.model';
import { UserAssessmentSectionListingModel } from '../models/search/user.assessment.section.listing.model';
import { Paginate } from '../models/paginated.items';
import { GenericResult } from '../models/generic.result.model';
import { AddUserAssessmentSectionViewModel } from '../models/add.user.assessment.section.view.model';
import { UpdateUserAssessmentSectionViewModel } from '../models/update.user.assessment.section.view.model';
import { SubmitUserAssessmentSectionViewModel } from '../models/submit.user.assessment.section.view.model';
import { AssessmentSectionTotals } from '../models/assessment.section.totals';
import { AssignQuestionItem } from '../models/assign.question.item';
import { ExamSectionStepViewModel } from '../models/exam-section-step.view.model';
import { UpdateUserSectionStatsViewModel } from '../models/update-user-section-stats.view.model';

@Injectable()
export class UserAssessmentSectionService extends ServiceBase implements IUserAssessmentSectionService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getUserAssessmentSectionById<T>(id: number): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentSectionEndpoints.getUserAssessmentSectionById
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

  public getUserAssessmentSectionQuestions(id: number): Observable<AssignQuestionItem[]> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentSectionEndpoints.getUserAssessmentSectionQuestions
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

  // tslint:disable-next-line:max-line-length
  public getUserAssessmentSectionListByUserId(filter: UserAssessmentSectionSearchModel): Observable<Paginate<UserAssessmentSectionListingModel>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentSectionEndpoints.getUserAssessmentSectionListByUserId}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<UserAssessmentSectionSearchModel>(endPoint, filter, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getUserAssessmentSectionTotals(id: number): Observable<AssessmentSectionTotals> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentSectionEndpoints.getUserAssessmentSectionTotals
      .replace('{id}', id.toString())}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<AssessmentSectionTotals>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public lookupNextSectionStep(id: number): Observable<ExamSectionStepViewModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentSectionEndpoints.lookupNextSectionStep
      .replace('{id}', id.toString())}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<ExamSectionStepViewModel>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public createUserAssessmentSection(newItem: AddUserAssessmentSectionViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentSectionEndpoints.createUserAssessmentSection}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AddUserAssessmentSectionViewModel>(endPoint, newItem, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateUserAssessmentSection(item: UpdateUserAssessmentSectionViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentSectionEndpoints.updateUserAssessmentSection}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<UpdateUserAssessmentSectionViewModel>(endPoint, item, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public submitUserAssessmentSection(item: SubmitUserAssessmentSectionViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentSectionEndpoints.submitUserAssessmentSection}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<SubmitUserAssessmentSectionViewModel>(endPoint, item, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public restartUserAssessmentSection(id: number): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentSectionEndpoints.restartUserAssessmentSection
      .replace('{id}', id.toString())}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AddUserAssessmentSectionViewModel>(endPoint, null, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateUserSectionStats(userSection: UpdateUserSectionStatsViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserAssessmentSectionEndpoints.updateUserSectionStatsViewModel}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<UpdateUserSectionStatsViewModel>(endPoint, userSection, options)
      .pipe(
        catchError(this.handleError)
      );
  }
}
