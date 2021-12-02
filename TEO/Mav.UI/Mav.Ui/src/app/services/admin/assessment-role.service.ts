import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalSettingsService } from '../global-settings.service';
import { AuthService } from '../auth.service';
import { ServiceBase } from '../service-base';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { IAssessmentRoleService } from './i-assessment-role.service';
import { AssessmentRoleViewModel } from '../../models/admin/assessment-role.view.model';

@Injectable()
export class AssessmentRoleService extends ServiceBase implements IAssessmentRoleService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }  

  public getAssessmentRoleList(): Observable<AssessmentRoleViewModel[]> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiAssessmentRoleEndpoints.getAssessmentRoleList}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<AssessmentRoleViewModel[]>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  } 
}