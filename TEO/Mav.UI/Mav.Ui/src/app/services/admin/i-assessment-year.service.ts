import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../../models/generic.result.model';
import { AssessmentYearViewModel } from '../../models/admin/assessment-year.view.model';

export interface IAssessmentYearService {

    getAssessmentYearById(id: number): Observable<AssessmentYearViewModel>;

    getAssessmentYearList(): Observable<AssessmentYearViewModel[]>;

    createAssessmentYear(type: AssessmentYearViewModel): Observable<GenericResult<number>>;

    updateAssessmentYear(setting: AssessmentYearViewModel): Observable<GenericResult<number>>;

    deleteAssessmentYear(id: number): Observable<GenericResult<number>>;

}
