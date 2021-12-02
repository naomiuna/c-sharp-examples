export class UserAssessmentSectionListingModel {

    public sectionID: number;

    public userAssessmentSectionID?: number;

    public number: number;

    public title: string;

    public statusID: number;

    public totalScore: number;

    public totalQuestions: number;

    public attempts: number;

    public actionAllowed: boolean;

    public showStatement: boolean;

    public maxAttempts?: number;

    public isEoQualification?: boolean;

    public timeRemaining?: number;
}
