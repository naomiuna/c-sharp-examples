import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { ICertificateService } from './i-certificate.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalSettingsService } from './global-settings.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { CertificateViewModel } from '../models/certificate.view.model';

@Injectable()
export class CertificateService extends ServiceBase implements ICertificateService {

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
    super();
  }

  public getCertificate(id: number, key: string): Observable<CertificateViewModel> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiCertificateEndpoints.getCertificate
      .replace('{id}', id.toString()).replace('{key}', key)}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.get<CertificateViewModel>(endPoint, options)
      .pipe(
        catchError(this.handleError)
      );
  }

}
