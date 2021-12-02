export class UpdateUserAssessmentSectionAnswerViewModel {

    public id: number;

    public userAssessmentSectionID: number;

    public questionID: number;

    public answerID?: number;

    public answerIDs: number[] = [];

    public answerAsString: string;

    public correct: number;

}
