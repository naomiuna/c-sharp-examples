import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../models/generic.result.model';
import { AnswerViewModel } from '../models/answer.view.model';
import { AddAnswerViewModel } from '../models/admin/add-answer.view.model';
import { UpdateAnswerViewModel } from '../models/admin/update-answer.view.model';

export interface IAnswerService {

    getAnswerById<T>(id: number): Observable<T>;

    getAnswerList(questionId: number): Observable<UpdateAnswerViewModel[]>;

    createAnswer(newItem: AddAnswerViewModel): Observable<GenericResult<number>>;

    updateAnswer(item: UpdateAnswerViewModel): Observable<GenericResult<number>>;

    insertUpdateAnswer(items: UpdateAnswerViewModel[]): Observable<GenericResult<number>>;

    deleteAnswer(id: number): Observable<GenericResult<number>>;

}
