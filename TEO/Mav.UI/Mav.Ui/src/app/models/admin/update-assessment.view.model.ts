import { AssessmentGradeViewModal } from "./assessment-grade.view.model";

export class UpdateAssessmentViewModel {
    public id: number;

    public yearID: number;

    public eoQualification: boolean;

    public minScore: number;

    public title: string;

    public guide: string;

    public objectives: string;

    public published: boolean;

    public roleID?: string;

    public assessmentGrade: AssessmentGradeViewModal;
}
