import { TimerViewModel } from "./timer.view.model";

export class UpdateSectionViewModel {

    public id: number;

    public assessmentID: number;

    public timerId?: number;

    public number: number;

    public title: string;

    public reference: string;

    public isRandom: boolean;

    public quantity?: number;

    public information: string;

    public sectionCount: number;

    public maxAttempts?: number;

    public isEoQualification?: boolean;

    public timer?: TimerViewModel;

}
