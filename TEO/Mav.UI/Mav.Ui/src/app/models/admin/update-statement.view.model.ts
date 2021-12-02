import { StatementQuestionViewModel } from "./statement-question.view.model";
import { StatementAnswerViewModel } from "../statement.answer.view.model";

export class UpdateStatementViewModel {

    public id: number;

    public parentID: number;

    public statementType: number;

    public number: number;

    public content: string;

    public questions: Array<StatementQuestionViewModel>

    public answers: Array<StatementAnswerViewModel>

}

