export class Paginate<TRecord> {

  public from: number;

  public index: number;

  public size: number;

  public count: number;

  public pages: number;

  public hasPrevious: boolean;

  public hasNext: boolean;

  public items: TRecord[];

}
