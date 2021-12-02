import { Component, OnInit, Input } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { UserAssessmentSearchModel } from '../models/search/user.assessment.search.model';
import { Paginate } from '../models/paginated.items';
import { UserAssessmentListingModel } from '../models/search/user.assessment.listing.model';
import { UserAssessmentService } from '../services/user-assessment.service';
import * as _ from 'lodash';
import { AssessmentYearViewModel } from '../models/admin/assessment-year.view.model';
import { AssessmentYearService } from '../services/admin/assessment-year.service';

@Component({
  selector: 'app-invigilator-details-assessment-history',
  templateUrl: './invigilator-details-assessment-history.component.html',
  styleUrls: ['./invigilator-details-assessment-history.component.css']
})
export class InvigilatorDetailsAssessmentHistoryComponent extends AppComponentBase implements OnInit {

  @Input() id: string;

  public filterModel: UserAssessmentSearchModel = new UserAssessmentSearchModel();
  public searchModel: Paginate<UserAssessmentListingModel> = new Paginate<UserAssessmentListingModel>();
  public yearList: AssessmentYearViewModel[] = [];
  public userID: string;

  public loadingText: string;
  public paginationItems = _.range(1, 1);

  constructor(
    public routeConfig: Router,
    private userAssessmentService: UserAssessmentService,
    private assessmentYearService: AssessmentYearService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.userID = this.id;
    this.resetSearch();
    this.assessmentYearService.getAssessmentYearList()
    .subscribe(
      r1 => {
        console.log(r1);
        this.yearList = r1;
        this.searchRecords();
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public PaginateSearch(page: number): void {
    this.filterModel.pageNo = page;
    this.searchRecords();
  }

  public setYear(entry): void {
    this.filterModel.yearID = entry;
    this.filterModel.pageNo = 1;
    this.searchRecords();
  }

  private searchRecords(): void {
    this.toggleLoadingText(-1);
    this.actionPending = true;

    this.userAssessmentService.getUserHistory(this.filterModel)
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
    this.filterModel.searchField = '';
    this.filterModel.yearID = null;
    this.filterModel.userID = this.id;

    this.searchModel.count = 0;
    this.searchModel.from = 0;
    this.searchModel.index = 0;
    this.searchModel.pages = 0;
    this.searchModel.items = [];
  }

}
