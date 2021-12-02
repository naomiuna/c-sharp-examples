export class UserSearchModel {

  public static default = new UserSearchModel();

  public creatorID: string;

  public centreID?: number;

  public pageNo: number;

  public pageSize: number;

  public searchField: string;

  public searchTerm: string;

  public role?: string;

  public year?: number;

}
