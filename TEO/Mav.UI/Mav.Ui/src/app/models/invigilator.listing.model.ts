import { UserAssessmentListingModel } from './search/user.assessment.listing.model';

export class InvigilatorListingModel {

  public static default = new InvigilatorListingModel();

  public id: string;

  public firstName: string;

  public surname: string;

  public email: string;

  public enabled: boolean;

  public latestAssessment?: UserAssessmentListingModel;

}
