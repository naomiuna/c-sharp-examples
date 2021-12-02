import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../models/generic.result.model';
import { UpdateStatementViewModel } from '../models/admin/update-statement.view.model';
import { StatementAnswerViewModel } from '../models/statement.answer.view.model';

export interface IStatementService {

    getStatementById<T>(id: number): Observable<T>;

    getStatementBySectionId<T>(id: number): Observable<T>;

    getStatementByAssessmentId<T>(id: number): Observable<T>;

    createStatement(newItem: UpdateStatementViewModel): Observable<GenericResult<number>>;

    updateStatement(item: UpdateStatementViewModel): Observable<GenericResult<number>>;

    deleteStatement(id: number): Observable<GenericResult<number>>;

    getUserStatementAnswers<T>(id: number, userid: string): Observable<T>;

    updateUserStatementAnswers(item: UpdateStatementViewModel): Observable<GenericResult<number>>;

}