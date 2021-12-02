import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../models/generic.result.model';
import { SectionListingModel } from '../models/search/section.listing.model';
import { AddSectionViewModel } from '../models/admin/add-section.view.model';
import { UpdateSectionViewModel } from '../models/admin/update-section.view.model';
import { SectionSearchModel } from '../models/search/section.search.model';
import { Paginate } from '../models/paginated.items';

export interface ISectionService {

    getSectionById<T>(id: number): Observable<T>;

    getSectionList(assessmentId: number): Observable<SectionListingModel[]>;

    getSectionListPages(filter: SectionSearchModel): Observable<Paginate<SectionListingModel>>;

    createSection(newItem: AddSectionViewModel): Observable<GenericResult<number>>;

    updateSection(item: UpdateSectionViewModel): Observable<GenericResult<number>>;

    deleteSection(id: number): Observable<GenericResult<number>>;

}
