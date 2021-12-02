import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';
import { UserSearchModel } from '../models/search/user.search.model';
import { SLTListingModel } from '../models/SLT.listing.model';
import { Paginate } from '../models/paginated.items';
import * as _ from 'lodash';
import { UserServiceService } from '../services/user-service.service';
import { AssessmentYearService } from '../services/admin/assessment-year.service';
import { AssessmentYearViewModel } from '../models/admin/assessment-year.view.model';
import { CentreServiceService } from '../services/centre-service.service';
import { CentreTotalsViewModel } from '../models/centre-totals.view.model';

@Component({
  selector: 'app-SLTs-list',
  templateUrl: './SLTs-list.component.html',
  styleUrls: ['./SLTs-list.component.css']
})
export class SLTListComponent extends AppComponentBase implements OnInit {

  public filterModel: UserSearchModel = new UserSearchModel();
  public searchModel: Paginate<SLTListingModel> = new Paginate<SLTListingModel>();
  public yearList: AssessmentYearViewModel[] = [];
  public centreTotals: CentreTotalsViewModel = new CentreTotalsViewModel();
  public canAddMore = false;

  public displayYearFilter = false;
  public loadingText: string;
  public paginationItems = _.range(1, 1);

  constructor(
    public routeConfig: Router,
    private userService: UserServiceService,
    private assessmentYearService: AssessmentYearService,
    private centreService: CentreServiceService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.resetSearch();
    this.assessmentYearService.getAssessmentYearList()
    .subscribe(
      r1 => {
        console.log(r1);
        this.yearList = r1;
        this.centreService.getCentreSLTTotals(0)
        .subscribe(
          r2 => {
            console.log(r2);
            this.centreTotals = r2;
            this.canAddMore = this.centreTotals.currentTotal < this.centreTotals.maxAllowed;
            this.searchRecords();
          },
          (e2: Error) => {
            this.onApiError(e2.message);
          }
        );
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
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
      this.filterModel.searchField = 'Surname';
    }
    if (entry === '2') {
      this.filterModel.searchField = 'Email';
    }
  }

  public setYear(entry): void {
    console.log(entry);
    this.filterModel.year = entry;
  }

  private searchRecords(): void {
    this.toggleLoadingText(-1);
    this.actionPending = true;

    this.userService.getSLTSearch(this.filterModel)
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
    this.filterModel.searchField = 'Surname';
    this.filterModel.role = '';

    this.searchModel.count = 0;
    this.searchModel.from = 0;
    this.searchModel.index = 0;
    this.searchModel.pages = 0;
    this.searchModel.items = [];
  }

}
