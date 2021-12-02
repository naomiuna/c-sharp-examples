import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalSettingsService } from '../global-settings.service';
import { AuthService } from '../auth.service';
import { ServiceBase } from '../service-base';
import { ISettingsService } from './i-settings.service';
import { SettingViewModel } from '../../models/admin/setting.view.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { GenericResult } from '../../models/generic.result.model';

@Injectable()
export class SettingsService extends ServiceBase implements ISettingsService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getSettingById(id: number): Observable<SettingViewModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiSettingEndpoints.getSettingById
      .replace('{id}', id.toString())}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<SettingViewModel>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getSettingByName(name: string): Observable<SettingViewModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiSettingEndpoints.getSettingByName
      .replace('{id}', name)}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<SettingViewModel>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getSettings(): Observable<SettingViewModel[]> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiSettingEndpoints.getSettings}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<SettingViewModel[]>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateSetting(setting: SettingViewModel): Observable<GenericResult<number>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiSettingEndpoints.updateSetting}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.put<SettingViewModel>(endPoint, setting, options)
      .pipe(
        catchError(this.handleError)
      );
  }

}
