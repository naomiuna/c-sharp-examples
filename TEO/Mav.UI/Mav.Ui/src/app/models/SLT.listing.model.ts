import { UserAssessmentListingModel } from './search/user.assessment.listing.model';

export class SLTListingModel {

  public static default = new SLTListingModel();

  public id: string;

  public firstName: string;

  public surname: string;

  public email: string;

  public enabled: boolean;

  public latestAssessment?: UserAssessmentListingModel;

}
