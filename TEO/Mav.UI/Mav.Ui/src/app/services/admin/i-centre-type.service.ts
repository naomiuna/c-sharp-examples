import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../../models/generic.result.model';
import { CentreTypeViewModel } from '../../models/admin/centre-type.view.model';

export interface ICentreTypeService {

    getCentreTypeById(id: number): Observable<CentreTypeViewModel>;

    getCentreTypeList(): Observable<CentreTypeViewModel[]>;

    createCentreType(type: CentreTypeViewModel): Observable<GenericResult<number>>;

    updateCentreType(setting: CentreTypeViewModel): Observable<GenericResult<number>>;

    deleteCentreType(id: number): Observable<GenericResult<number>>;

}
