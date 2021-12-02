import { UserAssessmentSectionListingModel } from './search/user.assessment.section.listing.model';

export class CertificateViewModel {

    public id: number;

    public keyID: string;

    public userID: string;

    public userName: string;

    public centreName: string;

    public assessmentName: string;

    public yearID: number;

    public yearDisplay: string;

    public totalScore: number;

    public maxScore: number;

    public submittedOn: Date;

    public grade?: string;

    public sections: UserAssessmentSectionListingModel[];

}
