import { AssessmentSectionSummaryItem } from './assessment.section.summary.item';

export class AssessmentSectionSummary {

    public groupID: number;

    public orderID: number;

    public groupName: string;

    public questions: AssessmentSectionSummaryItem[];

    public recentScore: number;

}
