import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../models/generic.result.model';
import { UpdateUserAssessmentSectionAnswerViewModel } from '../models/update.user.assessment.section.answer.view.model';
import { AddUserAssessmentSectionAnswerViewModel } from '../models/add.user.assessment.section.answer.view.model';

export interface IUserAssessmentAnswerService {

    getUserAssessmentAnswerById<T>(id: number): Observable<T>;

    getUserAssessmentAnswerByKeys<T>(sectid: number, questid: number): Observable<T>;

    createUserAssessmentSectionAnswer(newItem: AddUserAssessmentSectionAnswerViewModel): Observable<GenericResult<number>>;

    updateUserAssessmentSectionAnswer(item: UpdateUserAssessmentSectionAnswerViewModel): Observable<GenericResult<number>>;

}
