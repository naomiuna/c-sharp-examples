export class AddInvigilatorViewModel {

  public static default = new AddInvigilatorViewModel();

  public id: string;

  public firstName: string;

  public surname: string;

  public email: string;

  public confirmEmail: string;

  public enabled: boolean;

  public creatorID: string;

  public centreID?: number;

  public returnUrl: string;

}
