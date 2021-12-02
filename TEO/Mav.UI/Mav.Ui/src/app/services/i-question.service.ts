import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../models/generic.result.model';
import { QuestionViewModel } from '../models/question.view.model';
import { AddQuestionViewModel } from '../models/admin/add-question.view.model';
import { UpdateQuestionViewModel } from '../models/admin/update-question.view.model';

export interface IQuestionService {

    getQuestionById<T>(id: number): Observable<T>;

    getQuestionList(sectionId: number): Observable<QuestionViewModel[]>;

    createQuestion(newItem: AddQuestionViewModel): Observable<GenericResult<number>>;

    updateQuestion(item: UpdateQuestionViewModel): Observable<GenericResult<number>>;

    deleteQuestion(id: number): Observable<GenericResult<number>>;

}
