import { Observable } from 'rxjs/Observable';
import { AssessmentSectionSummary } from '../models/assessment.section.summary';

export interface IExamServiceService {

    getExamQuestionById<T>(id: number): Observable<T>;

    getSectionSummaryDetails(id: number): Observable<AssessmentSectionSummary[]>;

    getRecentScore(id: number): Observable<number>;

}
