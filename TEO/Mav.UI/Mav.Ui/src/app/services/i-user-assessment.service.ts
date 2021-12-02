import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../models/generic.result.model';
import { Paginate } from '../models/paginated.items';
import { UserAssessmentSearchModel } from '../models/search/user.assessment.search.model';
import { UserAssessmentListingModel } from '../models/search/user.assessment.listing.model';
import { AddUserAssessmentViewModel } from '../models/add.user.assessment.view.model';
import { UpdateUserAssessmentViewModel } from '../models/update.user.assessment.view.model';
import { SubmitUserAssessmentViewModel } from '../models/submit.user.assessment.view.model';

export interface IUserAssessmentService {

    getUserAssessmentById<T>(id: number): Observable<T>;

    getUserAssessmentListByUserId(filter: UserAssessmentSearchModel): Observable<Paginate<UserAssessmentListingModel>>;

    getUserLatestAssessment(id: string): Observable<UserAssessmentListingModel>;

    getUserHistory(filter: UserAssessmentSearchModel): Observable<Paginate<UserAssessmentListingModel>>;

    createUserAssessment(newItem: AddUserAssessmentViewModel): Observable<GenericResult<number>>;

    updateUserAssessment(item: UpdateUserAssessmentViewModel): Observable<GenericResult<number>>;

    submitUserAssessment(item: SubmitUserAssessmentViewModel): Observable<GenericResult<number>>;

}
