import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../models/generic.result.model';
import { CentreViewModel } from '../models/centre.view.model';
import { CentreSearchModel } from '../models/search/centre.search.model';
import { CentreListingModel } from '../models/centre.listing.model';
import { Paginate } from '../models/paginated.items';
import { CentreTotalsViewModel } from '../models/centre-totals.view.model';
import { UpdateCentreContactViewModel } from '../models/update.centre.contact.view.model';

export interface ICentreServiceService {

  isCentreActive(id: number): Observable<GenericResult<boolean>>;

  getCentreById(id: number): Observable<CentreViewModel>;

  getCentreSearchByUserId(userId: string): Observable<CentreListingModel>;

  getCentreByUserId(id: string): Observable<CentreViewModel>;

  getMyCentre(): Observable<CentreViewModel>;

  getCentreSearch(filter: CentreSearchModel): Observable<Paginate<CentreListingModel>>;

  getCentreInvigilatorTotals(id: number): Observable<CentreTotalsViewModel>;

  updateCentre(centre: CentreViewModel): Observable<GenericResult<number>>;

  deleteCentre(id: number): Observable<GenericResult<number>>;

  updateCentreContact(centre: UpdateCentreContactViewModel): Observable<GenericResult<number>>;

}
