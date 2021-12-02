import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../../models/generic.result.model';
import { AddAssessmentViewModel } from '../../models/admin/add-assessment.view.model';
import { AssessmentSearchModel } from '../../models/search/assessment.search.model';
import { Paginate } from '../../models/paginated.items';
import { AssessmentListingModel } from '../../models/assessment.listing.model';
import { UpdateAssessmentViewModel } from '../../models/admin/update-assessment.view.model';
import { AddAssessmentEoViewModel } from '../../models/admin/add-assessment-eo.view.model';
import { DuplicateAssessmentViewModel } from '../../models/admin/duplicate-assessment.view.model';

export interface IAssessmentService {

    getAssessmentById<T>(id: number): Observable<T>;

    getAllAssessments(filter: AssessmentSearchModel): Observable<Paginate<AssessmentListingModel>>;

    createAssessment(newItem: AddAssessmentViewModel): Observable<GenericResult<number>>;

    createEoAssessment(newItem: AddAssessmentEoViewModel): Observable<GenericResult<number>>;

    updateAssessment(item: UpdateAssessmentViewModel): Observable<GenericResult<number>>;

    deleteAssessment(id: number): Observable<GenericResult<number>>;

    isEoQualification(assessmentId: number): Observable<boolean>;

    duplicateAssessment(item: DuplicateAssessmentViewModel): Observable<GenericResult<number>>;
}
