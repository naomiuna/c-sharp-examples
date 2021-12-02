import { Injectable } from '@angular/core';
import { ServiceBase } from '../service-base';
import { IAssessmentService } from './i-assessment.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalSettingsService } from '../global-settings.service';
import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';
import { GenericResult } from '../../models/generic.result.model';
import { AddAssessmentViewModel } from '../../models/admin/add-assessment.view.model';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { AssessmentSearchModel } from '../../models/search/assessment.search.model';
import { Paginate } from '../../models/paginated.items';
import { AssessmentListingModel } from '../../models/assessment.listing.model';
import { UpdateAssessmentViewModel } from '../../models/admin/update-assessment.view.model';
import { AddAssessmentEoViewModel } from '../../models/admin/add-assessment-eo.view.model';
import { DuplicateAssessmentViewModel } from '../../models/admin/duplicate-assessment.view.model';

@Injectable()
export class AssessmentService extends ServiceBase implements IAssessmentService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getAssessmentById<T>(id: number): Observable<T> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAssessmentEndpoints.getAssessmentById
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

  public getAllAssessments(filter: AssessmentSearchModel): Observable<Paginate<AssessmentListingModel>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAssessmentEndpoints.getAllAssessments}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AssessmentSearchModel>(endPoint, filter, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public createAssessment(newItem: AddAssessmentViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAssessmentEndpoints.createAssessment}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AddAssessmentViewModel>(endPoint, newItem, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  // EO Qualification
  public createEoAssessment(newItem: AddAssessmentEoViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAssessmentEndpoints.createEoAssessment}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AddAssessmentEoViewModel>(endPoint, newItem, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateAssessment(item: UpdateAssessmentViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAssessmentEndpoints.updateAssessment}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<UpdateAssessmentViewModel>(endPoint, item, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteAssessment(id: number): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAssessmentEndpoints.deleteAssessment
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

  public isEoQualification(assessmentId: number): Observable<boolean> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAssessmentEndpoints.isEoQualification
      .replace('{id}', assessmentId.toString())}`;
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

  public duplicateAssessment(item: DuplicateAssessmentViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAssessmentEndpoints.duplicateAssessment}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<DuplicateAssessmentViewModel>(endPoint, item, options)
      .pipe(
        catchError(this.handleError)
      );
  }
  
}
