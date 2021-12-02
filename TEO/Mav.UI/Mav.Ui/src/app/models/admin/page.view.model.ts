import { PageInfoViewModel } from './page-info.view.model';

export class PageViewModel {

  public id: number;

  public typeID: number;

  public orderID: number;

  public parentID?: number;

  public navigationTypeID: number;

  public published: boolean;

  public pageInfo: PageInfoViewModel;

}
