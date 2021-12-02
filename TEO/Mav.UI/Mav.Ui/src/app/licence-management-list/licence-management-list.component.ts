import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';
import { AssessmentSearchModel } from '../models/search/Assessment.search.model';
import { OrganisationSearchModel } from '../models/search/organisation.search.model';
import { OrganisationListingModel } from '../models/admin/organisation.listing.model';
import { Paginate } from '../models/paginated.items';
import * as _ from 'lodash';
import { OrganisationService } from '../services/organisation.service';

@Component({
  selector: 'app-licence-management-list',
  templateUrl: './licence-management-list.component.html',
  styleUrls: ['./licence-management-list.component.css']
})
export class LicenceManagementListComponent extends AppComponentBase implements OnInit {

  public filterModel: OrganisationSearchModel = new OrganisationSearchModel();
  public searchModel: Paginate<OrganisationListingModel> = new Paginate<OrganisationListingModel>();

  public loadingText: string;
  public paginationItems = _.range(1, 1);

  constructor(
    public routeConfig: Router,
    private organisationService: OrganisationService) {
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

  private searchRecords(): void {
    this.toggleLoadingText(-1);
    this.actionPending = true;

    this.organisationService.getAllOrganisations(this.filterModel)
    .subscribe(
      r1 => {
        this.actionPending = false;
        this.searchModel = r1;
        this.paginationItems = this.searchModel.pages > 0 ? _.range(1, this.searchModel.pages + 1) : _.range(1, 1);
        this.toggleLoadingText(this.searchModel.count);
        console.log(r1);
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
    this.filterModel.searchField = 'OrganisationName';

    this.searchModel.count = 0;
    this.searchModel.from = 0;
    this.searchModel.index = 0;
    this.searchModel.pages = 0;
    this.searchModel.items = [];
  }

  setFilter(entry): void {
    console.log(entry);
    this.filterModel.filterID = entry;
  }

  setOrder(entry): void {
    console.log(entry);
    this.filterModel.orderID = entry;
  }
}
