import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';
import { CentreSearchModel } from '../models/search/centre.search.model';
import { CentreListingModel } from '../models/centre.listing.model';
import { Paginate } from '../models/paginated.items';
import { CentreServiceService } from '../services/centre-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-centres-list',
  templateUrl: './centres-list.component.html',
  styleUrls: ['./centres-list.component.css']
})
export class CentresListComponent extends AppComponentBase implements OnInit {

  public filterModel: CentreSearchModel = new CentreSearchModel();
  public searchModel: Paginate<CentreListingModel> = new Paginate<CentreListingModel>();

  public loadingText: string;
  public paginationItems = _.range(1, 1);

  constructor(
    public routeConfig: Router,
    private centreService: CentreServiceService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.resetSearch();
    this.searchRecords();
  }

  public newSearch(searchTerms: HTMLInputElement): void {
    this.filterModel.pageNo = 1;
    this.filterModel.searchTerm = searchTerms.value;
    this.searchRecords();
  }

  public PaginateSearch(page: number): void {
    this.filterModel.pageNo = page;
    this.searchRecords();
  }

  public setSearchField(entry): void {
    console.log(entry);
    if (entry === '1') {
      this.filterModel.searchField = 'Name';
    }
    if (entry === '2') {
      this.filterModel.searchField = 'Number';
    }
  }

  public setOrder(entry): void {
    console.log(entry);
    this.filterModel.orderId = entry;
  }

  private searchRecords(): void {
    this.toggleLoadingText(-1);
    this.actionPending = true;

    this.centreService.getCentreSearch(this.filterModel)
    .subscribe(
      r1 => {
        this.actionPending = false;
        this.searchModel = r1;
        this.paginationItems = this.searchModel.pages > 0 ? _.range(1, this.searchModel.pages + 1) : _.range(1, 1);
        this.toggleLoadingText(this.searchModel.count);
      },
      e1 => {
        console.log(e1);
        this.actionPending = false;
        this.error = `An unexpected error has occurred`;
      }
    );
  }

  private toggleLoadingText(max: number): void {
    if (max === -1) {
      this.loadingText = 'Loading...';
    } else if (max === 0) {
      this.loadingText = 'There are currently no records to display.';
    } else {
      this.loadingText = '';
    }
  }

  private resetSearch(): void {
    this.filterModel.pageNo = 1;
    this.filterModel.pageSize = 10;
    this.filterModel.searchTerm = '';
    this.filterModel.searchField = 'Name';
    this.filterModel.orderId = 1;

    this.searchModel.count = 0;
    this.searchModel.from = 0;
    this.searchModel.index = 0;
    this.searchModel.pages = 0;
    this.searchModel.items = [];
  }

}
