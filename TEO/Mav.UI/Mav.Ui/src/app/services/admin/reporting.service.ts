import { Injectable } from '@angular/core';
import { ServiceBase } from '../service-base';
import { IReportingService } from './i-reporting.service';
import { GlobalSettingsService } from '../global-settings.service';
import { AuthService } from '../auth.service';
import { AssessmentSectionSearchModel } from '../../models/reporting/assessment.section.search.model';
import { Observable } from 'rxjs/Observable';
import { AssessmentSectionReportModel } from '../../models/reporting/assessment.section.report.model';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SectionSearchModel } from '../../models/search/section.search.model';
import { SectionReportModel } from '../../models/reporting/section.report.model';
import { CentreSearchModel } from '../../models/search/centre.search.model';
import { CentreReportModel } from '../../models/reporting/centre.report.model';
import { CsvModel } from '../../models/csv.model';
import { AssessmentSearchModel } from '../../models/search/Assessment.search.model';

@Injectable()
export class ReportingService extends ServiceBase implements IReportingService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getAssessmentSectionReport(filter: AssessmentSectionSearchModel): Observable<AssessmentSectionReportModel[]> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiReportingEndpoints.getAssessmentSectionReport}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AssessmentSectionSearchModel>(endPoint, filter, options)
      .pipe(
        catchError(this.handleError)
      );
  }


  public getSectionReport(filter: SectionSearchModel): Observable<SectionReportModel[]> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiReportingEndpoints.getSectionReport}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<SectionSearchModel>(endPoint, filter, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getCentreReport(filter: CentreSearchModel): Observable<CentreReportModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiReportingEndpoints.getCentreReport}`;
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

  getCentreReportCsvAll(filter: CentreSearchModel): Observable<CsvModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiReportingEndpoints.getCentreReportsCsvAll}`;
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

  getAssessmentReportCsvAll(filter: AssessmentSearchModel): Observable<CsvModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiReportingEndpoints.getAssessmentReportsCsvAll}`;
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

  getAssessmentSectionReportCsvAll(filter: AssessmentSectionSearchModel): Observable<CsvModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiReportingEndpoints.getAssessmentSectionReportsCsvAll}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AssessmentSectionSearchModel>(endPoint, filter, options)
    .pipe(
      catchError(this.handleError)
    );
  }

  getSectionReportCsvAll(filter: SectionSearchModel): Observable<CsvModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiReportingEndpoints.getSectionReportsCsvAll}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<SectionSearchModel>(endPoint, filter, options)
    .pipe(
      catchError(this.handleError)
    );
  }
}
