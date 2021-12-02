import { Observable } from 'rxjs/Observable';
import { QuestionGroupViewModel } from '../models/question-group.viewmodel';
import { AddQuestionGroupViewModel } from '../models/admin/add-question-group.view.model';
import { GenericResult } from '../models/generic.result.model';
import { UpdateQuestionGroupViewModel } from '../models/admin/update-question-group.view.model';

export interface IQuestionGroupService {

    getQuestionGroupById<T>(id: number): Observable<T>;

    getQuestionGroupList(sectionId: number): Observable<QuestionGroupViewModel[]>;

    createQuestionGroup(newItem: AddQuestionGroupViewModel): Observable<GenericResult<number>>;

    updateQuestionGroup(item: UpdateQuestionGroupViewModel): Observable<GenericResult<number>>;

    deleteQuestionGroup(id: number): Observable<GenericResult<number>>;

}
