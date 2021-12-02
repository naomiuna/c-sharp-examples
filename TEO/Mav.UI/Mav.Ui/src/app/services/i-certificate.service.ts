import { Observable } from 'rxjs/Observable';
import { CertificateViewModel } from '../models/certificate.view.model';

export interface ICertificateService {

    getCertificate(id: number, key: string): Observable<CertificateViewModel>;

}
