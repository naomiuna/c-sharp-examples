import { UserSectionTimerViewModel } from "./user-section-timer.view.model";

export class UserAssessmentSectionViewModel {

    public id: number;

    public userAssessmentID: number;

    public score: number;

    public attempts: number;

    public passed?: boolean;

    public startedOn: Date;

    public passedOn?: Date;

    public statusID: number;

    public sectionID: number;

    public sectionNumber: number;

    public sectionTitle: string;

    public questionSet: string;

    public questionSetSize?: number;

    public actionAllowed: boolean;

    public userSectionTimer?: UserSectionTimerViewModel;

}
