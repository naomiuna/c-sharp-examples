import { StatementQuestionViewModel } from "./admin/statement-question.view.model";

export class StatementAnswerViewModel {

    public id: number;

    public statementID: number;

    public questionID: number;

    public answer: string;

    public question: StatementQuestionViewModel

}