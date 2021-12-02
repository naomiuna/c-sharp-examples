import { ExamAnswerViewModel } from './exam-answer.view.model';

export class ExamQuestionViewModel {

    public id: number;

    public groupName: string;

    public number: number;

    public typeID: number;

    public selections: number;

    public title: string;

    public answers: ExamAnswerViewModel[];

}
